# Deadline Overlay

Use this file as the dated execution overlay for the April 10-13, 2026 delivery window.

## Overlay Defaults

- Window: `2026-04-10` through `2026-04-13`
- Final cutoff used by this kit: `2026-04-13 23:59:00+01:00`
- Note: the brief labels the deadline day as Sunday, but `2026-04-13` is Monday
- Mode: fast-turn, single-endpoint delivery
- Gate approvals: same-day

## Daily Operating Rhythm

1. Session start
   - read `06_delivery-state.md`
   - confirm day/date, checkpoint, target gate, blockers, next three actions
2. Build block
   - work only on the current critical path
3. Proof block
   - update progress, evidence, decisions, and journal artifacts
4. Session close
   - update `06_delivery-state.md`
   - record the next exact starting point and next handoff point

## Gate Calendar

| Gate | Planned day | Date | Required by close of |
|---|---|---|---|
| Gate A | Day 1 | 2026-04-10 | repo scan, route ownership, artifact bootstrap, local contract shell |
| Gate B | Day 2 | 2026-04-11 | real integration, transform logic, local error verification |
| Gate C | Day 3 | 2026-04-12 | public deployment, live CORS proof, README |
| Gate D | Day 4 | 2026-04-13 | final live smoke, sign-off, submission readiness |

## Daily Plan

| Day | Critical path | Required proof |
|---|---|---|
| Day 1 - Fri Apr 10 | repo scan, stack choice, route ownership, artifact bootstrap, local `400` and validation shell | progress tracker, first evidence entry, first decisions entry, Day 1 journal |
| Day 2 - Sat Apr 11 | Genderize client, response shaping, `is_confident`, edge-case handling, local tests | updated progress/evidence/decisions logs, test matrix confirmation |
| Day 3 - Sun Apr 12 | deploy to accepted platform, verify live success/error/CORS, update README | live evidence, deployment decisions, sign-off draft |
| Day 4 - Mon Apr 13 | repeat live smoke, multi-request sanity check, final submission | final sign-off, submission checklist, delivery state closeout |

## Slippage Policy

- If a gate slips, recover the blocked path before adding polish.
- README improvements never outrank a broken public endpoint.
- Same-day proof updates are part of the deliverable, not optional admin work.
