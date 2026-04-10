# Transition and Handoff

This project is small enough that the critical handoff is session-to-session, not IDE-to-IDE.

## Required Handoff Outputs

- current gate status
- files changed
- checks run
- live deployment status
- next exact starting point
- next human decision point

## Minimum Handoff Contract

At session close, the active agent must leave:

- `docs/agent-ops/06_delivery-state.md` current
- progress, evidence, and decisions logs updated
- the proof journal updated for the day if build work happened
- the next exact command, file, or URL to touch
