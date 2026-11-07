# BrandGuard AI · TriX Team

A full stack brand operations workspace. Teams manage approved facts, index campaign content, scan for outdated statements, route potential matches to people, track evidence for claims, and export audit reports.

## Run locally

Start the FastAPI service in one terminal:

```powershell
.\.venv\Scripts\python.exe -m uvicorn app.main:app --app-dir backend --reload --port 8000
```

Start the React workspace in another terminal:

```powershell
npm run dev
```

Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/). The Vite server proxies `/api` and `/files` to FastAPI. A local SQLite database is used by default and seeded with sample workspace data.

## Full container stack

```powershell
docker compose up --build
```

This starts the React web app, FastAPI, and PostgreSQL. Configure `DATABASE_URL` and `UPLOAD_DIR` with environment variables when running outside the compose stack.

## PRD technology coverage

The web interface uses React, TypeScript, Vite, and Lucide icons. The API uses Python, FastAPI, SQLAlchemy, and PostgreSQL (SQLite for local development). File extraction uses pypdf for PDFs, pandas and Python's csv module for tabular content, RapidFuzz for fuzzy matching, Pillow for image handling, and pytesseract with the Tesseract executable for OCR. The container installs Tesseract. In a local Windows run, image OCR requires Tesseract to be installed and discoverable on PATH.

## Workspace workflows

- Add versioned approved facts and record their source, scope, effective date, and approver.
- Register copy or upload supported files, then run an impact scan.
- Review exact excerpts and decide whether findings are valid, dismissed, or need correction.
- Record claims and evidence for human review, inspect audit history, and export reports.
- Explore market insights, clearly identified as illustrative sample context.

Scan results are potential matches for human review. The prototype does not publish content or connect to live ad, email, website, or social channels. Evidence records are not independently verified against external registries.
