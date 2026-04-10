# Sprint Prompt v1.0: Backend Wizards Stage 0 - Proof, README, and Submission Discipline

## 0. Mission Parameters

This sprint keeps the work defensible. It exists so the final repo, README, logs, and submission data tell the same true story.

The proof sprint starts on Day 1. Do not wait until deployment to capture evidence.

## 1. Required Proof Artifacts

- `docs/backend-stage0-proof/01_raw_journal/2026-04-10_day_1.md`
- `docs/backend-stage0-proof/06_progress_tracker.md`
- `docs/backend-stage0-proof/07_evidence_log.md`
- `docs/backend-stage0-proof/08_decisions_log.md`
- `docs/backend-stage0-sprint/10_signoff_log.md`

## 2. Stage 1 - Continuous Build Journaling

Every substantive session records:

- what changed
- why it changed
- commands run
- failure modes encountered
- next starting point

Journal structure:

```md
# Build Journal - Day N: [YYYY-MM-DD]

## Session focus

## What I changed

## Decision points

## What broke and how I fixed it

## Verification captured

## Next starting point
```

## 3. Stage 2 - README Requirements

The README must make grading easy. It must include:

- project summary
- chosen stack
- local run steps
- deployment URL
- endpoint contract
- sample success response
- sample error responses
- notes on `is_confident`
- notes on CORS and the accepted deployment platform

Do not over-explain unrelated architecture. This is a grading README, not a product essay.

## 4. Stage 3 - Submission Proof

Before submission, capture evidence for:

- one live success response
- one live error response
- public CORS header
- the final public base URL
- the GitHub repo URL
- the exact stack wording used in submission

## 5. Proof Rules

- Never invent a deployment URL, grader pass, or test result.
- If a live check failed, record the failure and recovery.
- If a requirement is ambiguous, record the chosen interpretation in the decisions log.
