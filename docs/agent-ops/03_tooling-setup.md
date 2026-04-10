# Tooling Setup

## Principle

Use the target repo's existing stack when possible. This is a one-endpoint assessment, not a repo rewrite.

## Recommended Minimal Runtime Inputs

- `PORT`
- `GENDERIZE_BASE_URL=https://api.genderize.io`
- `UPSTREAM_TIMEOUT_MS=2500`

If the chosen stack does not need env vars for the public Genderize URL, document the hardcoded default in the README and deployment spec.

## Stack Guidance

- Node.js: prefer the repo's existing framework; if none exists, use a minimal server or API route layer
- Python: prefer FastAPI or the framework already present
- Go: prefer stdlib or the router already present
- Java/.NET: use the existing app surface; do not bootstrap a second server unless unavoidable

## Verification Guidance

- keep one local command for running the server
- keep one local command for running tests
- keep one direct command or script for live smoke checks

## Performance Guidance

- avoid databases and heavy startup work
- reuse an HTTP client if the stack supports it
- keep JSON shaping in-process and simple
