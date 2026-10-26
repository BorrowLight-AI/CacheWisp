# CacheWisp · 轻灵

**English** | [简体中文](README.zh-CN.md)

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

This English README is the default repository homepage. Use [简体中文](README.zh-CN.md) for the Chinese introduction, setup instructions and documentation index. Both versions describe the same implementation status and release scope.

| Document                              | English                                     | 简体中文                                       |
| ------------------------------------- | ------------------------------------------- | ---------------------------------------------- |
| Product and implementation plan       | [English](docs/plan/PRODUCT-PLAN.en.md)     | [简体中文](docs/plan/PRODUCT-PLAN.md)          |
| Milestones and implementation order   | [English](docs/plan/ROADMAP.en.md)          | [简体中文](docs/plan/ROADMAP.md)               |
| Task index (25 tasks)                 | [English](docs/TASKS.en.md)                 | [简体中文](docs/TASKS.md)                      |
| Domain vocabulary                     | [English](CONTEXT.md)                       | [简体中文](CONTEXT.zh-CN.md)                   |
| ADR-0001: Architecture                | [English](docs/adr/0001-architecture.en.md) | [简体中文](docs/adr/0001-architecture.md)      |
| ADR-0002: Measurements                | [English](docs/adr/0002-measurement.en.md)  | [简体中文](docs/adr/0002-measurement.md)       |
| ADR-0003: Cleanup                     | [English](docs/adr/0003-cleanup.en.md)      | [简体中文](docs/adr/0003-cleanup.md)           |
| ADR-0004: AI                          | [English](docs/adr/0004-ai.en.md)           | [简体中文](docs/adr/0004-ai.md)                |
| ADR-0005: Residency                   | [English](docs/adr/0005-residency.en.md)    | [简体中文](docs/adr/0005-residency.md)         |
| Validation and performance benchmarks | [English](docs/VALIDATION.en.md)            | [简体中文](docs/VALIDATION.md)                 |
| Foundation validation record          | [English](docs/INITIALIZATION.en.md)        | [简体中文](docs/INITIALIZATION.md)             |
| Contributing guide                    | [English](CONTRIBUTING.md)                  | [简体中文](CONTRIBUTING.zh-CN.md)              |
| Domain documentation guide            | [English](docs/agents/domain.md)            | [简体中文](docs/agents/domain.zh-CN.md)        |
| Local issue tracker guide             | [English](docs/agents/issue-tracker.md)     | [简体中文](docs/agents/issue-tracker.zh-CN.md) |
| Triage labels                         | [English](docs/agents/triage-labels.md)     | [简体中文](docs/agents/triage-labels.zh-CN.md) |

The documents above are available in both languages, with language links at the top of each page. Detailed task records (`.scratch/cachewisp/issues`) currently remain primarily Chinese; the task index provides bilingual navigation. The product plan and accepted ADRs remain authoritative; if a translation is ambiguous, refer to the document recording the original decision. Keep language counterparts in sync when updating documents.

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
