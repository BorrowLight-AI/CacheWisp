# Validation and performance benchmarks

**English** | [简体中文](VALIDATION.md)

## Foundation commands

```sh
pnpm verify
pnpm tauri build --bundles app
```

`verify` includes formatting, documentation links/dependencies, TypeScript, frontend production build, Rust tests and Clippy. Separately smoke-test native startup, saving settings and restoring them after restart. Record results in [INITIALIZATION.en.md](INITIALIZATION.en.md).

## Functional acceptance matrix

| Area                    | Required cases                                                                                                                                                             |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scope                   | Overlapping/nested roots, directory symlinks, a root that is itself a symlink, worktrees, missing permissions, deleted roots                                               |
| Rules                   | Normal layouts for each ecosystem, ordinary directories with matching names, missing manifests, Git-tracked files, embedded user source, static custom paths outside scope |
| Metrics                 | Many small files, empty directories, hard links across projects/outside scope, sparse files, APFS clones, cancellation and changes during scanning                         |
| Hierarchy               | Monorepos, multiple languages, nested repositories, shared artifacts; parent selection cannot bypass protected children                                                    |
| Cleanup                 | Target replacement/change after preview, normalized selections, Trash failure, permanent-delete confirmation, partial success, repeated retry, quit interruption           |
| External drives         | Disconnect/reconnect, different volume at the same mount path, read-only volumes, volumes without Trash support, invalidated old previews                                  |
| Monitoring              | Installation storms, coalescing, sleep/wake, reopening the main window, hiding Wisp, no residual work after explicit quit                                                  |
| AI                      | No key, connection failure, rate limits, malformed output, invented IDs/paths, HTML injection, privacy canaries, cancellation/quit                                         |
| Budget                  | Concurrent reservations, retries, same-day restart, date/timezone changes, zero allowance, changed limit, independent manual counters                                      |
| Languages/accessibility | System language, persisted language switch, keyboard/focus, native dialogs, light/dark appearance, reduced motion                                                          |

## Deletion test discipline

Only operate on temporary directories explicitly created by the test. Each fixture has a separate parent directory and manifest; assert that mutations stay within it. Never target real user projects or shared development caches in automated tests. Trash tests must identify their own moved targets and must not empty the system Trash.

## Million-file benchmark (planned in CW-024)

The generator must accept an explicit temporary output directory, seed, project/file counts, ecosystem layouts, hard-link ratio and manifest. Verify the root before operating; never generate inside this repository or `node_modules`.

Suggested datasets: 100/300 projects and 100k/1m files, mostly small files, including hard links, sparse files and overlapping roots. Record logical size and physical file distribution to compare identical fixtures. Sparse logical length must not be reported as occupied physical space to manufacture a large dataset.

Each report includes commit, build profile, CPU/memory, macOS/filesystem, storage medium, dataset parameters, cold/warm scan duration, peak memory, CPU, cancellation latency, UI response, SQLite/index size, errors and incomplete scopes. Set a full-scan speed threshold only after fixing the test conditions.

## Residency budget gate

- Use a release build, with the main window closed, Wisp visible, monitoring enabled, and no scan or pending change.
- Record root/watch counts, history volume and network/AI state. Warm up, then sample for at least five minutes.
- Combine the core and attributable WebView/helper processes. Explain RSS/physical-footprint and shared-page deduplication; do not report only the main PID. Normalize CPU so one logical core equals 100%.
- Target: combined related-process memory ≤150 MB; average idle CPU <1%. Also report peaks and sample distributions, rather than selecting the best instant.
- Additionally test hidden Wisp, window reopening, sustained file changes and settling after AI requests. Hiding must release the corresponding UI resources.
- Explain attribution limits for global shared GPU/helper processes. Disclose overhead that cannot be attributed accurately.

## CI and release

CI runs frozen-lockfile installation, formatting/types/build and Rust unit/integration checks. Validate native WebView lifecycle and hardware performance on real macOS hardware; successful CI compilation does not prove resource budgets. Signing, notarization, Intel and minimum-OS validation belong to CW-025.
