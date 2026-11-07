from __future__ import annotations

import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Generator

from fastapi import Depends, FastAPI, File, HTTPException, Query, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import select, desc, func
from sqlalchemy.orm import Session, joinedload

from .database import Base, SessionLocal, engine
from .models import Asset, AuditEvent, Claim, Fact, Finding, now_utc
from .processing import UPLOAD_DIR, extract_upload, fuzzy_fact_mentions, ocr_available, price_matches
from .schemas import ClaimCreate, EvidenceUpdate, FactCreate, ReviewDecision

Base.metadata.create_all(bind=engine)
app = FastAPI(title="BrandGuard AI API", version="1.0.0", description="Evidence-linked brand content review and change impact API")
app.add_middleware(CORSMiddleware, allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.mount("/files", StaticFiles(directory=str(UPLOAD_DIR)), name="files")


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def log(db: Session, event_type: str, summary: str, details: str = "", actor: str = "Ayan Sharma") -> None:
    db.add(AuditEvent(event_type=event_type, summary=summary[:500], details=details, actor=actor))


def seed(db: Session) -> None:
    if db.scalar(select(func.count(Fact.id))) > 0:
        return
    facts = [
        Fact(name="Monthly plan price", value="₹599 / month", source="Pricing page · approved Nov 2", scope="All channels", version=2, effective_date="2026-11-02", approved_by="Ayan Sharma"),
        Fact(name="Annual plan price", value="₹5,990 / year", source="Pricing page · approved Oct 14", scope="All channels", effective_date="2026-10-14"),
        Fact(name="Free trial", value="14 days", source="Product terms · approved Oct 28", scope="Website, paid social", effective_date="2026-10-28"),
        Fact(name="Core feature", value="Unlimited projects", source="Product brief · approved Oct 21", scope="All channels", effective_date="2026-10-21"),
        Fact(name="Refund policy", value="14 day refund window", source="Policy document · approved Oct 10", scope="Website, email", effective_date="2026-10-10"),
        Fact(name="Brand tagline", value="Make room for good work", source="Brand guide v3 · approved Sep 30", scope="All channels", effective_date="2026-09-30"),
        Fact(name="Product claim", value="Save up to 35% on annual", source="Campaign brief · review due", scope="Paid social", effective_date="2026-11-04"),
        Fact(name="Support hours", value="Mon–Fri, 9 AM–6 PM IST", source="Support policy · approved Sep 12", scope="Website, email", effective_date="2026-09-12"),
    ]
    db.add_all(facts)
    assets = [
        ("Summer plan launch · Instagram", "image/jpeg", "Paid social", "Start your plan today for ₹499/month", "Indexed", "Seeded text excerpt"),
        ("Pricing page · hero copy", "text/plain", "Website", "Plans start at just ₹499 per month.", "Indexed", "Seeded text"),
        ("October newsletter · offer block", "application/pdf", "Email", "Get started at only ₹499/month. Offer ends soon.", "Indexed", "Seeded excerpt"),
        ("Brand campaign · carousel 02", "image/jpeg", "Paid social", "All the tools you need for ₹499 a month.", "Indexed", "Seeded text excerpt"),
        ("Product overview · brochure", "application/pdf", "Sales enablement", "The Starter plan is ₹499/month, billed monthly.", "Indexed", "Seeded excerpt"),
        ("Autumn launch · landing page", "text/plain", "Website", "Starter plan, now ₹599 per month.", "Indexed", "Seeded text"),
        ("Brand guide · v3", "application/pdf", "Brand guidelines", "Use the approved wordmark and the Northstar palette.", "Indexed", "Seeded excerpt"),
        ("Welcome series · email 1", "text/plain", "Email", "Get more out of every project, starting today.", "Indexed", "Seeded text"),
        ("Spring refresh · social post", "image/jpeg", "Paid social", "Make room for good work. Save up to 35% on annual plans.", "Indexed", "Seeded text excerpt"),
    ]
    db.add_all([Asset(name=n, media_type=t, channel=c, extracted_text=text, processing_status=status, extraction_method=method) for n,t,c,text,status,method in assets])
    db.flush()
    monthly = next(f for f in facts if f.name == "Monthly plan price")
    for i in range(5):
        asset = db.scalar(select(Asset).where(Asset.name == assets[i][0]))
        found = "₹499"
        db.add(Finding(code=f"BG-SEED-{204-i}", asset_id=asset.id, fact_id=monthly.id, title="Outdated monthly price", kind="change_impact", severity="High" if i < 3 else "Medium", status="New", detected_value=found, approved_value=monthly.value, excerpt=asset.extracted_text, reason="This asset contains the previous approved plan price after the updated price became effective.", suggested_action="Review the source asset, correct it if needed, then upload and recheck.", confidence="High", match_type="Seeded exact price match"))
    claim = Claim(wording="Save up to 35% on annual plans", asset_name="Spring refresh · social post", source="No source attached", scope="Annual offer", evidence_status="Needs Verification", source_date="Review due Nov 4")
    db.add(claim)
    db.flush()
    claim_asset = db.scalar(select(Asset).where(Asset.name == "Spring refresh · social post"))
    db.add(Finding(code="BG-SEED-CLAIM-1", asset_id=claim_asset.id, title="Promotional claim needs evidence", kind="claim_verification", severity="High", status="Needs Verification", detected_value=claim.wording, excerpt=claim.wording, reason="No supporting source is attached for the claim's offer scope or calculation.", suggested_action="Attach current supporting evidence for a human reviewer. Missing evidence is not proof that the claim is false.", confidence="Medium", match_type="Claim evidence status"))
    db.add_all([
        AuditEvent(event_type="fact_change", summary="Monthly plan price updated", details="₹499 → ₹599 / month · effective Nov 2, 2026. Source: Pricing page. Approved by Ayan Sharma."),
        AuditEvent(event_type="scan", summary="Change impact scan completed", details="9 seeded sample assets · 5 potential price matches returned for review."),
        AuditEvent(event_type="review", summary="Brand guide v3 approved", details="Logo use and tone guidance confirmed by Pragya Sharma.", actor="Pragya Sharma"),
    ])
    db.commit()


@app.on_event("startup")
def initialize() -> None:
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        seed(db)


def finding_dict(f: Finding) -> dict:
    return {
        "id": f.id, "code": f.code, "kind": f.kind, "title": f.title, "severity": f.severity,
        "status": f.status, "detected_value": f.detected_value, "approved_value": f.approved_value,
        "excerpt": f.excerpt, "reason": f.reason, "suggested_action": f.suggested_action,
        "confidence": f.confidence, "match_type": f.match_type, "owner": f.owner,
        "asset": {"id": f.asset.id, "name": f.asset.name, "channel": f.asset.channel, "media_type": f.asset.media_type} if f.asset else None,
        "created_at": f.created_at,
    }


def asset_dict(a: Asset) -> dict:
    return {"id": a.id, "name": a.name, "media_type": a.media_type, "channel": a.channel, "filename": a.filename,
            "extracted_text": a.extracted_text, "processing_status": a.processing_status, "extraction_method": a.extraction_method,
            "uploaded_at": a.uploaded_at, "file_url": f"/files/{a.filename}" if a.filename else None}


def fact_dict(f: Fact) -> dict:
    return {"id": f.id, "name": f.name, "value": f.value, "source": f.source, "scope": f.scope,
            "version": f.version, "active": f.active, "effective_date": f.effective_date, "approved_by": f.approved_by, "created_at": f.created_at}


def claim_dict(c: Claim) -> dict:
    return {"id": c.id, "wording": c.wording, "asset_name": c.asset_name, "source": c.source, "issuer": c.issuer,
            "scope": c.scope, "source_date": c.source_date, "expires_at": c.expires_at, "evidence_status": c.evidence_status, "created_at": c.created_at}


@app.get("/api/health")
def health(db: Session = Depends(get_db)) -> dict:
    from .processing import pd, PdfReader, Image
    db.scalar(select(func.count(Asset.id)))
    return {"status": "ok", "database": "connected", "database_dialect": engine.dialect.name,
            "processing": {"pypdf": True, "pandas": pd.__version__, "python_csv": True, "rapidfuzz": True,
                           "pillow": Image.__version__, "pytesseract": True, "tesseract_binary": ocr_available(), "scanned_pdf_ocr": False}}


@app.get("/api/summary")
def summary(db: Session = Depends(get_db)) -> dict:
    assets = db.scalar(select(func.count(Asset.id))) or 0
    facts = db.scalar(select(func.count(Fact.id)).where(Fact.active.is_(True))) or 0
    findings = db.scalar(select(func.count(Finding.id)).where(Finding.status.notin_(["Approved", "Dismissed"]))) or 0
    claims = db.scalar(select(func.count(Claim.id)).where(Claim.evidence_status != "Evidence attached")) or 0
    return {"assets": assets, "facts": facts, "open_findings": findings, "claims_to_review": claims,
            "high_priority": db.scalar(select(func.count(Finding.id)).where(Finding.severity == "High", Finding.status.notin_(["Approved", "Dismissed"]))) or 0}


@app.get("/api/facts")
def list_facts(active_only: bool = True, db: Session = Depends(get_db)) -> list[dict]:
    stmt = select(Fact).order_by(Fact.name, desc(Fact.version))
    if active_only:
        stmt = stmt.where(Fact.active.is_(True))
    return [fact_dict(f) for f in db.scalars(stmt).all()]


@app.post("/api/facts", status_code=201)
def create_fact(payload: FactCreate, db: Session = Depends(get_db)) -> dict:
    latest = db.scalar(select(Fact).where(Fact.name == payload.name).order_by(desc(Fact.version)).limit(1))
    version = (latest.version + 1) if latest else 1
    if latest:
        latest.active = False
    fact = Fact(**payload.model_dump(), version=version)
    db.add(fact); db.flush()
    log(db, "fact_change", f"Approved fact saved: {fact.name}", f"Version {version}: {fact.value}. Source: {fact.source}.", fact.approved_by)
    db.commit(); db.refresh(fact)
    run_scan(db, trigger_fact=fact)
    db.refresh(fact)
    return fact_dict(fact)


@app.get("/api/assets")
def list_assets(q: str = "", status: str = "", channel: str = "", db: Session = Depends(get_db)) -> list[dict]:
    stmt = select(Asset).order_by(desc(Asset.uploaded_at), desc(Asset.id))
    if q:
        stmt = stmt.where(Asset.name.ilike(f"%{q}%") | Asset.extracted_text.ilike(f"%{q}%"))
    if channel:
        stmt = stmt.where(Asset.channel == channel)
    assets = db.scalars(stmt).all()
    result = [asset_dict(a) for a in assets]
    if status:
        ids = {f.asset_id for f in db.scalars(select(Finding).where(Finding.status.notin_(["Approved", "Dismissed"]))).all()}
        result = [a for a in result if ("Needs review" if a["id"] in ids else "Reviewed") == status]
    return result


@app.post("/api/assets/register", status_code=201)
def register_asset(name: str, text: str, channel: str = "Registered content", db: Session = Depends(get_db)) -> dict:
    if not text.strip():
        raise HTTPException(422, "Registered content must include text")
    asset = Asset(name=name[:300], channel=channel[:100], extracted_text=text[:2_000_000], processing_status="Indexed", extraction_method="Registered text")
    db.add(asset); db.flush(); log(db, "asset_registered", f"Content registered: {asset.name}", f"Channel: {channel}")
    db.commit(); db.refresh(asset); return asset_dict(asset)


@app.post("/api/assets/upload", status_code=201)
async def upload_assets(files: list[UploadFile] = File(...), channel: str = "Uploaded assets", db: Session = Depends(get_db)) -> list[dict]:
    results = []
    for upload in files:
        content = await upload.read()
        if not upload.filename:
            continue
        try:
            text, status, method = extract_upload(upload.filename, upload.content_type or "application/octet-stream", content)
        except ValueError as exc:
            raise HTTPException(400, str(exc)) from exc
        asset = Asset(name=upload.filename[:300], media_type=upload.content_type or "application/octet-stream", channel=channel[:100],
                      filename=Path(upload.filename).name, extracted_text=text[:2_000_000], processing_status=status, extraction_method=method)
        db.add(asset); db.flush()
        log(db, "asset_uploaded", f"Asset uploaded: {asset.name}", f"{asset.processing_status} · {asset.extraction_method}")
        results.append(asset)
    db.commit()
    for asset in results:
        db.refresh(asset)
    run_scan(db)
    return [asset_dict(a) for a in results]


def run_scan(db: Session, trigger_fact: Fact | None = None) -> dict:
    fact = trigger_fact or db.scalar(select(Fact).where(Fact.name == "Monthly plan price", Fact.active.is_(True)).order_by(desc(Fact.version)).limit(1))
    if fact is None:
        return {"checked": 0, "matches": 0}
    assets = db.scalars(select(Asset)).all()
    active_assets: set[int] = set()
    created = 0
    for asset in assets:
        if asset.processing_status not in {"Indexed", "No text found"} or not asset.extracted_text:
            continue
        matches = price_matches(asset.extracted_text, fact.value)
        # Approximate fact wording is a suggestion only and remains subject to human review.
        fuzzy = fuzzy_fact_mentions(asset.extracted_text, [(fact.name, fact.value)])
        for match in matches:
            active_assets.add(asset.id)
            active = db.scalar(select(Finding).where(Finding.asset_id == asset.id, Finding.fact_id == fact.id,
                                                       Finding.kind == "change_impact", Finding.status.notin_(["Approved", "Dismissed"])))
            if active:
                active.detected_value = match["value"]; active.approved_value = fact.value; active.excerpt = match["excerpt"]
                active.match_type = match["match_type"]; active.confidence = match["confidence"]
                continue
            code = f"BG-{datetime.now(timezone.utc).strftime('%y%m%d%H%M%S%f')}-{asset.id}"
            db.add(Finding(code=code, asset_id=asset.id, fact_id=fact.id, title="Potential outdated price", kind="change_impact",
                           severity="High" if fact.effective_date and fact.effective_date <= datetime.now(timezone.utc).date().isoformat() else "Medium",
                           status="New", detected_value=match["value"], approved_value=fact.value, excerpt=match["excerpt"],
                           reason=f"The asset contains {match['value']} while the current approved value is {fact.value}.",
                           suggested_action="Confirm the product, market and effective date, then update the source asset if needed.",
                           confidence=match["confidence"], match_type=match["match_type"]))
            created += 1
        # Save approximate wording suggestions as review findings without calling them errors.
        for suggestion in fuzzy:
            if db.scalar(select(Finding.id).where(Finding.asset_id == asset.id, Finding.kind == "fuzzy_fact", Finding.status.notin_(["Approved", "Dismissed"]))):
                continue
            db.add(Finding(code=f"BG-FUZZY-{datetime.now(timezone.utc).strftime('%y%m%d%H%M%S%f')}-{asset.id}", asset_id=asset.id, fact_id=fact.id,
                           title="Approximate approved fact wording", kind="fuzzy_fact", severity="Low", status="Needs clarification",
                           detected_value=suggestion["value"], approved_value=fact.value, excerpt=asset.extracted_text[:400],
                           reason=f"Wording may be related to an approved fact (similarity {suggestion['score']}%). This is a possible match only.",
                           suggested_action="Compare the full content with the approved source and decide whether any change is needed.",
                           confidence="Low", match_type=suggestion["match_type"]))
            created += 1
    db.flush()
    log(db, "scan", "Change impact scan completed", f"{len(assets)} indexed assets examined; {len(active_assets)} exact/normalized price asset matches; {created} new findings.")
    db.commit()
    return {"checked": len(assets), "matches": len(active_assets), "new_findings": created,
            "coverage": "Uploaded and registered assets only; no live channels are connected."}


@app.post("/api/scans")
def scan(db: Session = Depends(get_db)) -> dict:
    return run_scan(db)


@app.get("/api/findings")
def list_findings(status: str = "", kind: str = "", q: str = "", db: Session = Depends(get_db)) -> list[dict]:
    stmt = select(Finding).options(joinedload(Finding.asset)).order_by(Finding.severity.desc(), desc(Finding.created_at))
    if status == "open":
        stmt = stmt.where(Finding.status.notin_(["Approved", "Dismissed"]))
    elif status:
        stmt = stmt.where(Finding.status == status)
    if kind:
        stmt = stmt.where(Finding.kind == kind)
    if q:
        stmt = stmt.where(Finding.title.ilike(f"%{q}%") | Finding.excerpt.ilike(f"%{q}%") | Finding.reason.ilike(f"%{q}%"))
    return [finding_dict(f) for f in db.scalars(stmt).unique().all()]


@app.post("/api/findings/{finding_id}/decision")
def decide_finding(finding_id: int, payload: ReviewDecision, db: Session = Depends(get_db)) -> dict:
    finding = db.get(Finding, finding_id)
    if not finding:
        raise HTTPException(404, "Finding not found")
    status = {"confirm": "Confirmed issue", "dismiss": "Dismissed", "correction": "Sent for Correction", "clarify": "Needs clarification", "approve": "Approved"}[payload.action]
    finding.status = status; finding.owner = payload.owner; finding.reviewed_at = now_utc()
    log(db, "review_decision", f"Finding {finding.code}: {status}", payload.comment or finding.title, payload.owner)
    db.commit(); db.refresh(finding)
    return finding_dict(db.scalar(select(Finding).options(joinedload(Finding.asset)).where(Finding.id == finding.id)))


@app.get("/api/claims")
def list_claims(db: Session = Depends(get_db)) -> list[dict]:
    return [claim_dict(c) for c in db.scalars(select(Claim).order_by(desc(Claim.created_at))).all()]


@app.post("/api/claims", status_code=201)
def create_claim(payload: ClaimCreate, db: Session = Depends(get_db)) -> dict:
    has_source = bool(payload.source.strip() and payload.source != "No source attached")
    claim = Claim(**payload.model_dump(), evidence_status="Source not independently verified" if has_source else "Needs Verification")
    db.add(claim); db.flush()
    asset = db.scalar(select(Asset).where(Asset.name == payload.asset_name))
    finding = Finding(code=f"BG-CLAIM-{datetime.now(timezone.utc).strftime('%y%m%d%H%M%S%f')}", asset_id=asset.id if asset else None,
                      title="Promotional claim needs review", kind="claim_verification", severity="High" if not has_source else "Medium",
                      status=claim.evidence_status, detected_value=claim.wording, excerpt=claim.wording,
                      reason="No supporting source is attached." if not has_source else "A source is attached but it has not been independently checked for the claim's date and scope.",
                      suggested_action="Attach relevant evidence and have a human reviewer assess its date, issuer and scope.", confidence="Medium", match_type="Claim evidence status")
    db.add(finding); log(db, "claim_registered", "Promotional claim registered", f"{claim.wording} · {claim.evidence_status}")
    db.commit(); db.refresh(claim); return claim_dict(claim)


@app.patch("/api/claims/{claim_id}/evidence")
def update_claim_evidence(claim_id: int, payload: EvidenceUpdate, db: Session = Depends(get_db)) -> dict:
    claim = db.get(Claim, claim_id)
    if not claim:
        raise HTTPException(404, "Claim not found")
    for key, value in payload.model_dump().items():
        setattr(claim, key, value)
    claim.evidence_status = "Source not independently verified"
    finding = db.scalar(select(Finding).where(Finding.kind == "claim_verification", Finding.detected_value == claim.wording).order_by(desc(Finding.id)))
    if finding:
        finding.status = "In Review"; finding.reason = "Evidence supplied; a person still needs to assess source relevance and scope."
    log(db, "claim_evidence_added", "Claim evidence attached for review", f"{claim.wording} · {claim.source}")
    db.commit(); db.refresh(claim); return claim_dict(claim)


@app.get("/api/insights")
def insights() -> dict:
    return {"label": "Illustrative sample data", "market": "India · subscription productivity software · monthly plans",
            "range": {"low": 399, "high": 899, "currency": "INR"}, "sample_size": None, "source": None, "collected_at": None,
            "confidence": "Not assessed", "trend": [], "interpretation": "No live or comparable market source is connected. No numeric market recommendation is produced.",
            "limitations": ["Sample values are illustrative and are not competitor data.", "Prices vary by feature coverage, seller, discount, tax, region and date."]}


@app.get("/api/audit")
def audit(q: str = "", limit: int = Query(default=100, ge=1, le=500), db: Session = Depends(get_db)) -> list[dict]:
    stmt = select(AuditEvent).order_by(desc(AuditEvent.created_at)).limit(limit)
    if q:
        stmt = select(AuditEvent).where(AuditEvent.summary.ilike(f"%{q}%") | AuditEvent.details.ilike(f"%{q}%")).order_by(desc(AuditEvent.created_at)).limit(limit)
    return [{"id": e.id, "actor": e.actor, "event_type": e.event_type, "summary": e.summary, "details": e.details, "created_at": e.created_at} for e in db.scalars(stmt).all()]


@app.get("/api/processing-capabilities")
def processing_capabilities() -> dict:
    return {"formats": ["TXT", "CSV", "JSON", "text-based PDF", "PNG", "JPG", "WEBP", "TIFF"],
            "csv": ["pandas", "Python csv fallback"], "pdf": "pypdf text extraction",
            "image_ocr": "Pillow + pytesseract, requires the Tesseract executable", "tesseract_available": ocr_available(),
            "scanned_pdf_ocr": "not enabled; scanned PDFs are labeled Needs OCR", "size_limit_mb": int(os.getenv("MAX_UPLOAD_MB", "20"))}
