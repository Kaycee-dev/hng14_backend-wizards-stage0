# Sprint Prompt v1.0: Backend Wizards Stage 0 - Reliability, Deployment, and Grading Hardening

## 0. Mission Parameters

This sprint is the companion to the main execution sprint. Its purpose is to maximize score without adding scope.

Primary outcomes:

- deterministic error handling
- lightweight performance posture
- repeatable verification
- accepted-platform deployment
- submission-ready documentation

Non-goals:

- adding non-graded endpoints
- introducing storage or authentication
- redesigning the target repo around the challenge

## 1. Required Companion Artifacts

- `docs/backend-stage0-delivery/00_deployment_spec.md`
- `docs/backend-stage0-delivery/01_submission_checklist.md`
- `docs/backend-stage0-delivery/06_progress_tracker.md`
- `docs/backend-stage0-delivery/07_evidence_log.md`
- `docs/backend-stage0-delivery/08_decisions_log.md`

## Phase 0 - Upstream Behavior Policy

Set and document:

- the outbound Genderize base URL
- the upstream timeout budget
- how `502` is emitted for upstream failures
- how internal exceptions differ from upstream failures

Required outcome:

- failures are honest and classifiable

## Phase 1 - Verification Matrix

Maintain a runnable verification set that covers:

- envelope correctness
- field extraction correctness
- confidence-logic correctness
- edge-case correctness
- public CORS header
- multiple-request stability

If the target stack makes the `422 name is not a string` path difficult to trigger, document the parser behavior and still keep the defensive guard in code.

## Phase 2 - Deployment Policy

Deployment must be:

- public
- reachable by the grading script
- unprotected by auth or preview gates
- hosted on an accepted platform

Deployment guidance:

- prefer the platform already closest to the target repo
- prefer one-process simplicity over feature richness
- keep environment requirements minimal

## Phase 3 - Submission Pack

Before final submission:

- live base URL confirmed
- README clear and current
- exact stack named
- submission checklist filled
- sign-off log complete

If the platform or live URL is unstable, do not submit until the instability is resolved or explicitly accepted by the human operator.
