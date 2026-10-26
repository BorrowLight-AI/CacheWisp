# CacheWisp · 轻灵

Keep your dev space light.

A local-first developer disk-space companion. macOS first, with a platform-independent Rust core for future desktop platforms.

**Current state: project foundation, not a completed cache cleaner.** The desktop shell, SQLite preferences, bilingual interface, typed IPC and test/build configuration are initialized. Scanning, cleanup, monitoring, AI and the floating Wisp are specified in the task backlog.

## Start

Prerequisites: Node.js ≥22.12, pnpm 10.28.2, Rust 1.93.0, and Xcode Command Line Tools on macOS. The repository pins Node/Rust versions and commits both lockfiles.

```sh
pnpm install --frozen-lockfile
pnpm tauri dev
```

Web-only preview: pnpm dev. Desktop commands and SQLite settings require pnpm tauri dev.

```sh
pnpm verify
pnpm tauri build --bundles app
```

An application bundle is produced at target/release/bundle/macos/CacheWisp.app. Local development builds have not been Developer ID signed or notarized; public signing is a release task.

## Documents

- [详细产品与实施计划](docs/plan/PRODUCT-PLAN.md)
- [里程碑和实施顺序](docs/plan/ROADMAP.md)
- [任务总表（25 项）](docs/TASKS.md)
- [领域术语](CONTEXT.md)
- [架构决策](docs/adr/0001-architecture.md)
- [验证与性能基准方案](docs/VALIDATION.md)
- [初始化验证记录](docs/INITIALIZATION.md)
- [贡献指南](CONTRIBUTING.md)

## First-release scope

- Context-aware rules for JavaScript/TypeScript, Python, Go, Java/Kotlin, Rust, Swift/Xcode.
- Project hierarchy and separately managed shared caches.
- Directory counts, file counts, logical sizes, disk-use estimates and explicitly estimated reclaimable space.
- Manual cleanup: Trash by default, optional permanent deletion, user-protected projects.
- Optional directory monitoring, menu-bar residency, external-drive reconnect handling.
- Anonymized AI advice via a configurable Chat Completions-compatible endpoint and user-owned key.
- Quiet, optional desktop Wisp; automatic AI allowance defaults to 20/day and is configurable.
- Chinese/English, local persistence, no account required for core functionality.

Resident acceptance target: related-process memory ≤150 MB and average idle CPU <1%, with the main window closed, Wisp visible, monitoring enabled and no scan running. These are release targets, not measured results of this foundation.

## Structure

```text
src/                       React / TypeScript interface and IPC client
src-tauri/                 Desktop integration, IPC, SQLite and OS adapters
crates/cachewisp-core/     Framework-independent domain and future scan policies
docs/plan/                 Authoritative plan and roadmap
docs/adr/                  Accepted architecture decisions
.scratch/cachewisp/issues/ Tracked local implementation tasks
```

MIT License. Copyright CacheWisp contributors.
