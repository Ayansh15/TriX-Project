# BrandGuard AI — Round 3 Product Requirements and Delivery Record

**Team:** TriX  
**Product:** BrandGuard AI  
**Release:** Round 3 finish  
**Audience:** Small subscription businesses, marketing agencies, and content reviewers  
**Status:** Local full-stack prototype; public deployment still required for judge access

## 1. Product statement

BrandGuard AI helps teams manage approved brand facts and find uploaded or registered campaign assets that may contain an outdated value after a fact changes. The system presents evidence and a suggested next step, then records a human review decision. It is a focused change-impact and review workspace, not a live-channel monitor or a guarantee that claims are true.

The Round 1 deck set the core journey: approve facts, index content, scan for changes, inspect evidence, decide, correct, recheck, and retain an audit record. Round 3 completes the agreed review experience while keeping that scope.

## 2. Users and jobs

**Marketing lead or account owner:** maintain the current approved facts and find old campaign assets after a change.  
**Designer or copywriter:** see the exact excerpt and source context that needs checking.  
**Reviewer:** assign work, choose a due date, record a decision, and trace it later.

The current team roster is a demo assignment list. The prototype does not include sign-in, role-based access, or multi-tenant isolation.

## 3. Goals and non-goals

### Goals

- Keep approved fact values, source, scope, effective date, approver, and version together.
- Index supported uploaded files and registered copy; show extraction outcomes.
- Find potentially outdated price mentions and explain each match.
- Let a human assign and resolve findings without losing decision history.
- Make the first visit self-guided and provide a reproducible local setup.

### Non-goals for this release

- Monitoring live websites, email, advertising, or social accounts.
- Editing or publishing content in a connected channel.
- Automatically deciding whether a claim is true, legal, counterfeit, or fraudulent.
- Claiming calibrated AI confidence, LLM reasoning, or sourced market-price recommendations.
- Enterprise permissions, notifications, SLA enforcement, or multiple customer workspaces.

## 4. Primary journey

1. Open the workspace. A first-run guide explains each section and can be replayed from **Guide**.
2. Open **Brand facts**. Add a name, approved value, source, scope, effective date, and approver. Updating the same fact creates a new version and starts a scan.
3. Open **Asset library**. Register campaign text or upload a supported file. Inspect **Preview extracted text** to verify the content the scanner received. Extraction failures and OCR requirements stay visible.
4. Open **Change impact**. Compare the detected value with the current approved value. Read the exact excerpt, page/sheet location when available, match method, confidence label, and rationale.
5. Open **Review queue**. Filter by status and confidence. Assign one of the demo reviewers and set a due date. Record a human decision.
6. Open **Audit history**. Confirm the assignment and decision are recorded. Correct the source asset outside BrandGuard AI, upload its revised version, and re-scan.

## 5. Round 2 commitments — exact delivery scope

### Improvement 1: Better file extraction and visible extraction status

**User change:** reviewers can check the text actually used by a scan and identify files needing manual attention.  
**Delivered:** TXT/Markdown/JSON, CSV, XLSX, DOCX, PDF, and common raster image intake; asset extraction preview; page and sheet/row markers; explicit statuses for unsupported files, missing Tesseract, unreadable PDFs, and empty OCR results. Text PDFs use pypdf. Embedded PDF page images and image uploads use Pillow + pytesseract when the Tesseract executable is available. XLSX and DOCX text are parsed from OpenXML packages.  
**Boundary:** scanned-PDF OCR is limited to images embedded in the PDF that pypdf can expose; it is not full-page rasterization for every PDF encoding. The local Windows environment may not have Tesseract. The Docker API image installs Tesseract.

### Improvement 2: Explainable findings and confidence filtering

**User change:** reviewers can see why a result was flagged and narrow the queue to relevant results.  
**Delivered:** each finding carries its asset, excerpt, detected and approved values, match type, confidence label, reason, suggested action, and location where extracted text provides one. Price matching normalizes currency values and considers product/plan/month context. The impact and review screens filter by open/all or status, search text, and confidence. CSV export includes evidence fields.  
**Boundary:** confidence labels are rule-based and not statistically calibrated. Approximate wording matches remain suggestions for human review.

### Improvement 3: Assigned review work with due dates and an audit trail

**User change:** teams can see who owns the next action and when it is due.  
**Delivered:** assignment endpoint and interface, named demo reviewers, optional due date, and a transition to **In Review** when an open finding is assigned. Reviewers can record **Confirmed issue**, **Sent for Correction**, **Needs clarification**, **Approved**, **Dismissed**, or **Resolved**. After checking a correction, a reviewer can mark the finding resolved. The dashboard reports open, assigned, in-review, sent-for-correction, resolved, and overdue counts. Assignment and decision events are recorded; repeated identical requests do not duplicate audit entries.  
**Boundary:** assignments are not notifications or enforced deadlines; reviewers are a fixed demo list, not authenticated users. The product cannot independently confirm that an external asset was corrected.

## 6. Functional requirements and acceptance checks

- A new fact version preserves its source and effective date and triggers an impact scan.
- CSV/XLSX and supported document uploads expose extracted text or a visible manual-check status.
- Invalid PDFs return a clear client error instead of an unhandled server response.
- A stale-price finding shows the excerpt, old/new values, basis, confidence, and location when available.
- An already-current approved price is not returned as stale solely because it is present.
- Status, confidence, and search filters work together and have a useful empty state.
- A reviewer can save an owner and due date; the finding enters In Review, and repeating the save does not create another audit event.
- A reviewer can progress an item through correction to Resolved; dashboard counts update by status.
- Repeating the same decision does not duplicate the decision audit event.
- The first-use guide can be replayed; key workflows remain navigable without a walkthrough.
- The README gives both local and container setup instructions.

## 7. Product and architecture

```text
React + TypeScript + Vite
  └── same-origin REST calls: /api and /files
       └── Nginx reverse proxy in Docker, or Vite dev proxy locally
            └── FastAPI + Pydantic
                 ├── SQLAlchemy models and audit records
                 ├── SQLite by default for local runs
                 └── PostgreSQL in Docker Compose

File processing: pypdf · pandas / csv · OpenXML DOCX/XLSX · RapidFuzz
                 Pillow · pytesseract · Tesseract OCR executable
```

The Round 1 slides proposed Node.js + Express. The implemented API is Python + FastAPI, matching the updated PRD's Python processing approach and keeping parsing and matching in the same service. PostgreSQL remains the container database; local setup uses SQLite to reduce setup steps. The current match engine is deterministic and rule-based, with RapidFuzz used for approximate wording suggestions when available. No LLM is used.

### Data entities

- **Fact:** name, current value, source, scope, version, active flag, effective date, approver.
- **Asset:** name, media type, channel, stored file path, extracted text, processing status and method.
- **Finding:** asset/fact link, detected and approved values, excerpt, location, reason, confidence, match type, status, owner, due date, review timestamp.
- **Claim:** exact wording, source, issuer, scope, source dates, evidence status.
- **Audit event:** actor, event type, summary, detail, and timestamp.

## 8. Technology implementation

- **React, TypeScript, Vite:** workspace screens and typed interactions.
- **Python, FastAPI, Pydantic:** API routes, validation, and status responses.
- **SQLAlchemy:** relational models and persistence.
- **PostgreSQL:** configured in Docker Compose; SQLite is the local default.
- **pypdf:** PDF text extraction and accessible embedded-image inspection.
- **pandas and Python csv:** tolerant CSV processing with a standard-library fallback.
- **RapidFuzz:** approximate wording comparison; a basic similarity fallback is available when RapidFuzz cannot load.
- **Pillow, pytesseract, Tesseract:** image validation and OCR when the native executable is installed.
- **OpenXML parsing:** spreadsheet and Word document text extraction without adding an Excel/docx engine.
- **Nginx:** production-like same-origin reverse proxy in the web container.

## 9. Reliability and test plan

### Automated coverage added

- Price matching returns a location, match basis, and ignores the currently approved price.
- CSV, XLSX, and DOCX extraction preserve reviewable text.
- Malformed PDFs produce an actionable validation error.
- API flow covers upload → scan → finding evidence, assignment → due date → decision → audit.
- Repeated assignment and decision requests are checked for duplicate audit events.
- Unsupported file input returns an explicit status.

### Build and execution record (12 Nov 2026)

- Frontend production build (`npm run build`): passed after the dashboard progress and resolution changes.
- Full backend test suite (`python -m pytest backend/tests -q`): 8 passed. Covers processing, upload-to-finding evidence, assignment and due date, status transition, resolution, dashboard progress, audit idempotence, malformed PDF, and unsupported file handling. The Windows runner used SQLAlchemy's pure-Python fallback and an approved loopback test run.
- API health, seeded summary, and Vite-to-API proxy were checked successfully at the local development services.
- Docker-based deployment journey: not run because Docker is not installed.
- Public, judge-accessible deployment: not configured. The local development link is only reachable while local web/API servers are running.

## 10. Known limitations

- Only uploaded and manually registered content is scanned; no channel connector is active.
- OCR depends on Tesseract and extraction quality; reviewers must inspect output before relying on a match.
- A PDF's embedded scan images may not be exposed by every PDF codec; those files are flagged for manual review.
- Confidence is a descriptive rule label, not a calibrated probability.
- Claim evidence is recorded but not independently verified. Missing evidence is not proof of a false claim.
- Market-price/trend examples are illustrative and are not based on live competitor sources.
- Demo identities are fixed; there is no login, authorization, notification, or external publication.
- GitHub Pages cannot host the FastAPI/PostgreSQL backend. A complete public demo needs a host for the API and database plus a frontend configured to reach that API.

## 11. Roadmap

### Next release: reliable team review

Add authenticated reviewer identities, workspace access controls, comments, due-date reminders, and reopen/recheck states. Preserve audit history and prevent data leakage between customer workspaces.

### File processing

Add full-page rasterization for scanned PDFs, extraction quality checks, OCR language selection, and page-level citations where supported. Build a labeled evaluation set and measure extraction failures before promising wider format coverage.

### Better impact coverage

Add approved product-detail and terminology rules, visual/logo checks, and a measured false-positive/missed-match set. Keep rule explanations and reviewer feedback visible.

### Integrations and market data

Connect one channel at a time with explicit read-only scope and reviewed publishing workflows. Add sourced market data only when provider, collection date, comparable products, and coverage can be shown. Do not fabricate numeric market recommendations.

## 12. Submission checklist

- Public frontend and API URL verified from a clean browser.
- Final source code committed and pushed to the team repository.
- Product PDF and editable slide deck match the delivered implementation.
- Test commands, environment, and actual results recorded.
- Roadmap, limitations, and team member roles included.
