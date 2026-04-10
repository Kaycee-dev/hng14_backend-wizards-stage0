# Decisions Log - Backend Stage 0 Proof

Use this log for decisions affecting:

- README structure
- submission wording
- proof interpretation of ambiguous prompt details
- sign-off and handoff presentation

No proof-specific decisions have been recorded yet.

## PD-001 - Keep proof claims limited to the kit-only scan until implementation exists

- Date: 2026-04-10
- Phase / Checkpoint: Day 1 proof startup
- Options considered:
  - draft proof as if this repo were already the implementation surface
  - keep proof limited to the verified repo scan and blocker state
- Decision made: keep proof limited to the verified repo scan and recorded blocker
- Rationale: the proof sprint forbids inventing live URLs, tests, or implementation state, and the current repo README explicitly says this folder does not scaffold application code
- Impact:
  - README and sign-off work remain deferred
  - proof artifacts stay trustworthy and ready to extend once implementation starts
- Human approval: not required for the logging choice itself; further progress still requires route-owner clarification

## PD-002 - Keep the README deployment section explicit while the public URL is pending

- Date: 2026-04-10
- Phase / Checkpoint: README draft after local implementation
- Options considered:
  - leave the old kit README in place until deployment
  - update the README now but mark the deployment URL as pending
- Decision made: update the README immediately and keep the deployment URL explicitly marked as pending
- Rationale: the old README was no longer true after the repo became the implementation surface, and the proof sprint forbids inventing a live URL
- Impact:
  - graders and collaborators can run the project locally today
  - the README still needs one final edit once the public URL exists
- Human approval: not required

## PD-003 - Use the stable Vercel alias as the canonical base URL in proof artifacts

- Date: 2026-04-10
- Phase / Checkpoint: live deployment proof capture
- Options considered:
  - record the deployment-specific URL from the latest Vercel build
  - record the stable alias `https://backend-wizards-stage0.vercel.app` as the canonical base URL
- Decision made: use the stable alias as the canonical base URL in README, sign-off, and submission-facing artifacts
- Rationale: the alias is what a grader should hit repeatedly, while deployment-specific URLs are useful evidence but less stable
- Impact:
  - README and sign-off use one consistent live URL
  - future redeploys can preserve the same base URL while evidence logs still retain the deployment-specific history
- Human approval: not required
