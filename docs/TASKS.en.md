# CacheWisp task index

**English** | [简体中文](TASKS.md)

25 verifiable vertical tasks derived from the [detailed plan](plan/PRODUCT-PLAN.en.md) and [roadmap](plan/ROADMAP.en.md). Local task files are committed execution records. Preserve CW IDs if later mirrored to GitHub Issues.

P0 covers foundation, reliability and release gates; P1 covers AI/Wisp integrated afterward. Both belong to the confirmed first release. AFK tasks can follow the agreed design; HITL tasks require final release credentials or a human public-release action.

Task detail files currently use Chinese, with English metadata/section labels. Links below open those original records, including their acceptance criteria and evidence.

| ID                                                             | Task                                                     | Priority | Type | Blocking dependencies                                                                          | Execution               |
| -------------------------------------------------------------- | -------------------------------------------------------- | -------- | ---- | ---------------------------------------------------------------------------------------------- | ----------------------- |
| [CW-001](../.scratch/cachewisp/issues/01-foundation.md)        | Foundation and runnable end-to-end setup                 | P0       | AFK  | None                                                                                           | Done                    |
| [CW-002](../.scratch/cachewisp/issues/02-scan-roots.md)        | Select, persist and authorize scan roots                 | P0       | AFK  | CW-001                                                                                         | Ready                   |
| [CW-003](../.scratch/cachewisp/issues/03-javascript-scan.md)   | First JS/TS project and shared-cache scan                | P0       | AFK  | CW-002                                                                                         | Blocked by dependencies |
| [CW-004](../.scratch/cachewisp/issues/04-project-hierarchy.md) | Project hierarchy and shared-cache views                 | P0       | AFK  | CW-003                                                                                         | Blocked by dependencies |
| [CW-005](../.scratch/cachewisp/issues/05-python-rules.md)      | Python artifacts and shared caches                       | P0       | AFK  | CW-004                                                                                         | Blocked by dependencies |
| [CW-006](../.scratch/cachewisp/issues/06-go-rules.md)          | Go cache detection and shared scopes                     | P0       | AFK  | CW-004                                                                                         | Blocked by dependencies |
| [CW-007](../.scratch/cachewisp/issues/07-jvm-rules.md)         | Conservative Java/Kotlin Maven/Gradle rules              | P0       | AFK  | CW-004                                                                                         | Blocked by dependencies |
| [CW-008](../.scratch/cachewisp/issues/08-rust-rules.md)        | Rust projects and shared download caches                 | P0       | AFK  | CW-004                                                                                         | Blocked by dependencies |
| [CW-009](../.scratch/cachewisp/issues/09-swift-xcode-rules.md) | Swift/Xcode artifacts and project mapping                | P0       | AFK  | CW-004                                                                                         | Blocked by dependencies |
| [CW-010](../.scratch/cachewisp/issues/10-measurement.md)       | Trustworthy disk metrics and selection reclaim estimates | P0       | AFK  | CW-003, CW-004                                                                                 | Blocked by dependencies |
| [CW-011](../.scratch/cachewisp/issues/11-trash-cleanup.md)     | Cleanup previews, protection and native Trash            | P0       | AFK  | CW-004, CW-010                                                                                 | Blocked by dependencies |
| [CW-012](../.scratch/cachewisp/issues/12-permanent-cleanup.md) | Separately confirmed permanent deletion                  | P0       | AFK  | CW-011                                                                                         | Blocked by dependencies |
| [CW-013](../.scratch/cachewisp/issues/13-activity-filters.md)  | Recent modification, search and combined filters         | P0       | AFK  | CW-004                                                                                         | Blocked by dependencies |
| [CW-014](../.scratch/cachewisp/issues/14-snapshots.md)         | Persistent snapshots, change lists and offline volumes   | P0       | AFK  | CW-004, CW-010                                                                                 | Blocked by dependencies |
| [CW-015](../.scratch/cachewisp/issues/15-monitoring.md)        | Optional monitoring and bounded reconciliation           | P0       | AFK  | CW-014                                                                                         | Blocked by dependencies |
| [CW-016](../.scratch/cachewisp/issues/16-tray-lifecycle.md)    | Menu-bar residency and external-drive lifecycle          | P0       | AFK  | CW-015                                                                                         | Blocked by dependencies |
| [CW-017](../.scratch/cachewisp/issues/17-ai-connection.md)     | User-configured AI, OS credentials and connection test   | P1       | AFK  | CW-001                                                                                         | Ready                   |
| [CW-018](../.scratch/cachewisp/issues/18-ai-anonymization.md)  | Important-change candidates and strict anonymization     | P1       | AFK  | CW-014, CW-017                                                                                 | Blocked by dependencies |
| [CW-019](../.scratch/cachewisp/issues/19-ai-budget.md)         | Automatic call budgets and usage settings                | P1       | AFK  | CW-017, CW-018                                                                                 | Blocked by dependencies |
| [CW-020](../.scratch/cachewisp/issues/20-ai-advice.md)         | AI advice cards and preset follow-ups                    | P1       | AFK  | CW-018, CW-019                                                                                 | Blocked by dependencies |
| [CW-021](../.scratch/cachewisp/issues/21-wisp-renderer.md)     | Lightweight Wisp window and resource validation          | P1       | AFK  | CW-001                                                                                         | Ready                   |
| [CW-022](../.scratch/cachewisp/issues/22-wisp-advice.md)       | Wisp monitoring status and quiet notifications           | P1       | AFK  | CW-016, CW-020, CW-021                                                                         | Blocked by dependencies |
| [CW-023](../.scratch/cachewisp/issues/23-history-retention.md) | Bounded history, storage and long-run stability          | P0       | AFK  | CW-014, CW-015                                                                                 | Blocked by dependencies |
| [CW-024](../.scratch/cachewisp/issues/24-benchmarks.md)        | Million-file and full-residency acceptance               | P0       | AFK  | CW-005, CW-006, CW-007, CW-008, CW-009, CW-011, CW-012, CW-013, CW-016, CW-021, CW-022, CW-023 | Blocked by dependencies |
| [CW-025](../.scratch/cachewisp/issues/25-release.md)           | Full-scope release acceptance and macOS package          | P0       | HITL | CW-005, CW-006, CW-007, CW-008, CW-009, CW-012, CW-013, CW-020, CW-024                         | Blocked by dependencies |

## Starting the next task

1. Read the domain vocabulary and relevant ADRs. Verify every dependency is done.
2. Set Execution to in-progress, implement the complete path and check each acceptance criterion.
3. Run task-specific verification and foundation checks; record evidence and limitations.
4. Mark Status and Execution as done and update this index. Compilation alone does not establish unimplemented capabilities.

## Current scope

CW-001 is the initialized delivery. CW-002 onward remain future implementation: scanning, cleanup, monitoring, AI and floating Wisp are not yet delivered.

## Documentation maintenance

- [x] English default homepage, Chinese homepage, bilingual contributing guides and language navigation for the main engineering documents. Both languages are included in local-link checks. See CW-001 for verification evidence.
