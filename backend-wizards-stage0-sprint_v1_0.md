# Sprint Prompt v1.0: Backend Wizards Stage 0 - Genderize API Integration Assessment

## 0. Mission Parameters

Objective:

- Build a single public endpoint: `GET /api/classify?name={name}`
- Call the Genderize API
- Return a processed response that follows the exact envelope below

Success response contract:

```json
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-01T12:00:00Z"
  }
}
```

Required processing:

- extract `gender`, `probability`, and `count`
- rename `count` to `sample_size`
- compute `is_confident` as `probability >= 0.7 AND sample_size >= 100`
- generate `processed_at` on every request in UTC ISO 8601 format

Required error envelope:

```json
{ "status": "error", "message": "<error message>" }
```

Canonical error messages for this sprint:

- `400`: `Missing or empty name parameter`
- `422`: `name must be a string`
- `422` no-prediction edge case: `No prediction available for the provided name`
- `502`: `Failed to fetch classification data from Genderize`
- `500`: `Internal server error`

Hard rules:

- no hardcoded `processed_at`
- no fake or cached fallback payloads during outages unless the prompt is explicitly changed
- public CORS must include `Access-Control-Allow-Origin: *`
- handler overhead must stay below the 500 ms requirement, excluding external API latency
- the endpoint must survive multiple requests without process collapse
- deploy only to an accepted platform; the brief explicitly says Render is not accepted

Known prompt ambiguities that must stay explicit:

- The brief says `Sunday, 13th Apr 2026`, but `2026-04-13` is a Monday. Use the stated cutoff timestamp `2026-04-13 23:59:00+01:00` unless the organizer corrects it.
- The brief does not assign a status code to the `No prediction available for the provided name` edge case. The default sprint decision is `422 Unprocessable Entity` with the exact message above unless the target repo or grader proves otherwise.

## 1. Required Sprint Artifacts

Create and maintain these exact files:

- `docs/backend-stage0-sprint/00_api_contract.md`
- `docs/backend-stage0-sprint/01_test_matrix.md`
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

## 2. Communication Protocol

When blocked, use this exact format:

## QUESTION: [Short Title]

- blocker:
- why it blocks progress:
- options:
  - option 1
  - option 2
- recommendation:
- decision needed by:

At meaningful session start:

## SESSION START: [timestamp]

- current day/date:
- target gate:
- checkpoint:
- blockers:
- next three actions:
- logs to update this session:

At session close:

## SESSION END: [timestamp]

- what changed:
- checks run:
- files updated:
- blockers remaining:
- next exact starting point:
- next handoff point:

## 3. Human Review Gates

- Gate A - `2026-04-10`
  - target repo scanned
  - route ownership confirmed
  - required sprint artifacts exist
  - local endpoint shell returns correct `400` and type-validation behavior
- Gate B - `2026-04-11`
  - real Genderize integration complete
  - success transform and `is_confident` logic verified
  - edge cases and upstream-failure mapping verified locally
- Gate C - `2026-04-12`
  - public deployment responds correctly
  - CORS header verified live
  - README and submission checklist are ready
- Gate D - `2026-04-13`
  - multi-request live smoke is green
  - submission inputs are complete
  - sign-off log is ready before final submission

Human approval is required at every gate.

## 4. Rollback Policy

- If a deployment breaks the only public endpoint, restore the last known-good build before adding new changes.
- If route ownership inside the target repo is unclear, stop and ask before editing the wrong service.
- If the upstream API is failing, do not mask the failure with invented data.

## Phase 0 - Governance Bootstrap

1. Inspect the target repo and choose the minimum-change route into the existing stack.
2. Confirm whether the repo already has an HTTP server or API framework.
3. Create the required sprint artifacts before feature work.
4. Decide how the repo will expose `GET /api/classify`.
5. Record the stack, route owner, and deployment target in the logs.

Deliverable:

- one clear implementation path, not multiple competing server entrypoints

## Phase 1 - Endpoint Contract and External API Integration

Implement:

- query extraction for `name`
- trimming and empty-input rejection
- non-string rejection when the framework can surface array/object values
- outbound call to Genderize with a bounded timeout
- response transform with `sample_size`, `is_confident`, and `processed_at`
- no-prediction handling for `gender: null` or `count: 0`
- upstream/network failure mapping

Do not:

- introduce persistence
- add caching before correctness is proven
- add extra query parameters or alternate routes

## Phase 2 - Hardening and Verification

Verify at minimum:

- success path
- not-confident success path
- missing `name`
- empty `name`
- non-string `name` when parser/framework exposes it
- no-prediction edge case
- upstream timeout/network failure
- malformed upstream payload or unexpected internal exception
- live CORS header
- repeated-request stability

Keep the handler small, deterministic, and stateless.

## Phase 3 - Deployment and Live Verification

Deployment output must include:

- one public base URL
- one public `GET /api/classify` route
- live proof that the returned JSON matches the sprint contract
- live proof that `Access-Control-Allow-Origin: *` is present

Preferred deployment qualities:

- low cold-start overhead
- no access gate in front of the endpoint
- easy redeploy and log inspection

## Phase 4 - Submission Closeout

Before submission:

- verify the live endpoint from at least two names and one error case
- confirm the base URL is public and stable
- finalize the README
- fill the sign-off log and submission checklist
- submit base URL, GitHub repo, full name, email, and stack through the required channel
