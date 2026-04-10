# Backend Stage 0 Agent Operating Contract

This project is governed by the three sprint prompts in the project root:

- `backend-wizards-stage0-sprint_v1_0.md`
- `backend-wizards-stage0-hardening-sprint_v1_0.md`
- `backend-wizards-stage0-proof-sprint_v1_0.md`

Use them as the primary source of truth. This file and the `docs/` package exist to make execution repeatable, not to replace the sprint plans.

## Authority Order

When guidance conflicts, resolve it in this order:

1. Root sprint prompts
2. Approved decisions logged in the sprint decisions logs
3. Current sprint progress and evidence logs
4. `docs/agent-ops/`
5. `docs/production-line/`
6. Tool-specific rule files

Do not silently change scope, error semantics, or deployment assumptions. Record approved deltas in the relevant decisions log.

## Mandatory Session Start

Before substantial work:

1. Read `docs/agent-ops/README.md`
2. Read `docs/agent-ops/04_deadline-overlay.md` and `docs/agent-ops/06_delivery-state.md`
3. Read the active build, delivery, and proof progress trackers, evidence logs, and decisions logs
4. Confirm the current day/date, checkpoint, target gate, open blockers, next three actions, required same-day log updates, and next handoff point
5. Confirm that prerequisite phases and review gates have been satisfied
6. If using formal parallel lanes, read `docs/production-line/README.md` and use the `backend-stage0-production-line` skill if available

If the required sprint artifact files do not exist yet, create them in the exact paths defined by the sprint prompts before feature work.

## Execution Rules

- Build exactly one graded endpoint: `GET /api/classify?name={name}`
- Preserve the exact success/error envelope shape from the sprint prompt
- Keep CORS public with `Access-Control-Allow-Origin: *`
- Generate `processed_at` at request time in UTC ISO 8601 format
- Keep the handler lightweight enough that application overhead stays below the 500 ms requirement, excluding external API latency
- Do not add databases, auth, or unrelated routes unless the target repo already requires them
- Update the official progress tracker, evidence log, decisions log, and journal artifacts in the same session as the work they describe
- During the April 10-13, 2026 overlay, update `docs/agent-ops/06_delivery-state.md` at session close
- Do not create duplicate trackers when the official sprint files already exist

## Delivery Overlay

The active rush window is April 10, 2026 through April 13, 2026, ending at `2026-04-13 23:59:00+01:00`.

- Day 1: local repo scan, route ownership, contract scaffolding
- Day 2: external API integration, confidence logic, error mapping, tests
- Day 3: deployment, live verification, README, submission pack
- Day 4: buffer, multi-network verification, final submission

If a gate slips, recover the blocked critical path before taking new scope.

## Advanced Orchestration

When work needs formal parallel lanes, task packets, or machine-readable handoffs beyond the default sprint flow:

- read `docs/production-line/README.md`
- use the `backend-stage0-production-line` skill if available
- treat the production-line docs as the control-plane specification, not a replacement for the sprint prompts

## Anti-Drift and Anti-Hallucination

- Do not invent deployment URLs, passing tests, screenshots, grader output, or submission confirmations
- Mark assumptions explicitly and keep them out of evidence logs unless verified
- If a claim cannot be linked to a file, command, public response, or live behavior, treat it as unproven
- If the brief is ambiguous, record the default decision in the decisions log and keep the message/status behavior explicit

## Stop-And-Ask

Stop and request human input on sprint-defined blockers, especially:

- conflicting route ownership inside the target repo
- missing deployment access or platform credentials
- a challenge-grader expectation that conflicts with the written prompt
- an upstream Genderize outage or rate-limit pattern that prevents live proof
- any decision that could expose secrets or private URLs

Use the mandatory question format from the sprint prompts.

## Quality Bar

Treat these as part of the definition of done, not polish:

- exact response envelopes
- exact `is_confident` rule
- real upstream integration, not stubbed data
- public CORS header
- correct live deployment on an accepted platform
- README clear enough for grading and human review
- no silent failures and no fabricated proof
