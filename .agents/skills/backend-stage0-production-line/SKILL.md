---
name: backend-stage0-production-line
description: Run Backend Wizards Stage 0 as a small multi-lane control plane with typed task packets, explicit lane states, named green levels, and clean handoffs. Use when decomposing the assessment into control, foundation, integration, hardening, deployment, or proof lanes, or when a resumable handoff is needed.
---

# Backend Stage0 Production Line

Use this skill when the Stage 0 work needs formal packets and resumable lane state instead of a single free-form session.

## Start Here

1. Read `docs/production-line/README.md`.
2. Read `docs/production-line/01_control-plane-blueprint.md`.
3. Read `docs/production-line/02_task-packet-spec.md`.
4. Read `docs/production-line/03_lane-model.md`.
5. Read `docs/production-line/04_stage0-rollout.md`.

## Workflow

1. Convert the current directive into a typed packet.
2. Assign the correct lane family and target green level.
3. Define verification and evidence updates before work begins.
4. Update the runtime lane board as state changes.
5. End every lane with a closeout and next starting point.

## Hard Rules

- Do not dispatch non-trivial work without a packet.
- Do not say a lane is green without naming the green level.
- Do not merge deployment proof into implementation proof by memory alone.
- Do not leave the delivery state or lane board stale after a substantive session.

## Reference Map

- `references/lane-families.md`: lane meanings and ownership
- `references/green-levels.md`: what each green level means
