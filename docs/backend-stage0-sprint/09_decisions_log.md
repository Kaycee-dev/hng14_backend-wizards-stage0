# Decisions Log - Backend Stage 0 Sprint

Use `D-001`, `D-002`, and so on. Every entry should record:

- date
- phase or checkpoint
- options considered
- decision made
- rationale
- impact
- whether human approval was required

Seed decisions already encoded by this kit:

## D-000 - Default the no-prediction edge case to `422 Unprocessable Entity`

- Date: 2026-04-10
- Phase / Checkpoint: contract setup
- Options considered:
  - return a generic `200` error envelope
  - return `404`
  - return `422` with an explicit no-prediction message
- Decision made: default to `422` with message `No prediction available for the provided name`
- Rationale: the prompt requires an error envelope but does not define the status code; `422` is the clearest semantic fit for syntactically valid input that cannot be classified
- Impact:
  - tests and implementation should use `422` unless the grader or starter code proves a different expectation
- Human approval: not yet required unless contrary evidence appears

## D-001 - Treat the current repo as a control kit, not the implementation surface

- Date: 2026-04-10
- Phase / Checkpoint: Gate A governance bootstrap
- Options considered:
  - bootstrap a fresh application stack in this repo without confirmation
  - stop after the repo scan and request the real target repo or explicit approval to scaffold here
- Decision made: stop and request human input before creating application code because this repo contains only the Stage 0 kit
- Rationale: the repo README states that the kit intentionally does not scaffold application code, and the sprint requires the minimum-change route into the existing stack; there is no existing stack in the current working directory
- Impact:
  - tracker and proof updates can proceed today
  - endpoint implementation and local contract shell work stay blocked until route ownership is explicit
- Human approval: required

## D-002 - Bootstrap a no-dependency Node.js implementation in this repo

- Date: 2026-04-10
- Phase / Checkpoint: Gate A route-owner resolution
- Options considered:
  - scaffold a framework-heavy app such as Next.js or Express
  - create a minimal Node.js implementation with a shared handler, a local `http` server, and a Vercel-compatible route file
- Decision made: use a minimal Node.js 22 implementation with no runtime dependencies
- Rationale: the repo has no pre-existing stack, the task needs only one public endpoint, and the smallest honest surface keeps local overhead low while preserving an accepted deployment path
- Impact:
  - `server.js` is the route owner for deployment
  - `local-server.js` provides a matching local entrypoint for verification
  - tests can run with the built-in Node test runner without extra packages
- Human approval: satisfied by explicit user confirmation that this repo is the implementation repo

## D-003 - Treat malformed upstream payloads as `502`

- Date: 2026-04-10
- Phase / Checkpoint: local integration and error mapping
- Options considered:
  - treat malformed upstream JSON or invalid fields as `500`
  - classify malformed upstream payloads as upstream failure and return `502`
- Decision made: return `502` with `Failed to fetch classification data from Genderize` when the upstream payload cannot be parsed into the required contract
- Rationale: malformed payloads are upstream failures, not local business-rule validation errors, and the hardening sprint asks for honest classifiable failures
- Impact:
  - network errors, non-OK responses, invalid JSON, and unusable upstream fields all map through the same `502` envelope
  - unexpected local exceptions still return `500`
- Human approval: not required

## D-004 - Use `server.js` as the production route owner on Vercel

- Date: 2026-04-10
- Phase / Checkpoint: live deployment recovery
- Options considered:
  - keep pushing on an `api/classify.js`-first Vercel shape
  - align the deployment surface to Vercel's detected Node app entrypoint and let `server.js` serve `/api/classify`
- Decision made: use `server.js` as the production route owner and keep `local-server.js` as the local-only parity entrypoint
- Rationale: the first live Vercel logs showed requests resolving to `/var/task/server.cjs`, and removing `server.js` produced `No entrypoint found`, which proved the project was being deployed as a Node app rather than a standalone `api/` functions bundle
- Impact:
  - the public route remains exactly `GET /api/classify`
  - the local and production surfaces now share the same request handler without ambiguous Vercel routing
  - `api/classify.js` was removed to keep the deployment surface unambiguous
- Human approval: not required
