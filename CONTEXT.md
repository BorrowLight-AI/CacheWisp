# CacheWisp domain context

## Product

CacheWisp（轻灵）is a lightweight, free, open-source developer disk-space manager with an optional monitoring companion. It ships on macOS first and preserves a reusable core for later Windows/Linux work.

The first release supports six ecosystems. Core scanning, manual cleanup and local monitoring work without AI credentials. AI sees anonymized measurements only.

## Vocabulary

| Term                                     | Meaning                                                                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 扫描根目录 / Scan root                   | A directory explicitly selected by the user; nested/overlapping roots must not double count.                                                     |
| 项目 / Project                           | A contextual development unit identified by version control and language/workspace manifests. A Git repository can contain child projects.       |
| 开发产物 / Artifact                      | A recognized dependency directory, tool cache or temporary build output. The model is broader than literal caches.                               |
| 内置规则 / Built-in rule                 | A versioned detector with ecosystem, contextual evidence, scope, cleanup policy and explicit exclusions. A directory name alone is insufficient. |
| 全局共享缓存 / Shared cache              | A tool-owned cache or store shared by projects. It has a separate view and cleanup scope.                                                        |
| 目录大小 / Logical size                  | The sum of logical file lengths according to the documented traversal policy. It is not a reclaimable-space guarantee.                           |
| 磁盘占用估算 / Disk-use estimate         | An allocated-storage estimate with known hard-link deduplication and documented APFS limitations.                                                |
| 预计释放空间 / Reclaim estimate          | A selection-specific estimate; it may be unknown and must never be labeled guaranteed freed space.                                               |
| 已处理大小 / Processed size              | Size associated with successfully moved/deleted targets; distinct from volume free-space change.                                                 |
| 项目保护 / Project protection            | A user mark blocking project-local cleanup until explicitly removed.                                                                             |
| 最近修改 / Recent modification           | A bounded source/project-file activity signal; never called last-used or treated as proof of safe removal.                                       |
| 扫描快照 / Scan snapshot                 | Timestamped measurements and per-scope completeness; partial or disconnected results remain visibly partial.                                     |
| 变化事件 / Change event                  | An aggregated difference between measurements, not every raw filesystem event.                                                                   |
| 清理预览 / Cleanup preview               | An explicit selection and mode, estimated impact, protections and fresh backend target identity.                                                 |
| 监控 / Monitoring                        | Opt-in event observation plus bounded rescan; no automatic cleanup.                                                                              |
| AI 建议 / AI advice                      | Evidence-linked explanation or possibility from anonymized statistics; cannot assert a proven cause without evidence.                            |
| Wisp / 小精灵                            | An optional draggable, hideable desktop character for status and quiet advice. Hidden Wisp does not stop monitoring.                             |
| 自动分析预算 / Automatic analysis budget | Configurable local-calendar-day allowance for automatic model calls; default 20, zero pauses automatic calls. Manual calls are separate.         |

## Invariants

1. Same physical file identity is not independently counted in an aggregate more than the metric definition permits. Overlapping artifact roots are normalized before totals/cleanup.
2. A missing permission, interrupted scan or offline drive is not a zero-byte result.
3. No source files, runtime/SDK installations, simulator user data or irreplaceable archives enter a cleanup set.
4. Native Trash failure is an error requiring a user decision, never implicit permanent deletion.
5. Preview revalidation and per-target outcomes are required even after a scan succeeded.
6. AI has no deletion capability and cannot introduce paths outside the backend inventory.
7. Local-to-provider alias mapping stays on-device. Counts and Token usage that are unavailable remain unknown, not zero.
8. Related-process resident memory and CPU are measured under a documented scenario; budget numbers in the UI are targets until benchmarks pass.

## Current implementation boundary

Initialized: Rust workspace/core settings types, Tauri desktop bridge, SQLite schema v1/preferences, bilingual foundation UI and development checks. The remaining domain objects and behaviors live in the 25-task backlog; their presence in this glossary does not mean implementation is complete.
