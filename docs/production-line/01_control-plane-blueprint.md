# Control-Plane Blueprint

## Objective

Run Stage 0 as a controlled delivery line instead of a loose chat-driven effort.

## System Layers

### 1. Direction Layer

Actor: human operator

Responsibilities:

- confirm the target repo and deployment platform
- approve gate closures
- resolve real ambiguities

### 2. Control Layer

Actor: conductor/orchestrator

Responsibilities:

- convert directives into task packets
- assign lane type, scope, and green level
- keep delivery state current

### 3. Lane Layer

Recommended lane families:

- `control`
- `foundation`
- `integration`
- `hardening`
- `deployment`
- `proof`

### 4. Verification Layer

Responsibilities:

- run declared checks
- determine whether the lane achieved its green level

### 5. Proof Layer

Responsibilities:

- update trackers and logs
- preserve deployment and test evidence

## Canonical Artifacts

- lane board
- task packet
- delivery state
- lane closeout
- sign-off log
