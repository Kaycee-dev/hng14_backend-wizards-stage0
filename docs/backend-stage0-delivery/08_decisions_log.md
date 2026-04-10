# Decisions Log - Backend Stage 0 Delivery

Use this log for non-trivial delivery decisions such as:

- platform selection
- preview-protection removal
- timeout configuration
- public URL choice
- retry policy for live verification

No delivery-specific decisions have been recorded yet.

## DD-001 - Defer platform selection until a deployable target surface exists

- Date: 2026-04-10
- Phase / Checkpoint: Day 1 delivery-path discovery
- Options considered:
  - preselect an accepted platform without knowing the runtime or deployment access
  - defer the platform choice until the actual implementation surface is available
- Decision made: defer platform selection until the target repo or an approved new stack exists
- Rationale: the hardening sprint says to prefer the platform already closest to the target repo, and no target repo or runtime exists in the current working directory yet
- Impact:
  - no public URL or deploy command can be claimed today
  - delivery work can resume immediately once the app surface and credentials are known
- Human approval: required for the final platform and deployment path

## DD-002 - Use Vercel as the primary accepted deployment path

- Date: 2026-04-10
- Phase / Checkpoint: Day 1 implementation bootstrap
- Options considered:
  - Railway or another process host using `local-server.js`
  - Vercel using the native `api/classify.js` route mapping
- Decision made: treat Vercel as the primary deployment path for this repo
- Rationale: the graded endpoint already lives under `/api/classify`, Vercel is explicitly accepted by the brief, and the repo can deploy without adding framework or adapter dependencies
- Impact:
  - deployment evidence should focus on the Vercel route
  - `local-server.js` remains available for local verification and for fallback hosting if needed
- Human approval: not yet required for the choice itself, but platform access is still needed to execute the deployment

## DD-003 - Match Vercel's Node deployment model instead of forcing an `api/` route owner

- Date: 2026-04-10
- Phase / Checkpoint: production deployment recovery
- Options considered:
  - keep the deployment centered on `api/classify.js`
  - make `server.js` the production entrypoint and keep `local-server.js` local-only
- Decision made: deploy Vercel through `server.js` and serve the graded `/api/classify` path from that entrypoint
- Rationale: Vercel created the project with Node app settings, the first live errors came from `/var/task/server.cjs`, and removing `server.js` caused the build to fail with `No entrypoint found`
- Impact:
  - the stable public base URL is `https://backend-wizards-stage0.vercel.app`
  - the repo no longer has an ambiguous unused `api/classify.js` deployment path
  - `local-server.js` remains the explicit local process host
- Human approval: not required
