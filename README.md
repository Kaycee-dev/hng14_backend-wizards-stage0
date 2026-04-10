# Backend Wizards Stage 0

Single-endpoint Genderize integration for the Backend Wizards Stage 0 assessment.

## Stack

- Node.js 22
- Native `http` server for local development
- Vercel Node deployment with `server.js` as the production entrypoint
- No runtime dependencies

## Deployment URL

- Base URL: `https://backend-wizards-stage0.vercel.app`
- Accepted platform: Vercel

## Local Run

Node.js 22 is required.

```bash
npm test
npm run dev
```

The local server listens on `http://127.0.0.1:3000`.

Optional environment variables:

- `PORT` default `3000`
- `GENDERIZE_BASE_URL` default `https://api.genderize.io`
- `UPSTREAM_TIMEOUT_MS` default `2500`

## Endpoint Contract

`GET /api/classify?name={name}`

Success response:

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

Error responses:

```json
{ "status": "error", "message": "Missing or empty name parameter" }
```

```json
{ "status": "error", "message": "name must be a string" }
```

```json
{ "status": "error", "message": "No prediction available for the provided name" }
```

```json
{ "status": "error", "message": "Failed to fetch classification data from Genderize" }
```

```json
{ "status": "error", "message": "Internal server error" }
```

## `is_confident` Rule

`is_confident` is `true` only when both of these pass:

- `probability >= 0.7`
- `sample_size >= 100`

If either condition fails, `is_confident` is `false`.

## CORS And Platform Notes

- Every response includes `Access-Control-Allow-Origin: *`
- The production entrypoint is `server.js`, which serves the graded `/api/classify` route on Vercel
- `local-server.js` exists for local development and mirrors the same request handling logic
