# Stage 0 Rollout

## Initial Lane Board

| Lane | Window | Preconditions | Success signal |
|---|---|---|---|
| control | all days | none | delivery state and packets stay current |
| foundation | Day 1 | none | route owner and stack are confirmed |
| integration | Days 1-2 | foundation stable | local endpoint contract is green |
| hardening | Days 2-3 | integration present | tests, CORS, and multi-request checks are green |
| deployment | Days 3-4 | hardening ready | public endpoint and README are green |
| proof | all days | none | same-day logs are current |

## Serialization Rules

- `foundation` blocks `integration`
- `integration` blocks `hardening` and `deployment`
- `proof` runs alongside every active lane

## Immediate Groundwork Tasks

1. instantiate the lane board from `templates/lane-board.md`
2. issue a standing `proof` packet
3. issue the first `integration` packet after route ownership is settled
