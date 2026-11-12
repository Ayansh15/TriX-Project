from __future__ import annotations

import csv
import io
import os
import posixpath
import re
import shutil
from difflib import SequenceMatcher
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Any

try:
    import pandas as pd
except Exception:
    pd = None
try:
    from PIL import Image, UnidentifiedImageError
except Exception:
    Image = None
    UnidentifiedImageError = OSError
from pypdf import PdfReader
try:
    from rapidfuzz import fuzz
except Exception:
    fuzz = None


MAX_UPLOAD_BYTES = int(os.getenv("MAX_UPLOAD_MB", "20")) * 1024 * 1024
UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "./uploads")).resolve()
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
TESSERACT_CONFIGURED = bool(os.getenv("TESSERACT_CMD"))
_pytesseract = None
_pytesseract_checked = False


def _get_pytesseract():
    global _pytesseract, _pytesseract_checked
    if _pytesseract_checked:
        return _pytesseract
    _pytesseract_checked = True
    try:
        import pytesseract
        if TESSERACT_CONFIGURED:
            pytesseract.pytesseract.tesseract_cmd = os.environ["TESSERACT_CMD"]
        _pytesseract = pytesseract
    except Exception:
        _pytesseract = None
    return _pytesseract


def ocr_available() -> bool:
    return Image is not None and (TESSERACT_CONFIGURED or shutil.which("tesseract") is not None) and _get_pytesseract() is not None


def partial_similarity(left: str, right: str) -> int:
    if fuzz is not None:
        return int(fuzz.partial_ratio(left, right))
    if not left or not right:
        return 0
    shorter, longer = (left, right) if len(left) <= len(right) else (right, left)
    if len(shorter) > len(longer):
        return 0
    window = max(len(shorter), min(len(longer), len(shorter) * 2))
    return round(100 * max(SequenceMatcher(None, shorter, longer[i:i + window]).ratio()
                           for i in range(max(1, len(longer) - window + 1))))


def read_structured_csv(content: bytes) -> tuple[str, str]:
    """Use pandas for a tolerant first read; fall back to csv.DictReader for edge cases."""
    text = content.decode("utf-8-sig", errors="replace")
    if pd is not None:
        try:
            frame = pd.read_csv(io.StringIO(text), dtype=str, keep_default_na=False, on_bad_lines="skip")
            records: list[dict[str, Any]] = frame.to_dict(orient="records")
            lines = [" | ".join(f"{key}: {value}" for key, value in row.items() if value) for row in records]
            return "\n".join(line for line in lines if line), "Pandas CSV"
        except Exception:
            pass
    try:
        rows = list(csv.DictReader(io.StringIO(text)))
        method = "Python csv fallback" if pd is not None else "Python csv (pandas unavailable)"
        return "\n".join(" | ".join(f"{k}: {v}" for k, v in row.items() if k and v) for row in rows), method
    except csv.Error as exc:
        raise ValueError(f"Could not read CSV: {exc}") from exc


def read_xlsx(content: bytes) -> tuple[str, str]:
    """Read basic XLSX cells with the OpenXML package format; no optional engine required."""
    ns = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
          "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships"}
    try:
        with zipfile.ZipFile(io.BytesIO(content)) as archive:
            names = set(archive.namelist())
            if "xl/workbook.xml" not in names:
                raise ValueError("The workbook is missing its workbook manifest")
            shared: list[str] = []
            if "xl/sharedStrings.xml" in names:
                root = ET.fromstring(archive.read("xl/sharedStrings.xml"))
                shared = ["".join(t.text or "" for t in item.findall(".//m:t", ns)) for item in root.findall("m:si", ns)]
            workbook = ET.fromstring(archive.read("xl/workbook.xml"))
            rels_root = ET.fromstring(archive.read("xl/_rels/workbook.xml.rels")) if "xl/_rels/workbook.xml.rels" in names else None
            rel_ns = {"r": "http://schemas.openxmlformats.org/package/2006/relationships"}
            targets = {rel.attrib["Id"]: rel.attrib["Target"] for rel in rels_root.findall("r:Relationship", rel_ns)} if rels_root is not None else {}
            output: list[str] = []
            sheets = workbook.findall("m:sheets/m:sheet", ns)
            for sheet in sheets:
                target = targets.get(sheet.attrib.get(f"{{{ns['r']}}}id", ""))
                if not target:
                    continue
                path = target.lstrip("/") if target.startswith("/") else f"xl/{target}"
                path = posixpath.normpath(path.replace("\\", "/"))
                if path not in names:
                    continue
                root = ET.fromstring(archive.read(path))
                for row_index, row in enumerate(root.findall(".//m:sheetData/m:row", ns), start=1):
                    row_number = row.attrib.get("r", str(row_index))
                    cells: list[str] = []
                    for cell in row.findall("m:c", ns):
                        value = cell.find("m:v", ns)
                        inline = cell.find("m:is", ns)
                        text = "".join(t.text or "" for t in inline.findall(".//m:t", ns)) if inline is not None else (value.text or "" if value is not None else "")
                        if cell.attrib.get("t") == "s" and text:
                            text = shared[int(text)]
                        if text:
                            cells.append(f"{cell.attrib.get('r', '')}: {text}")
                    if cells:
                        output.append(f"[Sheet {sheet.attrib.get('name', 'Sheet')} · Row {row_number}] " + " | ".join(cells))
            return "\n".join(output), "OpenXML workbook extraction"
    except (zipfile.BadZipFile, ET.ParseError, KeyError, IndexError, ValueError) as exc:
        raise ValueError(f"Could not read XLSX workbook: {exc}") from exc


def read_docx(content: bytes) -> tuple[str, str]:
    """Extract paragraph text from a DOCX OpenXML document."""
    ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    try:
        with zipfile.ZipFile(io.BytesIO(content)) as archive:
            xml = archive.read("word/document.xml")
        root = ET.fromstring(xml)
        paragraphs = []
        for paragraph in root.findall(".//w:p", ns):
            line = "".join(node.text or "" for node in paragraph.findall(".//w:t", ns)).strip()
            if line:
                paragraphs.append(line)
        return "\n".join(paragraphs), "OpenXML DOCX extraction"
    except (zipfile.BadZipFile, KeyError, ET.ParseError) as exc:
        raise ValueError(f"Could not read DOCX document: {exc}") from exc


def _extract_pdf(content: bytes) -> tuple[str, str, str]:
    try:
        reader = PdfReader(io.BytesIO(content), strict=False)
        pages: list[str] = []
        did_ocr = False
        for page_number, page in enumerate(reader.pages, start=1):
            page_text = (page.extract_text() or "").strip()
            if page_text:
                pages.append(f"[Page {page_number}] {page_text}")
                continue
            if not ocr_available():
                continue
            image_text: list[str] = []
            try:
                for image_file in page.images:
                    with Image.open(io.BytesIO(image_file.data)) as image:
                        recognized = _get_pytesseract().image_to_string(image.convert("RGB")).strip()
                    if recognized:
                        image_text.append(recognized)
            except Exception:
                image_text = []
            if image_text:
                did_ocr = True
                pages.append(f"[Page {page_number} · OCR] {' '.join(image_text)}")
        combined = "\n".join(pages).strip()
        if combined:
            return combined, "Indexed", "pypdf + Tesseract OCR" if did_ocr else "pypdf text extraction"
        if reader.pages and ocr_available():
            return "", "Needs manual check", "No readable text or embedded scan image was found"
        if reader.pages:
            return "", "Needs OCR", "Scanned PDF detected; Tesseract is unavailable for OCR"
        return "", "Needs manual check", "PDF has no pages"
    except Exception as exc:
        raise ValueError(f"Could not read PDF: {exc}") from exc


def extract_upload(filename: str, content_type: str, content: bytes) -> tuple[str, str, str]:
    if len(content) > MAX_UPLOAD_BYTES:
        raise ValueError(f"File exceeds the {MAX_UPLOAD_BYTES // (1024 * 1024)} MB upload limit")
    suffix = Path(filename).suffix.lower()
    if suffix in {".txt", ".md", ".json"}:
        text = content.decode("utf-8-sig", errors="replace").strip()
        return text, "Indexed" if text else "No text found", "UTF-8 text"
    if suffix == ".csv":
        text, method = read_structured_csv(content)
        return text, "Indexed" if text else "No text found", method
    if suffix == ".xlsx":
        text, method = read_xlsx(content)
        return text, "Indexed" if text else "No text found", method
    if suffix == ".docx":
        text, method = read_docx(content)
        return text, "Indexed" if text else "No text found", method
    if suffix == ".pdf":
        return _extract_pdf(content)
    if suffix in {".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff"}:
        if Image is None:
            return "", "Needs manual check", "Pillow is unavailable; image text could not be extracted"
        try:
            with Image.open(io.BytesIO(content)) as image:
                image.verify()
            if not ocr_available():
                return "", "OCR unavailable", "Pillow validated the image; pytesseract and the Tesseract executable are both required"
            with Image.open(io.BytesIO(content)) as image:
                text = _get_pytesseract().image_to_string(image.convert("RGB")).strip()
            return text, "Indexed" if text else "Needs manual check", "Pillow + pytesseract/Tesseract" if text else "OCR ran but found no readable text"
        except (UnidentifiedImageError, OSError) as exc:
            raise ValueError(f"Could not read image: {exc}") from exc
    return "", "Unsupported format", f"File type {suffix or '(none)'} is not supported"


def store_upload(filename: str, content: bytes) -> str:
    """Store a validated upload under a collision-safe, path-safe name."""
    original = Path(filename.replace("\\", "/")).name
    safe_name = re.sub(r"[^A-Za-z0-9._-]+", "_", original)[:160] or "asset"
    stem, suffix = Path(safe_name).stem, Path(safe_name).suffix.lower()
    stored_name = f"{stem}-{os.urandom(6).hex()}{suffix}"
    (UPLOAD_DIR / stored_name).write_bytes(content)
    return stored_name


def normalize_price(value: str) -> str:
    digits = re.sub(r"[^0-9]", "", value)
    return str(int(digits)) if digits else ""


def price_matches(text: str, approved_value: str) -> list[dict[str, str]]:
    approved = normalize_price(approved_value)
    if not approved:
        return []
    candidates = re.finditer(r"(?:₹|INR\s*)\s*([0-9][0-9,]*(?:\.[0-9]{1,2})?)", text, re.I)
    matches: list[dict[str, str]] = []
    for match in candidates:
        found = normalize_price(match.group(1))
        if not found or found == approved:
            continue
        start, end = max(0, match.start() - 90), min(len(text), match.end() + 90)
        excerpt = text[start:end].replace("\n", " ").strip()
        prior = text[:match.start()]
        locations = list(re.finditer(r"\[(Page \d+(?: · OCR)?|Sheet [^\]]+)\]", prior, re.I))
        location = locations[-1].group(1) if locations else "Text excerpt"
        context = excerpt.lower()
        proximity = max((partial_similarity("price", context), partial_similarity("plan", context), partial_similarity("month", context)))
        basis = "currency amount near plan/month context" if proximity >= 70 else "currency amount; product context is less clear"
        matches.append({"value": match.group(0), "excerpt": excerpt, "location": location, "basis": basis,
                        "match_type": "Exact normalized price" if proximity >= 60 else "Possible price occurrence",
                        "confidence": "High" if proximity >= 70 else "Medium"})
    return matches


def fuzzy_fact_mentions(text: str, facts: list[tuple[str, str]]) -> list[dict[str, str]]:
    """Use RapidFuzz to suggest nearby wording matches; callers must keep them reviewable."""
    results = []
    normalized = re.sub(r"\s+", " ", text)
    for name, value in facts:
        if len(value) < 8 or len(value) > 180:
            continue
        score = partial_similarity(value.casefold(), normalized.casefold())
        if 78 <= score < 100:
            results.append({"fact": name, "value": value, "score": str(score), "match_type": "Approximate wording · human review required"})
    return results
