# BrandGuard AI

BrandGuard AI is the TriX project prototype for brand content change impact, claim evidence review, and human approvals. The frontend and backend now use the stack and processing libraries described in the PRD.

## Stack

- **React + TypeScript + Vite** for the workspace UI.
- **Python + FastAPI** for the REST API.
- **PostgreSQL + SQLAlchemy** for the Docker deployment. A local SQLite database is used when `DATABASE_URL` is unset, so the app can run without a database server.
- **pypdf** for text-based PDF extraction.
- **pandas** for CSV ingestion, with Python’s built-in `csv` module as a fallback.
- **RapidFuzz** for approximate wording matches, which always remain human-review suggestions.
- **Pillow + pytesseract + Tesseract OCR** for uploaded images. The Docker API image installs the Tesseract executable. On Windows, install Tesseract separately and set `TESSERACT_CMD` to its executable path to enable OCR.

## Run locally on Windows

Install the Python dependencies and start the API in one PowerShell window:

```powershell
python -m venv .venv
.\.venv\Scripts\python -m pip install -e .\backend
.\.venv\Scripts\python -m uvicorn app.main:app --app-dir backend --host 127.0.0.1 --port 8000
```

Install and start the React client in another window:

```powershell
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/). The Vite development server proxies `/api` and `/files` to FastAPI on port 8000. The API docs are at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

## Run the PostgreSQL stack with Docker

```powershell
docker compose up --build
```

This starts PostgreSQL, the FastAPI service, and the React/Vite client. The compose setup stores database files and uploads in Docker-managed volumes.

## Main workflows

- Add or version an approved fact. Updating a fact triggers a scan of indexed content.
- Upload text, CSV/JSON, PDFs, or images, or register campaign copy directly.
- Review exact and approximate findings with excerpts, detected and approved values, confidence, and suggested actions.
- Record human decisions and retain an audit history.
- Register promotional claims, attach sources, and record issuer, date, scope, and expiry for human verification.
- Export impact and audit reports as CSV.
- Review market insights. No live market data source is connected, so the product explicitly shows that a defensible range or trend cannot be produced.

## Prototype boundaries

The prototype scans uploaded and registered assets only. It does not connect to live websites, email systems, ad accounts, or social channels. Text-based PDFs use pypdf. Images use pytesseract when the Tesseract executable is installed. Scanned PDF OCR is reported as unsupported. External evidence sources are recorded, but not independently verified. Market figures are not fabricated when no comparable source data is available. Review decisions never publish content or change a live price.

The supplied PRD treats customer needs and differentiation as hypotheses. This prototype does not present them as validated research findings.
