# API Contract

## Endpoint

- Method: `GET`
- Route: `/api/classify`
- Query parameter: `name`

## Success Contract

```json
{
  "status": "success",
  "data": {
    "name": "john",
    "gender": "male",
    "probability": 0.99,
    "sample_size": 1234,
    "is_confident": true,
    "processed_at": "2026-04-01T12:00:00Z"
  }
}
```

## Processing Rules

- `sample_size` is the renamed upstream `count`
- `is_confident` is `true` only when both conditions pass:
  - `probability >= 0.7`
  - `sample_size >= 100`
- `processed_at` is generated per request in UTC ISO 8601 format

## Error Contract

All errors use:

```json
{ "status": "error", "message": "<error message>" }
```

Default status/message mapping for this kit:

| Case | Status | Message |
|---|---|---|
| missing `name` | 400 | `Missing or empty name parameter` |
| empty `name` after trim | 400 | `Missing or empty name parameter` |
| `name` is array/object/non-string | 422 | `name must be a string` |
| upstream returns `gender: null` or `count: 0` | 422 | `No prediction available for the provided name` |
| upstream request fails or times out | 502 | `Failed to fetch classification data from Genderize` |
| unexpected local failure | 500 | `Internal server error` |

## Type-Handling Note

HTTP query parameters are strings in many frameworks. Some frameworks can still expose repeated keys or structured query parsing as arrays/objects. Reject those as `422` when detectable and document framework behavior if the path is difficult to trigger in practice.
