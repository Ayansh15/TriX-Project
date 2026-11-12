# BrandGuard AI · Team TriX

BrandGuard AI helps a team find uploaded campaign content that may be stale after an approved brand fact changes. It shows the extracted excerpt, detected and approved values, match rationale, and review controls so a person can make the final decision.

## Quick start

### Option A: Docker Compose (recommended)

Install Docker Desktop, then from the repository root run:

```powershell
docker compose up --build
```

Open `http://localhost:5173`. Compose starts PostgreSQL, the FastAPI service, and the web frontend. The API container installs Tesseract. Set `POSTGRES_PASSWORD` before starting if you need a non-development database password.

### Option B: Run services locally

Requirements: Python 3.11 or later, Node.js 20 or later, and npm.

Terminal 1:

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -e backend
python -m uvicorn app.main:app --app-dir backend --reload --port 8000
```

Terminal 2:

```powershell
npm install
npm run dev -- --port 5173
```

Open `http://127.0.0.1:5173`. Vite proxies `/api` and `/files` to FastAPI. SQLite and seeded demo data are used by default. To enable OCR locally, install Tesseract and make the executable available on `PATH` (or set `TESSERACT_CMD`).

## First-use walkthrough

The first visit asks you to continue as a guest or create a local demo profile with a display name and account ID. The profile is stored in this browser and is not verified by an account server. The first visit then opens a short guide; use **Guide** in the header to replay it. The main journey is:

1. **Brand facts**: add or update the approved value, source, scope, effective date, and approver. Saving a new version triggers a scan.
2. **Asset library**: upload or register content. Open **Preview extracted text** on an asset to review what the scanner received and why a file may need manual checking.
3. **Change impact**: compare the detected value with the current approved value. Review the excerpt, location, match type, confidence, and explanation.
4. **Review queue**: filter by status or confidence, assign a teammate and due date, then progress the item through review, correction, and resolution.
5. **Overview and audit history**: track open, assigned, in-review, correction, resolved, and overdue counts; inspect fact changes, scans, assignments, and reviewer decisions.

Review statuses include New, In Review, Confirmed issue, Sent for Correction, Needs clarification, Approved, Dismissed, and Resolved. After checking a correction, choose **Mark resolved**. That decision updates dashboard progress and is recorded in audit history.

Supported uploads: TXT, Markdown, CSV, XLSX, DOCX, JSON, PDF, PNG, JPG/JPEG, WEBP, and TIFF, up to 20 MB each. PDF text extraction uses pypdf. Image and embedded-PDF-image OCR requires Tesseract. Unsupported, unreadable, and OCR-unavailable files are marked instead of silently treated as indexed text.

## Technology

- Frontend: React, TypeScript, Vite, and Lucide icons.
- API: Python and FastAPI with Pydantic request validation.
- Persistence: SQLAlchemy; SQLite for local runs and PostgreSQL in Docker Compose.
- Extraction and matching: pypdf, pandas when available, Python's built-in csv fallback, RapidFuzz when available, Pillow, pytesseract, and Tesseract.
- DOCX and XLSX text are read from their OpenXML package files. Price matching is deterministic; approximate wording matches are suggestions for a human reviewer. There is no LLM-backed matching in this release.

## Tests

Install the optional test dependencies and run:

```powershell
python -m pip install -e "backend[test]"
python -m pytest backend/tests -q
npm run build
```

The backend tests cover extraction, explainable match fields, upload error handling, reviewer assignment, status transitions, resolution progress, repeated actions, and audit events. The main browser path is: update a fact → upload/register content → scan → inspect the finding → assign a reviewer/due date → send for correction → mark resolved → confirm dashboard and audit updates.

## Honest scope

Scans cover files uploaded or registered in the workspace only. The product does not connect to or publish to websites, email, social platforms, or ad accounts. Claim evidence is stored for human review and is not independently checked against registries. Market-price values shown in the insights prototype are illustrative; no competitor feed or model-generated recommendation is connected. Demo profiles are local labels only, not authenticated accounts or permission roles; reviewer names are a demo list.

GitHub Pages can host the built frontend, but this API-backed app also needs a separately hosted API and database. The repository's Docker setup is the complete local deployment path. A public deployment URL must be configured and verified before it is submitted as a judge-accessible link.

## Project files

- `backend/app/`: API, SQLAlchemy models, schemas, and extraction/matching logic.
- `src/`: React application and theme.
- `docker-compose.yml`: PostgreSQL, API, and web services.
- `docs/ROUND3_PRD.md`: detailed product requirements, delivered scope, quality plan, and roadmap.
- `docs/`: Round 3 submission PDF and editable presentation.
