# Contributing to CacheWisp

Start with CONTEXT.md and the task index at docs/TASKS.md. Choose an unblocked task and read its acceptance criteria and relevant ADR.

Run pnpm install --frozen-lockfile, then pnpm tauri dev. Before completing a change run pnpm verify. Native lifecycle, credential, filesystem and performance changes require the relevant checks in docs/VALIDATION.md.

Use temporary fixtures for filesystem tests. Never include API keys, private paths or source contents in reports or AI payloads. Explain the observable behavior, validation and actual limitations in each contribution.

Keep changes as complete, narrow user-facing slices and update the task's evidence when done. The UI is Chinese/English; add both translations for every visible string. Heavy runtime dependencies need a concrete requirement and resource evidence.
