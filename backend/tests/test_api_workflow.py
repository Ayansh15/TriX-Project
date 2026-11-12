import os
import sys
import asyncio
from pathlib import Path

import pytest


@pytest.fixture(scope="module")
def client(tmp_path_factory):
    if sys.platform == "win32":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    root = Path(__file__).resolve().parents[1]
    sys.path.insert(0, str(root))
    tmp = tmp_path_factory.mktemp("brandguard-api")
    os.environ["DATABASE_URL"] = f"sqlite:///{tmp / 'test.db'}"
    os.environ["UPLOAD_DIR"] = str(tmp / "uploads")
    from fastapi.testclient import TestClient
    from app.main import app
    with TestClient(app) as test_client:
        yield test_client


def test_assign_review_decide_and_audit_repeat_safely(client):
    findings = client.get("/api/findings?status=open").json()
    finding = next(item for item in findings if item["kind"] == "change_impact")
    url = f"/api/findings/{finding['id']}"

    assignment = {"owner": "Pragya Sharma", "due_date": "2026-11-20"}
    saved = client.patch(f"{url}/assignment", json=assignment)
    assert saved.status_code == 200
    assert saved.json()["owner"] == "Pragya Sharma"
    assert saved.json()["due_date"] == "2026-11-20"
    assert saved.json()["status"] == "In Review"

    before = client.get("/api/audit?limit=500").json()
    repeated = client.patch(f"{url}/assignment", json=assignment)
    after = client.get("/api/audit?limit=500").json()
    assert repeated.status_code == 200
    assert len([event for event in before if event["event_type"] == "review_assignment"]) == len(
        [event for event in after if event["event_type"] == "review_assignment"]
    )

    decision = {"action": "correction"}
    assert client.post(f"{url}/decision", json=decision).status_code == 200
    after_first_decision = client.get("/api/audit?limit=500").json()
    assert client.post(f"{url}/decision", json=decision).status_code == 200
    after_repeat_decision = client.get("/api/audit?limit=500").json()
    assert len([event for event in after_first_decision if event["event_type"] == "review_decision"]) == len(
        [event for event in after_repeat_decision if event["event_type"] == "review_decision"]
    )
    resolved = client.post(f"{url}/decision", json={"action": "resolve"})
    assert resolved.status_code == 200
    assert resolved.json()["status"] == "Resolved"
    progress = client.get("/api/summary").json()["review_progress"]
    assert progress["resolved"] == 1


def test_csv_upload_creates_explainable_finding_and_preview(client):
    payload = b"Asset,Copy\nLanding page,Monthly plan is INR 499/month"
    response = client.post(
        "/api/assets/upload",
        files=[("files", ("round3-check.csv", payload, "text/csv"))],
    )
    assert response.status_code == 201
    uploaded = response.json()[0]
    assert "INR 499/month" in uploaded["extracted_text"]
    assert uploaded["processing_status"] == "Indexed"

    findings = client.get("/api/findings?status=open&kind=change_impact").json()
    result = next(item for item in findings if item["asset"]["name"] == "round3-check.csv")
    assert result["detected_value"].endswith("499")
    assert result["approved_value"] == "₹599 / month"
    assert result["excerpt"]
    assert result["location"] == "Text excerpt"
    assert "current approved value" in result["reason"]
    assert result["confidence"] in {"High", "Medium"}


def test_bad_uploads_are_reported_without_server_error(client):
    response = client.post(
        "/api/assets/upload",
        files=[("files", ("broken.pdf", b"not a PDF", "application/pdf"))],
    )
    assert response.status_code == 400
    assert "Could not read PDF" in response.json()["detail"]

    unsupported = client.post(
        "/api/assets/upload",
        files=[("files", ("unsupported.exe", b"sample", "application/octet-stream"))],
    )
    assert unsupported.status_code == 201
    assert unsupported.json()[0]["processing_status"] == "Unsupported format"
    assert unsupported.json()[0]["filename"] is None
