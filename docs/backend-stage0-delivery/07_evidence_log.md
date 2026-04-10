# Evidence Log - Backend Stage 0 Delivery

Use this log for deployment and live-verification evidence:

- platform choice
- deployment commands
- public URL
- live response checks
- CORS header proof
- submission confirmation artifacts

No delivery evidence has been recorded yet.

## DE-001 - Day 1 deployment-path scan is blocked by missing app surface

- Date: 2026-04-10
- Scope: deployment-path discovery during Gate A
- Files changed:
  - `docs/backend-stage0-delivery/06_progress_tracker.md`
  - `docs/backend-stage0-delivery/07_evidence_log.md`
  - `docs/backend-stage0-delivery/08_decisions_log.md`
  - `docs/agent-ops/06_delivery-state.md`
- Commands run:
  - `Get-ChildItem -Recurse -Depth 3 | Select-Object FullName`
  - `rg --files`
  - `rg --files -g "package.json" -g "pnpm-lock.yaml" -g "yarn.lock" -g "package-lock.json" -g "tsconfig.json" -g "vercel.json" -g "railway.json" -g "Procfile" -g "Dockerfile" -g "pyproject.toml" -g "requirements*.txt" -g "go.mod" -g "*.csproj"`
  - `Get-Content -Raw docs/backend-stage0-delivery/00_deployment_spec.md`
  - `Get-Content -Raw README.md`
- Result: accepted-platform rules are known, but the current repo does not expose a deployable service or any host-specific configuration
- Functional or behavioral outcome: no delivery platform can be confirmed yet without the target app surface and deployment access details
- Risks or follow-up: deployment planning stays blocked until the implementation repo and host access are clarified

## DE-002 - Vercel deployment path is confirmed locally

- Date: 2026-04-10
- Scope: deployment-path confirmation after implementation bootstrap
- Files changed:
  - `api/classify.js`
  - `local-server.js`
  - `src/classify-service.js`
  - `package.json`
  - `README.md`
  - `docs/backend-stage0-delivery/00_deployment_spec.md`
  - `docs/backend-stage0-delivery/06_progress_tracker.md`
  - `docs/backend-stage0-delivery/07_evidence_log.md`
  - `docs/backend-stage0-delivery/08_decisions_log.md`
  - `docs/agent-ops/06_delivery-state.md`
- Commands run:
  - `npm test`
  - approved escalated local success smoke through `http://127.0.0.1:3000/api/classify?name=john`
- Result: the repo exposes a Vercel-native `api/classify.js` route backed by the same handler used locally, and the route shape has already produced a real Genderize-backed `200` response in local smoke
- Functional or behavioral outcome: the accepted-platform deployment path is now concrete, even though the public URL has not been created yet
- Risks or follow-up: actual Vercel project access and the live URL still need to be exercised

## DE-003 - Public Vercel deployment is live and verified

- Date: 2026-04-10
- Scope: production deployment, failure recovery, and live smoke verification
- Files changed:
  - `server.js`
  - `local-server.js`
  - `README.md`
  - `docs/backend-stage0-delivery/00_deployment_spec.md`
  - `docs/backend-stage0-delivery/01_submission_checklist.md`
  - `docs/backend-stage0-delivery/06_progress_tracker.md`
  - `docs/backend-stage0-delivery/07_evidence_log.md`
  - `docs/backend-stage0-delivery/08_decisions_log.md`
  - `docs/backend-stage0-sprint/10_signoff_log.md`
  - `docs/agent-ops/06_delivery-state.md`
- Commands run:
  - `npm install -g vercel`
  - approved escalated `vercel whoami`
  - approved escalated `vercel deploy --prod --yes --force --format json`
  - approved escalated `vercel logs --since 15m --status-code 500 --no-follow --expand`
  - approved escalated live smoke against `https://backend-wizards-stage0.vercel.app/api/classify`
- Result: the first production deploy reached `https://backend-wizards-stage0.vercel.app` but failed with `FUNCTION_INVOCATION_FAILED`; Vercel logs identified an invalid `server.cjs` export. After restoring `server.js` as the production entrypoint and keeping `local-server.js` local-only, the redeploy succeeded and the live base URL returned `200` for `john`, `200` for `mary`, `400` for missing `name`, `204` for `OPTIONS`, and `200` across a five-request burst
- Functional or behavioral outcome: the public Vercel endpoint is stable, public, and CORS-open
- Risks or follow-up: submission metadata is incomplete until the GitHub repo URL, full name, and email are confirmed

## DE-004 - Submission fields are confirmed and the packet is ready

- Date: 2026-04-10
- Scope: submission-packet completion
- Files changed:
  - `docs/backend-stage0-delivery/01_submission_checklist.md`
  - `docs/backend-stage0-delivery/06_progress_tracker.md`
  - `docs/backend-stage0-sprint/10_signoff_log.md`
  - `docs/backend-stage0-proof/06_progress_tracker.md`
  - `docs/agent-ops/06_delivery-state.md`
- Commands run:
  - none; values were provided directly by the human operator
- Result: the submission packet now has a confirmed GitHub repo URL, full name, and email
- Functional or behavioral outcome: the repo-side submission materials are complete, and only the external submission action remains
- Risks or follow-up: submission timestamp and bot confirmation are still pending because the form has not been sent yet

## DE-004 - Submission fields are confirmed and the packet is ready

- Date: 2026-04-10
- Scope: submission-packet completion
- Files changed:
  - `docs/backend-stage0-delivery/01_submission_checklist.md`
  - `docs/backend-stage0-delivery/06_progress_tracker.md`
  - `docs/backend-stage0-sprint/10_signoff_log.md`
  - `docs/backend-stage0-proof/06_progress_tracker.md`
  - `docs/agent-ops/06_delivery-state.md`
- Commands run:
  - none; values were provided directly by the human operator
- Result: the submission packet now has a confirmed GitHub repo URL, full name, and email
- Functional or behavioral outcome: the repo-side submission materials are complete, and only the external submission action remains
- Risks or follow-up: submission timestamp and bot confirmation are still pending because the form has not been sent yet
