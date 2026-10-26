# CacheWisp engineering instructions

Read CONTEXT.md, docs/plan/PRODUCT-PLAN.md and the relevant ADR before implementing a feature. The conversation decisions recorded in the plan are authoritative product scope.

## Working rules

- Deliver the selected task as a complete vertical slice. Inspect dependencies in docs/TASKS.md before starting. Update its checklist and evidence when done.
- Separate implemented behavior from planned behavior. Never populate the application with invented scan results or claim benchmarks have passed without measurement.
- Keep filesystem policies in cachewisp-core and native integration in src-tauri. The core must not import Tauri or WebView APIs.
- The UI receives typed results through IPC. Avoid browser-side filesystem access, shell command strings, broad permissions and runtime dependency growth.
- User-selected roots and known shared-cache scopes are the only scan boundaries. Do not follow directory symlinks or execute project scripts to discover configuration.
- Cleanup takes backend-owned artifact IDs and a fresh preview, never arbitrary UI/AI-provided paths. Recheck authorization, protection and target identity before each mutation.
- Default cleanup is native Trash. Never fall back to permanent deletion if Trash fails. Do not empty the user's entire Trash.
- Test destructive behavior only in explicitly created disposable fixtures. Never test deletion against the user's real development caches.
- Project protection applies to project-local artifacts, not indirectly to global shared stores. Explain the distinction in previews.
- API keys belong in the OS credential store and backend only. Never put keys, raw project names/paths, source contents or filenames into AI payloads or logs sent off-device.
- AI offers explanations and suggestions. No AI-triggered cleanup or arbitrary tool/shell execution. Treat model output as untrusted data.
- Honor bilingual UI, keyboard accessibility, reduced motion and operating-system WebView differences. Prefer native HTML and system fonts.
- Stop animation when idle; destroy the hidden Wisp WebView; open the main window and AI network client on demand. Benchmark related processes together.
- Do not scan or create a million-file fixture in this repository. Benchmark fixtures go into an explicit temporary directory with a manifest and cleanup command.

## Commands

```sh
pnpm tauri dev
pnpm verify
pnpm tauri build --bundles app
cargo test -p cachewisp-core
```

Rust 1.93.0, pnpm 10.28.2; keep Cargo.lock and pnpm-lock.yaml committed. Browser policy: macOS 13+ system WKWebView is the initial engineering baseline. Feature-detect newer Web APIs and use a small fallback or redesign; do not add large polyfills. Only macOS is a first-release platform.

## Agent skills

### Issue tracker

Local Markdown tasks in .scratch/cachewisp/issues; the main index is docs/TASKS.md. See docs/agents/issue-tracker.md.

### Triage labels

Canonical role names with separate execution/dependency state. See docs/agents/triage-labels.md.

### Domain docs

Single-context repository: CONTEXT.md and docs/adr/. See docs/agents/domain.md.
