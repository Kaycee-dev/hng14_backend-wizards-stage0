# Task Packet Specification

Use this spec to dispatch non-trivial Stage 0 work.

## Packet Shape

```yaml
packet_id: bw0-<lane>-<yyyymmdd>-<nn>
day: <overlay day>
lane_type: control | foundation | integration | hardening | deployment | proof
objective: >
  One sentence describing the finished state.
scope_in:
  - owned files, modules, or behaviors
scope_out:
  - areas the lane must not edit without escalation
repo_root: <absolute repo path>
worktree:
  path: <absolute path>
  branch: <branch name>
primary_surface: shell | mixed | editor
required_reads:
  - AGENTS.md
  - relevant sprint prompt
inputs:
  - prior packet ids or gate dependencies
deliverables:
  - concrete outputs
verification:
  commands:
    - exact commands
  manual_proofs:
    - live URL or behavior checks
green_level: targeted_green | lane_green | gate_green | release_green
evidence_updates:
  - progress tracker
  - evidence log
  - decisions log
  - raw journal
escalate_when:
  - exact blocker conditions
closeout_contract:
  must_report:
    - summary
    - files changed
    - checks run
    - blocker status
    - next exact starting point
    - next handoff point
```

## Example - Integration Lane

```yaml
packet_id: bw0-integration-20260410-01
day: Day 1
lane_type: integration
objective: >
  Ship a locally verifiable GET /api/classify endpoint that transforms the real Genderize payload into the graded contract.
scope_in:
  - endpoint handler
  - upstream client
  - response transform
scope_out:
  - unrelated routes
  - repo-wide architecture rewrites
green_level: gate_green
```
