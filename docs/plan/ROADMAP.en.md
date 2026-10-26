# CacheWisp implementation roadmap

**English** | [简体中文](ROADMAP.md)

The first public release includes six ecosystems, manual cleanup, monitoring, AI and Wisp. These are internal milestones, not reductions to the first-release scope or a schedule promised without benchmark evidence.

| Milestone                                 | User-verifiable outcome                                                                                   | Tasks                  | Exit criteria                                                                          |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------- |
| M0 Foundation                             | Runnable bilingual desktop app, SQLite settings survive restart, repeatable checks and builds             | CW-001                 | Complete foundation validation record                                                  |
| M1 First scan path                        | Select roots, discover JS projects and shared caches, expand projects, see progressive metrics and cancel | CW-002–CW-004          | No false detection of lookalike directories or traversal beyond authorized roots       |
| M2 Six ecosystems and trustworthy metrics | Fixtures for all six rule sets, clear disk/reclaim estimates, recent-modification filtering               | CW-005–CW-010, CW-013  | Explainable evidence/exclusions for every rule; conservative handling of shared stores |
| M3 Safe cleanup and history               | Preview, protection, Trash, permanent deletion, refreshed results and disconnected states                 | CW-011, CW-012, CW-014 | Pre-mutation revalidation and fault tests using temporary fixtures pass                |
| M4 Low-overhead residency                 | Monitoring, menu bar, quit behavior, drive reconnection and history compaction                            | CW-015, CW-016, CW-023 | No full scan/IPC per file; consistent change states                                    |
| M5 AI and Wisp                            | User-configured service, budgets, anonymized advice/follow-ups, quiet hideable Wisp                       | CW-017–CW-022          | Privacy, credentials, concurrent budgets and no-key fallback tests pass                |
| M6 Release gates                          | Full functional validation, million-file and residency benchmarks, installer and public release material  | CW-024, CW-025         | Evidence for functionality, budgets, platform support and signing strategy             |

## Recommended order

1. After CW-001, prioritize CW-002 → CW-003 → CW-004 to establish a real end-to-end scan path.
2. Start CW-021's independent Wisp window and idle-resource validation early to expose residency risks.
3. Implement ecosystem rules CW-005–CW-009 individually; do not rewrite every module horizontally in one PR.
4. Once CW-010 defines metric semantics, proceed to CW-011 → CW-012. Validate cleanup with disposable fixtures before exposing user operations.
5. CW-014 → CW-015 → CW-016 establishes snapshots, monitoring and lifecycle.
6. CW-017 → CW-018 → CW-019 → CW-020 delivers credentials, anonymization, budgets and advice. CW-022 integrates Wisp notifications.
7. CW-023 bounds history/index growth; CW-024 validates the complete release build; CW-025 delivers the release.

Independent tasks do not imply automatically spawning parallel agents. Choose tasks according to their dependencies.

## Three priority technical risks

| Risk                                          | Early validation                                                                                | Response to failure                                                                  |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Million-file metrics too slow or memory-heavy | Bounded traversal/queues, hard-link fixtures, cold/warm scan measurements                       | Reduce concurrency, adjust indexes/batches/merging, preserve metric semantics        |
| Trash behavior and cleanup races              | Temporary roots, external-volume/permission failures, replaced targets, parent/child selections | Stop the affected target and record the error; never fall back to permanent deletion |
| Wisp exceeds resident budget                  | Release prototype with one window; idle/hidden/recreation sampling                              | Reduce animation/windows; replace the Wisp rendering adapter                         |

## Progress tracking

Tasks are complete vertical slices. See the [task index](../TASKS.en.md) for states and dependencies. Every completed task needs execution evidence and limitations. Keep prerelease labeling until resource gates pass. Signing certificates and public repository permissions are final-release dependencies and do not block local development or builds.
