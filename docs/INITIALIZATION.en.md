# Foundation validation record

**English** | [简体中文](INITIALIZATION.md)

Date: 2026-10-26. Scope: CW-001 foundation.

## Environment

- macOS 15.2, Apple M4, 16 GiB memory, native Apple Silicon build.
- Node.js 22.22.0, pnpm 10.28.2, Rust/Cargo 1.93.0, Xcode toolchain.
- Locked frontend and Rust dependencies; Tauri CLI 2.12.4 / Rust tauri 2.12.5.

## Delivered

- Rust workspace, independent `cachewisp-core`, Tauri 2 and React/TypeScript.
- SQLite schema v1 with persisted language and automatic AI analysis limit preferences.
- Detailed product plan, roadmap, domain vocabulary, five ADRs and 25 local tasks with dependency validation.
- Formatting, document links, task dependencies, types, Rust tests/Clippy, frontend/native app build commands and macOS CI configuration.
- Original SVG mark and platform icons; no external fonts or chart/animation/agent runtime dependencies.

## Validation results

These are the recorded CW-001 results, not claims of a fresh native run for subsequent documentation changes.

| Check                  | Result                                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| Frozen installation    | `pnpm install --frozen-lockfile`                                                                         |
| Full foundation checks | `pnpm verify`                                                                                            |
| Documents/dependencies | Local links in 43 Markdown documents valid; 25-task dependency graph acyclic at initialization           |
| Rust tests             | Six passed: three settings-input contract tests and three SQLite persistence/corruption/new-schema tests |
| Rust static checks     | cargo fmt and Clippy with warnings as errors passed                                                      |
| Frontend               | TypeScript check and Vite production build passed                                                        |
| Native build           | `pnpm tauri build --bundles app` succeeded; CacheWisp.app approximately 5.03 MiB                         |
| Native startup         | App actually opened and displayed SQLite ready, schema v1                                                |
| Settings/languages     | Changed daily limit to 7 and language to English through UI; read-only SQLite inspection confirmed en/7  |
| Restart restoration    | Quit and reopened; English overview and limit 7 restored                                                 |
| Restore defaults       | Restored system language and daily limit 20 through UI; confirmed Chinese overview and 20                |

## Outputs

Native local build: `target/release/bundle/macos/CacheWisp.app`.
Local data: `app.cachewisp.desktop/cachewisp.sqlite3` under the system application-data directory; contains only this app's settings, no API key.

No Developer ID signing/notarization or public release has occurred. CI is configured; actual remote execution requires establishing the repository.

## Validation boundaries

Scanning, cleanup, monitoring, AI requests and floating Wisp belong to CW-002 and later tasks. This delivery completed the foundation only.

5.03 MiB is the foundation app size, not the final first-release size. ≤150 MB / <1% are full-residency release targets, not passed CW-024 benchmarks. Intel and minimum-macOS validation on real hardware are not claimed.
