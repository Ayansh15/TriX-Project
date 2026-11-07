from __future__ import annotations

import csv
import io
import os
import re
import shutil
from pathlib import Path
from typing import Any

import pandas as pd
from PIL import Image, UnidentifiedImageError
from pypdf import PdfReader
from rapidfuzz import fuzz


MAX_UPLOAD_BYTES = int(os.getenv("MAX_UPLOAD_MB", "20")) * 1024 * 1024
UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", "./uploads")).resolve()
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
TESSERACT_CONFIGURED = bool(os.getenv("TESSERACT_CMD"))
if TESSERACT_CONFIGURED:
    import pytesseract
    pytesseract.pytesseract.tesseract_cmd = os.environ["TESSERACT_CMD"]
else:
    import pytesseract


def ocr_available() -> bool:
    return TESSERACT_CONFIGURED or shutil.which("tesseract") is not None


def read_structured_csv(content: bytes) -> tuple[str, str]:
    """Use pandas for a tolerant first read; fall back to csv.DictReader for edge cases."""
    text = content.decode("utf-8-sig", errors="replace")
    try:
        frame = pd.read_csv(io.StringIO(text), dtype=str, keep_default_na=False, on_bad_lines="skip")
        records: list[dict[str, Any]] = frame.to_dict(orient="records")
        lines = [" | ".join(f"{key}: {value}" for key, value in row.items() if value) for row in records]
        return "\n".join(line for line in lines if line), "Pandas CSV"
    except Exception:
        rows = list(csv.DictReader(io.StringIO(text)))
        return "\n".join(" | ".join(f"{k}: {v}" for k, v in row.items() if k and v) for row in rows), "Python csv fallback"


def extract_upload(filename: str, content_type: str, content: bytes) -> tuple[str, str, str]:
    if len(content) > MAX_UPLOAD_BYTES:
        raise ValueError(f"File exceeds the {MAX_UPLOAD_BYTES // (1024 * 1024)} MB upload limit")
    suffix = Path(filename).suffix.lower()
    safe_name = re.sub(r"[^A-Za-z0-9._-]+", "_", Path(filename).name)[:200] or "asset"
    dest = UPLOAD_DIR / safe_name
    dest.write_bytes(content)
    if suffix in {".txt", ".md", ".json"}:
        return content.decode("utf-8-sig", errors="replace"), "Indexed", "UTF-8 text"
    if suffix == ".csv":
        text, method = read_structured_csv(content)
        return text, "Indexed", method
    if suffix == ".pdf":
        reader = PdfReader(io.BytesIO(content), strict=False)
        text = "\n".join(page.extract_text() or "" for page in reader.pages).strip()
        if text:
            return text, "Indexed", "pypdf"
        return "", "Needs OCR", "PDF contains no extractable text; scanned PDF OCR is not enabled"
    if suffix in {".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff"}:
        try:
            with Image.open(io.BytesIO(content)) as image:
                image.verify()
            if not ocr_available():
                return "", "OCR unavailable", "Pillow validated the image; install Tesseract OCR to extract its text"
            with Image.open(io.BytesIO(content)) as image:
                text = pytesseract.image_to_string(image.convert("RGB")).strip()
            return text, "Indexed" if text else "No text found", "Pillow + pytesseract/Tesseract"
        except (UnidentifiedImageError, OSError) as exc:
            raise ValueError(f"Could not read image: {exc}") from exc
    dest.unlink(missing_ok=True)
    return "", "Unsupported format", f"File type {suffix or '(none)'} is not supported"


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
        context = excerpt.lower()
        proximity = max((fuzz.partial_ratio("price", context), fuzz.partial_ratio("plan", context), fuzz.partial_ratio("month", context)))
        matches.append({"value": match.group(0), "excerpt": excerpt, "match_type": "Exact normalized price" if proximity >= 60 else "Possible price occurrence", "confidence": "High" if proximity >= 70 else "Medium"})
    return matches


def fuzzy_fact_mentions(text: str, facts: list[tuple[str, str]]) -> list[dict[str, str]]:
    """Use RapidFuzz to suggest nearby wording matches; callers must keep them reviewable."""
    results = []
    normalized = re.sub(r"\s+", " ", text)
    for name, value in facts:
        if len(value) < 8 or len(value) > 180:
            continue
        score = fuzz.partial_ratio(value.casefold(), normalized.casefold())
        if 78 <= score < 100:
            results.append({"fact": name, "value": value, "score": str(score), "match_type": "Approximate wording · human review required"})
    return results
