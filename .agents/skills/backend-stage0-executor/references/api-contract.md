# API Contract

Required route:

- `GET /api/classify?name={name}`

Required transform:

- rename `count` to `sample_size`
- compute `is_confident` as `probability >= 0.7 AND sample_size >= 100`
- generate `processed_at` per request in UTC ISO 8601 format

Required errors:

- `400` for missing or empty `name`
- `422` for non-string `name` when detectable
- default `422` for `gender: null` or `count: 0`
- `502` for upstream request failure
- `500` for unexpected local failure

Required header:

- `Access-Control-Allow-Origin: *`
