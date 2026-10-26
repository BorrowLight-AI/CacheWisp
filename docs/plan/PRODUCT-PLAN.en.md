# CacheWisp detailed product and implementation plan

**English** | [简体中文](PRODUCT-PLAN.md)

Version: first-release baseline v1. Date: 2026-10-26. This document separates confirmed product decisions from engineering defaults. See the [task index](../TASKS.en.md) for authoritative task tracking. This translation follows the [Chinese plan](PRODUCT-PLAN.md), which records the conversation decisions.

## 1. Product definition and goals

CacheWisp (轻灵) is a free, open-source desktop developer-space manager. It helps developers understand dependencies, caches and temporary build artifacts in selected directories, manage shared caches separately, and clean up manually after explicit selection. Optional monitoring and AI advice highlight changes worth reviewing; desktop Wisp provides quiet notifications.

macOS ships first, distributed as GitHub source and downloadable application packages. Scanning, metrics and rules remain independent of the UI and OS for future Windows/Linux reuse. Resident resource overhead takes priority over complex visual effects.

Core flow: select scope → progressive scan → assess usage by project → preview cleanup impact → user confirmation → process each target → update metrics and history.

## 2. Confirmed first-release boundaries

| Decision       | First-release requirement                                                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Platform       | macOS first; Windows/Linux may follow and are outside first-release compatibility acceptance                                                                |
| Scale          | Hundreds of projects, millions of files; scan duration established by measurement in a fixed environment                                                    |
| Scope          | Multiple user-selected roots, internal and external HDD/SSD storage; separate shared-cache entry                                                            |
| Ecosystems     | JavaScript/TypeScript, Python, Go, Java/Kotlin, Rust, Swift/Xcode                                                                                           |
| Projects       | Repository/workspace parent summaries; expandable children with independent cleanup; no duplicate aggregation of overlapping scopes                         |
| Pages          | Project-first, sorted by usage; ecosystem, artifact-type and recent-modification filters                                                                    |
| Cleanup        | Built-in rules only; native Trash by default; optional permanent deletion; manual project protection                                                        |
| Refresh        | Manual by default; optional monitoring for selected directories; preserve last scan and timestamp                                                           |
| Residency      | Menu-bar monitoring after main window closes; explicit quit stops work; Wisp independently hideable                                                         |
| AI             | User-configured service URL, key and model; Chat Completions-compatible protocol; connection test                                                           |
| AI data        | Anonymized metrics only; project aliases mapped locally; no real names, paths, filenames or contents sent                                                   |
| AI interaction | Automatic analysis of important changes; advice cards and preset follow-ups; actions open cleanup previews                                                  |
| AI budget      | Configurable in settings; default 20 automatic analyses per day; manual analyses counted separately                                                         |
| Notifications  | Quiet by default; coalesce ordinary changes and cool down repeated issues; proactive alerts for low space, sustained abnormal growth and similar conditions |
| Interface      | Simple developer-tool style, system fonts, simple 2D Wisp; Chinese/English, follows system language with manual switching                                   |
| Resources      | No scan, main window closed, Wisp visible, monitoring enabled: combined related-process memory ≤150 MB, average idle CPU <1%                                |

The first release excludes custom cleanup rules, automatic cleanup, dedicated network/NAS support, SDK/compiler/runtime uninstallation, simulator-device/user-data cleanup, general AI chat and model-executed system commands.

## 3. User stories and traceability

| ID   | User story                                                                          | Main tasks                     |
| ---- | ----------------------------------------------------------------------------------- | ------------------------------ |
| US01 | Select development directories and retain scope/results after restart               | CW-002, CW-014                 |
| US02 | Expand repositories/children, locate usage and avoid duplicate metrics              | CW-003, CW-004                 |
| US03 | View directory counts, file counts and sizes across six ecosystems                  | CW-003, CW-005–CW-010          |
| US04 | View and manage shared caches independently                                         | CW-003–CW-010                  |
| US05 | Preview, then move to Trash or explicitly delete permanently                        | CW-011, CW-012                 |
| US06 | Protect important projects against bulk cleanup                                     | CW-011                         |
| US07 | Filter by ecosystem, artifact type and recent modification                          | CW-013                         |
| US08 | Monitor selected scopes after closing the window and handle drive disconnects       | CW-015, CW-016                 |
| US09 | View coalesced changes and previous metrics; identify stale/incomplete results      | CW-014, CW-023                 |
| US10 | Use a personal model service and control data/credentials                           | CW-017, CW-018                 |
| US11 | Receive evidence-based AI advice and control automatic-call cost                    | CW-019, CW-020                 |
| US12 | Learn about changes/advice through quiet, hideable Wisp                             | CW-021, CW-022                 |
| US13 | Keep the app running with bounded resource use                                      | CW-015, CW-021, CW-023, CW-024 |
| US14 | Install/use the open-source app in Chinese or English and manage locally without AI | CW-001, CW-025                 |

## 4. Scanning and rule design

### 4.1 Scope and authorization

Project scans start only from roots explicitly chosen by the user. Shared caches require separate enabled scopes. Normalize overlapping roots and assign unique backend artifact IDs. Preserve permission failures, deleted directories, offline drives and cancellation as states; unknown values are not zero.

Do not scan the entire disk by default, follow directory symlinks, cross into other mounted volumes automatically, execute project scripts or load arbitrary project code. Parse configuration statically with bounded reads. Custom paths must remain inside authorized scope. Include dedicated cases for worktree `.git` files, nested repositories and multilingual workspaces.

Changes during scanning can cause temporary inconsistencies: display calculating/updating/partial states and timestamps. Reconcile changed scope in the background before committing a consistent snapshot. Tasks are cancellable; cancellation affects the current scan without removing previous successful results.

### 4.2 Initial coverage matrix for six ecosystems

These are candidate rules awaiting validation, not claims that every directory is implemented or safe to clean. Every rule records version, evidence, exclusions, recovery cost and cleanup policy.

| Ecosystem   | Project-local candidates                                                                                       | Shared candidates                                                    | Exclusions / conservative treatment                                                                                                                     |
| ----------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JS/TS       | `node_modules` with `package.json` context; verified framework-generated `.next`, `.nuxt`, `.svelte-kit`, etc. | Verifiable npm cache, pnpm store and Yarn cache items                | Never delete by `dist`/`build` name alone; distinguish symlinks, hard links and global virtual-store references; no blind whole-store deletion          |
| Python      | `.venv`/`venv` with `pyvenv.cfg` and project evidence; `__pycache__`, pytest/mypy/ruff caches                  | Rebuildable pip download caches, etc.                                | Never delete by `env` name alone; do not uninstall Python/Conda installations; exclude directories containing user source                               |
| Go          | Only clearly identified project-tool output                                                                    | Verifiable GOCACHE/GOMODCACHE content                                | `vendor` may be versioned and is not assumed to be cache; treat private/local-only modules conservatively                                               |
| Java/Kotlin | Verified `target`/`build`/project `.gradle` in Maven/Gradle projects                                           | Verified rebuildable subsets of Gradle caches and Maven repositories | Locally installed Maven artifacts may be unique copies; measure only when recoverability is unproven; never delete entire repositories indiscriminately |
| Rust        | Cargo project/workspace `target`; statically configured target directories within authorized scope             | Verified Cargo download-cache content                                | Exclude rustup toolchains and Cargo program installation directories; treat modified registry source conservatively                                     |
| Swift/Xcode | `.build` with `Package.swift` context; DerivedData mapped to a project                                         | Explicitly classified tool caches                                    | Exclude `.xcarchive`, signing material, SDKs, simulator devices/user data; keep uncertain attribution in the shared view                                |

Detection priority: strong contextual evidence > tool-defined location > directory name. Git-tracked files or user source inside a candidate stop cleanup eligibility; retain read-only usage reporting. Shared repositories are not inherently safe to delete in full.

### 4.3 Project tree

Git repositories commonly serve as parents; language/workspace manifests define children. Manifests can identify projects without Git. Monorepo parent summaries use set union, not sums of parent and child sizes. Duplicate roots, shared files and identical artifacts are aggregated only once within the appropriate scope. Selecting a parent cannot bypass protection.

### 4.4 Metric definitions

Provide artifact-directory counts, file counts, logical size, disk-use estimates and reclaim estimates for selections separately. Explain symlink/hard-link counting. Distinguish path entries from deduplicated entities: UI defaults to explainable path-based file counts; disk aggregation deduplicates known physical identities.

Deduplicate known hard links by volume and file identity. Links outside the cleanup selection/scan scope mean the full allocated size cannot automatically be considered reclaimable. APFS clones, snapshots, compression and sparse files can prevent exact physical attribution. Do not claim directory traversal solves all shared-block accounting.

Moved to Trash, permanently deleted target size and volume free-space change are separate outcomes. Same-volume Trash moves do not immediately free equivalent space. Volume free-space changes cannot be attributed entirely to this app while other processes write.

References: [pnpm link structure](https://pnpm.io/symlinked-node-modules-structure), [Apple APFS](https://developer.apple.com/documentation/foundation/about-apple-file-system).

## 5. Cleanup flow

1. Users select projects or artifacts; nothing is automatically selected by default.
2. The backend previews scope, types, counts, logical size, reclaim estimate, mode, protections and uncertainties.
3. Users must explicitly remove project protection first. Shared caches use separate selection and confirmation.
4. At confirmation, recheck authorization, rule evidence, protection, file identity, links and snapshot freshness.
5. Use native Trash APIs by default, including supported external-volume behavior. Report failures without falling back to permanent deletion.
6. Permanent deletion requires separate explicit confirmation; Trash authorization cannot be reused.
7. Record each target as successful, skipped or failed, with local path mappings and timestamps. Retry failures without reprocessing successes.
8. Update affected scopes and project summaries. Monitoring coalesces expected operations with external changes to avoid duplicate AI notifications.

The backend accepts preview/artifact IDs only, never arbitrary paths or model-generated commands. Never empty the entire system Trash automatically. First-release recovery relies on native Trash, without promising a complete in-app undo system.

## 6. Monitoring, external drives and history

Users opt in per scope. Prefer native events; debounce/coalesce bulk installations and bound concurrency and scan I/O. First mark affected scopes stale, then recalculate related artifacts after stabilization. Do not traverse full roots for every raw event.

Lifecycle: open main window → close it while menu-bar monitoring continues → hide Wisp independently → explicit quit terminates monitoring/network tasks. Hiding Wisp releases its WebView. Release the closed main window or verify its invisible-process overhead, and restore state when reopened.

Offline drives show disconnected status and the last scan time; stop tasks for that volume. On reconnect, verify volume identity before local reconciliation. A different volume at the same mount path must not inherit old data or deletion previews.

Store aggregate snapshots and coalesced events. Proposed engineering defaults: 90 days of aggregate history and 30 days of detailed events, adjustable using storage benchmarks. Do not persist all raw events indefinitely. Separate recent source/project activity from recent artifact modification so dependency installation does not make an old project appear actively developed.

## 7. AI design

### 7.1 Connection and fallback

Users configure Base URL, API key and model. Use a Chat Completions-compatible interface and verify capabilities with a connection test; do not promise identical provider behavior. Keys are stored only in the OS credential store and read by the backend, not plaintext SQLite. Connection tests are explicit user requests; show what is sent and how calls are counted.

AI is optional. Missing keys, offline status, timeouts, rate limits and invalid responses must not block scanning, monitoring or manual cleanup. Remote cloud endpoints use HTTPS by default. Local HTTP requires explicit local-address configuration. Rust sends provider requests; WebViews never receive keys.

### 7.2 Candidate changes and anonymization

Local rules select changes worth analyzing before contacting a model: sustained growth, significant growth in one project, low space and long accumulation of eligible artifacts. Version thresholds/cooldowns as engineering configuration and calibrate them against real data; do not present unvalidated rules as proven AI anomaly detection.

Send only project aliases, ecosystem, artifact type, size, file count, change magnitude, aggregate time and completeness. Never send real project names, paths, filenames, source or dependency manifests. Alias mappings, cleanup targets and authorized scopes remain local. Privacy-test the entire serialized payload.

Model output contains linked event IDs, factual evidence, possible causes, advice categories and cautions. Causal claims not verified by metrics must be phrased as possibilities. Validate IDs, categories and text; never turn output into arbitrary HTML, paths or executable commands.

### 7.3 Call budget

Default: at most 20 automatic analyses per day; user-configurable; zero disables automatic calls. Count by the local calendar day, storing timezone/UTC information and testing date/timezone changes. Atomically reserve allowance before sending; automatic retries count toward the limit. Restarting must not reset the day's count.

Coalesce changes from different projects. Cool down repeated issues and deduplicate event fingerprints. At the limit, local notifications may continue; never silently upgrade to paid manual requests. Count manual preset follow-ups separately without implying they are free/unlimited. Show token usage only when returned by the service; missing usage is unknown and unknown pricing must not produce invented costs.

### 7.4 Advice interaction

Provide cards and preset follow-ups such as “Why did this grow?” and “What happens if I clean it?”. Card actions only open a local cleanup preview. No general chat agent, automatic deletion or general shell capability.

Protocol reference: [OpenAI Chat Completions](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create).

## 8. Wisp and information architecture

Main window: project overview, shared caches, changes/advice and settings. Project tables support sorting, search, ecosystem/artifact/modification filters and parent/child expansion. Details show rule evidence, snapshot time, metric definitions and cleanup impact. Zero results, missing permissions, disconnected and partial states need Chinese/English copy.

Wisp is simple 2D, draggable, hideable, with status indicators. Prefer quiet behavior: coalesce ordinary changes and bubble proactively for low disk space, sustained growth or accumulated thresholds. Cool down repeated issues and never steal focus. Clicking opens all changes/cards.

Use finite animation states, stop refreshing when idle, destroy hidden rendering resources and honor reduced motion. Validate transparent-window resources early. If over budget, reduce animation/windows/resident processes and, if necessary, replace the Wisp renderer while keeping main UI/core contracts stable.

## 9. Technical architecture

- `cachewisp-core`: rules, project detection, traversal policies, metrics, change/budget policies and domain types; no Tauri dependency.
- Rust desktop service: scheduling, SQLite, filesystem events, permissions, volumes, Trash/deletion, Keychain, AI HTTP and lifecycle.
- Tauri IPC: typed requests, backend IDs, error codes and progress events; capabilities restricted by window.
- React/TypeScript: system WebView, lists/filters, previews/confirmation, state and languages; avoid large chart/state/animation frameworks.
- SQLite: settings, root scopes, projects, artifact aggregates, snapshots, events, protection, cleanup batches, budgets and advice; migrate incrementally rather than precreating all empty tables.
- Wisp adapter: independent lifecycle and minimal read-only event permissions; no full project inventory or cleanup APIs.

Keep frontend types and Rust DTOs synchronized; use contract verification to prevent drift. Long scans, bulk database writes and network calls must not block the UI/main event loop. Bound locks, queues and database connections; batch progress instead of producing millions of IPC messages.

Framework references: [Tauri process model](https://v2.tauri.app/concept/process-model/), [window configuration](https://v2.tauri.app/reference/config/).

## 10. Acceptance and quality gates

Functionality: each ecosystem needs real-layout, lookalike-directory, versioned-file, permission-error and partial-failure cases. Verify project/shared-scope isolation, parent/child deduplication, cleanup revalidation, protection and Trash failures.

Performance: on fixed hardware and a fixed million-file fixture, record cold/warm scan duration, peak memory, CPU, cancellation latency, UI responsiveness and database growth. Full-scan time/peak budgets await measurement; idle budgets are not scan-peak promises.

Residency: release build, main window closed, monitoring enabled, Wisp visible, no scan; warm up and sample continuously for at least five minutes. Combine Rust and attributable WebView/helper memory/CPU. Record shared-memory accounting, device/OS, root/watch counts, sampling script and raw data. Target memory ≤150 MB and average idle CPU <1%.

Safety/reliability: destructive tests use temporary fixtures only. Regressions cover symlinks/hard links, replaced paths, drive reconnects, protected-child bypass, database restart, concurrent AI budgets and payload privacy.

Usability: Chinese/English, system-language behavior, keyboard navigation, focus restoration, reduced motion and full local flows without keys/offline. See [validation plan](../VALIDATION.en.md).

## 11. Engineering defaults and items awaiting measurement

Adjustable initialization defaults, not additional confirmed product promises: MIT license, macOS 13+ build baseline, Apple Silicon validated first, aggregate history 90 days and detailed events 30 days. Intel/minimum-OS hardware validation is part of release work.

Still to validate: UI wording when APFS shared blocks cannot be attributed precisely; safely reclaimable subsets of tool caches; Trash support on external filesystems; transparent-window overhead; signing/notarization credentials and public GitHub URL. Record failures and update ADRs with evidence; never silently weaken privacy or cleanup boundaries.

## 12. Definition of done

Every task delivers a demonstrable or verifiable complete path with commands, actual output and limitations. Call the first release complete only after the full scope and resource/deletion gates pass. Only CW-001 initialization is currently complete; remaining dependencies and acceptance criteria are in the [task index](../TASKS.en.md).
