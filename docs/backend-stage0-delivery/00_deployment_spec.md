# Deployment Spec

## Accepted Platforms

The prompt allows platforms such as:

- Vercel
- Railway
- Heroku
- AWS
- PXXL App

The prompt explicitly says Render is not accepted.

## Chosen Deployment Path

- Planned platform: Vercel
- Deployed route owner: `server.js`
- Local parity entrypoint: `local-server.js`
- Shared request logic: `src/classify-service.js`
- Public route shape after deploy: `/api/classify`
- Public URL: `https://backend-wizards-stage0.vercel.app`

## Deployment Requirements

- one public base URL
- no auth gate or preview protection in front of the endpoint
- one stable `GET /api/classify` route
- public CORS header `Access-Control-Allow-Origin: *`
- runtime fast enough that application overhead stays below the 500 ms budget

## Operational Expectations

- keep the service small and stateless
- set a finite upstream timeout
- make logs inspectable enough to diagnose live failures
- avoid runtime dependencies unrelated to the endpoint

## Runtime Inputs

- `PORT` for local or non-Vercel process hosting
- `GENDERIZE_BASE_URL` default `https://api.genderize.io`
- `UPSTREAM_TIMEOUT_MS` default `2500`
