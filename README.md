# BrandGuard AI

BrandGuard AI is a browser-based product demo for the TriX project. It follows the supplied PRD and Round 1 deck: teams keep approved brand facts in one place, identify content that may be affected by a change, and route explainable findings to a human review queue.

## Run the demo

Open `index.html` in a current desktop or mobile browser. The demo uses plain HTML, CSS, and JavaScript, so it does not need a package install, build step, or server.

## Main workflows

- Update the monthly plan price from **Brand facts** and review the matching uploaded or registered content in **Change impact**.
- Search and filter the sample asset library, add campaign copy, or upload supported sample files.
- Review findings, attach a claim source, confirm or dismiss a match, and keep an audit history.
- Register approved facts and promotional claims.
- Explore the market insight screen, which labels its example prices and trend as illustrative sample data.
- Export impact and audit reports as CSV.

The sample workspace contains nine visible assets. Changes made in the demo are saved in the browser's local storage. Use **Settings → Reset demo data** to restore the initial sample state.

## Prototype boundaries

This project is a local front-end prototype, not a production service. It does not include the FastAPI/PostgreSQL or React/Express/PostgreSQL backend options discussed in the source materials. Text matching runs in the browser for registered text and plain text files. Uploaded images and PDFs are represented by sample extraction status; OCR/PDF parsing and visual-region matching are not implemented. There are no live website, email, ad account, or social channel integrations. The market insights are illustrative and do not use sourced competitor data. Claim sources are recorded for human assessment but are not independently verified. Reviewer actions stay in local browser storage and do not publish changes to any channel.

The supplied PRD treats customer needs and differentiation as hypotheses. This demo does not present them as validated research findings.
