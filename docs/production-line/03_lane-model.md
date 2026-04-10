# Lane Model

## Lane Types

- `control`: delivery state, gate timing, packet issuance
- `foundation`: repo scan, route ownership, artifact bootstrap
- `integration`: handler logic, Genderize call, transform, error mapping
- `hardening`: tests, repeated-request checks, CORS verification
- `deployment`: hosting, public URL, README, sign-off
- `proof`: progress/evidence/decisions logs and journal updates

## Lane State Machine

1. `drafted`
2. `queued`
3. `ready`
4. `running`
5. `verifying`
6. `blocked`
7. `review_ready`
8. `merged`
9. `failed`
10. `archived`

## Failure Taxonomy

- `trust_gate`
- `route_ownership`
- `env_missing`
- `compile`
- `test`
- `external_service`
- `deployment`
- `docs_proof`

## Green Contract

- `targeted_green`: narrow lane checks passed
- `lane_green`: all declared lane checks passed
- `gate_green`: gate evidence is ready for review
- `release_green`: live endpoint, README, and submission pack are complete
