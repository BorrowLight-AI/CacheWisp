# ADR-0001: Tauri 2, independent Rust core and local SQLite

**English** | [简体中文](0001-architecture.md)

Status: Accepted. Date: 2026-10-26.

## Context

macOS ships first, supporting millions of files, menu-bar residency and an optional Wisp. Other desktop platforms may follow. The user accepted Tauri/Rust/React/SQLite, with resident resource use taking priority.

## Decision

Use a Cargo workspace. `cachewisp-core` contains only domain types, rules and policies; `src-tauri` adapts operating systems, SQLite, credentials and networking; React/TypeScript displays state through IPC. Introduce SQLite migrations incrementally. The frontend uses the system WebView, system fonts and resources loaded on demand.

Only essential runtime dependencies are introduced during initialization. Do not install chart, agent, animation or large state libraries for unimplemented features. Credentials and networking stay in the backend.

## Consequences and boundaries

Rust and TypeScript require maintaining two language layers; DTO changes must update the contract on both sides. System WebViews differ, so macOS is the first validation platform. macOS 13+, MIT licensing and Apple Silicon first are current engineering defaults and can be revised before release based on evidence.
