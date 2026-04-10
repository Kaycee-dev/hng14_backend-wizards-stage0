---
name: backend-stage0-executor
description: Execute the Backend Wizards Stage 0 assessment by building, validating, and deploying a single GET /api/classify endpoint around the Genderize API while preserving the exact response contract, confidence logic, CORS behavior, and proof discipline. Use when starting, resuming, implementing, testing, or deploying this assessment in a target repo.
---

# Backend Stage0 Executor

Use this skill to run the Stage 0 endpoint sprint end-to-end without drifting from the grading contract.

## Start Here

1. Read `AGENTS.md`.
2. Read `backend-wizards-stage0-sprint_v1_0.md`.
3. Read `backend-wizards-stage0-hardening-sprint_v1_0.md`.
4. Read `docs/agent-ops/README.md`, `docs/agent-ops/04_deadline-overlay.md`, and `docs/agent-ops/06_delivery-state.md`.
5. Read the active progress tracker, evidence log, and decisions log.
6. If the work will be split into formal lanes, read `docs/production-line/README.md`.

## Workflow

1. Confirm the route owner and the minimum-change server path in the target repo.
2. Lock the endpoint behavior from `references/api-contract.md`.
3. Implement the handler, upstream call, transform, and error mapping before adding any polish.
4. Run the verification set from `references/grading-checklist.md`.
5. Update the sprint, delivery, and proof artifacts in the same session as the code or deployment work.

## Hard Rules

- Build exactly `GET /api/classify`.
- Preserve the exact success/error envelope shape.
- Keep `Access-Control-Allow-Origin: *` present on live responses.
- Do not stub or invent Genderize responses in production code.
- Keep the no-prediction status-code choice explicit if it changes from the sprint default.
- Do not claim live green without a public URL and a real smoke check.

## Reference Map

- `references/source-of-truth.md`: authority order and anti-drift rules
- `references/session-and-gates.md`: session rhythm, gates, and same-day logging
- `references/api-contract.md`: endpoint rules and edge cases
- `references/grading-checklist.md`: score-focused verification list
