# ADR-0003: Backend allowlisted cleanup and Trash by default

**English** | [简体中文](0003-cleanup.md)

Status: Accepted. Date: 2026-10-26.

Only artifacts confirmed by built-in rules are eligible for cleanup. Content with an unknown purpose, tracked by Git or containing unique data is measured only. Generate a preview after user selection, then revalidate root authorization, protection, identity, links and scope at confirmation. The backend accepts artifact/preview IDs, never arbitrary paths.

Use native Trash by default; failure must not fall back to permanent deletion. Permanent deletion needs separate confirmation. Normalize parent/child targets and prevent bypassing protected child projects. Manage shared caches independently; project protection does not implicitly cover them.

Record per-target outcomes and local history. Tests use disposable temporary fixtures only, never empty the entire system Trash and never run deletion regressions against real development projects. AI has no cleanup permission.
