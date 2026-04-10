# Lane Board

| lane | packet_id | worktree | branch | state | green_level_target | blocker_class | next_recovery_action | next_handoff_point | notes |
|---|---|---|---|---|---|---|---|---|---|
| control | bw0-control-20260410-01 | `<target-repo-root>` | main | ready | lane_green |  | keep delivery state current | Gate A review | standing control lane |
| foundation |  |  |  | drafted | gate_green |  | inspect target repo and confirm route owner | integration packet issuance |  |
| integration | bw0-integration-20260410-01 | `<target-repo-root>` | main | drafted | gate_green |  | wait for route ownership | Gate B review | main implementation lane |
| hardening |  |  |  | drafted | gate_green |  | wait for integration lane | Gate C review |  |
| deployment |  |  |  | drafted | release_green |  | wait for hardening lane | Gate D review |  |
| proof | bw0-proof-20260410-01 | `<target-repo-root>` | main | ready | lane_green |  | append logs after each session | session handoff | standing proof lane |
