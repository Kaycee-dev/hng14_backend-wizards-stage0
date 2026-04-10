# Evidence Log - Backend Stage 0 Sprint

Use `E-001`, `E-002`, and so on. Every entry should record:

- date
- scope
- files changed
- commands run
- result
- functional or behavioral outcome
- risks or follow-up

No target-repo evidence has been recorded yet. The first real entry should start after the kit is copied into the working project and the route owner is confirmed.

## E-001 - Day 1 repo scan found a kit-only overlay

- Date: 2026-04-10
- Scope: Gate A governance bootstrap and route-owner discovery
- Files changed:
  - `docs/backend-stage0-sprint/07_progress_tracker.md`
  - `docs/backend-stage0-sprint/08_evidence_log.md`
  - `docs/backend-stage0-sprint/09_decisions_log.md`
  - `docs/backend-stage0-delivery/06_progress_tracker.md`
  - `docs/backend-stage0-delivery/07_evidence_log.md`
  - `docs/backend-stage0-delivery/08_decisions_log.md`
  - `docs/backend-stage0-proof/01_raw_journal/2026-04-10_day_1.md`
  - `docs/backend-stage0-proof/06_progress_tracker.md`
  - `docs/backend-stage0-proof/07_evidence_log.md`
  - `docs/backend-stage0-proof/08_decisions_log.md`
  - `docs/agent-ops/06_delivery-state.md`
- Commands run:
  - `Get-ChildItem -Force | Select-Object Mode,Length,LastWriteTime,Name`
  - `Get-ChildItem -Recurse -Depth 3 | Select-Object FullName`
  - `rg --files`
  - `git status --short`
  - `rg --files -g "package.json" -g "pnpm-lock.yaml" -g "yarn.lock" -g "package-lock.json" -g "tsconfig.json" -g "vercel.json" -g "railway.json" -g "Procfile" -g "Dockerfile" -g "pyproject.toml" -g "requirements*.txt" -g "go.mod" -g "*.csproj"`
  - `Get-Content -Raw README.md`
- Result: the repo contains the Stage 0 kit files and logs only; there is no server entrypoint, runtime manifest, deployment config, or git repo metadata in the current working directory
- Functional or behavioral outcome: required sprint artifacts are present, but route ownership and a local contract shell cannot be assigned inside this repo without human confirmation of the actual target app or approval to scaffold a new stack here
- Risks or follow-up: Gate A remains blocked until route ownership and deployment access are clarified

## E-002 - Local implementation and verification are in place

- Date: 2026-04-10
- Scope: Gate A completion and early Gate B local integration
- Files changed:
  - `package.json`
  - `.gitignore`
  - `src/classify-service.js`
  - `local-server.js`
  - `api/classify.js`
  - `test/classify.test.js`
  - `README.md`
  - `docs/backend-stage0-sprint/07_progress_tracker.md`
  - `docs/backend-stage0-sprint/08_evidence_log.md`
  - `docs/backend-stage0-sprint/09_decisions_log.md`
  - `docs/backend-stage0-delivery/00_deployment_spec.md`
  - `docs/backend-stage0-delivery/06_progress_tracker.md`
  - `docs/backend-stage0-delivery/07_evidence_log.md`
  - `docs/backend-stage0-delivery/08_decisions_log.md`
  - `docs/backend-stage0-proof/01_raw_journal/2026-04-10_day_1.md`
  - `docs/backend-stage0-proof/06_progress_tracker.md`
  - `docs/backend-stage0-proof/07_evidence_log.md`
  - `docs/backend-stage0-proof/08_decisions_log.md`
  - `docs/agent-ops/06_delivery-state.md`
- Commands run:
  - `node -v`
  - `npm -v`
  - `npm test`
  - `$job = Start-Job ... node local-server.js ... Invoke-WebRequest 'http://127.0.0.1:3000/api/classify' ...`
  - `$job = Start-Job ... node local-server.js ... Invoke-WebRequest 'http://127.0.0.1:3000/api/classify?name=john&name=jane' ...`
  - `node -e "fetch('https://api.genderize.io?name=john')..."`
  - approved escalated local success smoke through `http://127.0.0.1:3000/api/classify?name=john`
- Result: a no-dependency Node.js implementation now serves the assessment route locally, unit tests pass, local HTTP validation behavior is correct, and an escalated smoke proved a real upstream-backed `200` success payload with `Access-Control-Allow-Origin: *`
- Functional or behavioral outcome: Gate A is complete and the repo is ready for the remaining local verification and deployment work
- Risks or follow-up: public deployment access is still needed before Gate C proof can be captured

## E-003 - Live deployment and public verification are green

- Date: 2026-04-10
- Scope: Gate B local burst verification, Vercel deployment, and Gate C live proof
- Files changed:
  - `server.js`
  - `local-server.js`
  - `README.md`
  - `docs/backend-stage0-sprint/07_progress_tracker.md`
  - `docs/backend-stage0-sprint/08_evidence_log.md`
  - `docs/backend-stage0-sprint/09_decisions_log.md`
  - `docs/backend-stage0-sprint/10_signoff_log.md`
  - `docs/backend-stage0-delivery/00_deployment_spec.md`
  - `docs/backend-stage0-delivery/01_submission_checklist.md`
  - `docs/backend-stage0-delivery/06_progress_tracker.md`
  - `docs/backend-stage0-delivery/07_evidence_log.md`
  - `docs/backend-stage0-delivery/08_decisions_log.md`
  - `docs/backend-stage0-proof/01_raw_journal/2026-04-10_day_1.md`
  - `docs/backend-stage0-proof/06_progress_tracker.md`
  - `docs/backend-stage0-proof/07_evidence_log.md`
  - `docs/backend-stage0-proof/08_decisions_log.md`
  - `docs/agent-ops/06_delivery-state.md`
- Commands run:
  - approved escalated repeated-request local smoke through `http://127.0.0.1:3000/api/classify?name=john`
  - `npm install -g vercel`
  - approved escalated `vercel whoami`
  - approved escalated `vercel deploy --prod --yes --force --format json`
  - approved escalated `vercel logs --since 15m --status-code 500 --no-follow --expand`
  - approved escalated live smoke against `https://backend-wizards-stage0.vercel.app/api/classify`
- Result: the first live deploy failed with `Invalid export found in module "/var/task/server.cjs"`. After restoring `server.js` as the Vercel entrypoint and moving the local-only process host to `local-server.js`, the redeploy succeeded and the stable base URL `https://backend-wizards-stage0.vercel.app` returned public `200`, `400`, `204`, and repeated-request responses with `Access-Control-Allow-Origin: *`
- Functional or behavioral outcome: Gates B and C are effectively green ahead of schedule, and the live endpoint is ready for submission once the remaining metadata is supplied
- Risks or follow-up: the submission still needs a GitHub repo URL plus the submitter full name and email
