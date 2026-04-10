# Test Matrix

| ID | Scenario | Expected result |
|---|---|---|
| T-001 | `GET /api/classify?name=john` with upstream confident payload | `200`, success envelope, `sample_size` present, `is_confident: true` |
| T-002 | success payload with `probability < 0.7` | `200`, `is_confident: false` |
| T-003 | success payload with `count < 100` | `200`, `is_confident: false` |
| T-004 | missing `name` | `400`, error envelope, exact missing/empty message |
| T-005 | empty `name` or whitespace-only `name` | `400`, error envelope, exact missing/empty message |
| T-006 | array/object/non-string `name` when framework exposes it | `422`, exact type message |
| T-007 | upstream payload with `gender: null` | `422`, exact no-prediction message |
| T-008 | upstream payload with `count: 0` | `422`, exact no-prediction message |
| T-009 | upstream timeout or network failure | `502`, exact upstream-failure message |
| T-010 | unexpected local exception | `500`, exact internal-error message |
| T-011 | live response headers | `Access-Control-Allow-Origin: *` present |
| T-012 | repeated requests | server remains responsive under a short burst |
