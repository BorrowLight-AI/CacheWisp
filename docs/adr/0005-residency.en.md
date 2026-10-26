# ADR-0005: Resident resource use first and windows loaded on demand

**English** | [简体中文](0005-residency.md)

Status: Accepted. Date: 2026-10-26.

Menu-bar monitoring continues after the main window closes; explicit quit stops background work. Wisp can be dragged and hidden. Hiding it must not stop monitoring enabled by the user.

Stop refreshing Wisp when idle and release its rendering resources when hidden. Load the main window and AI client on demand. Monitoring uses native events, coalescing and bounded local reconciliation, avoiding frequent full scans and per-file IPC.

Resource acceptance scenario: main window closed, Wisp visible, monitoring enabled, no scan running. Combined related-process memory must be ≤150 MB, with average idle CPU <1%. Measure on fixed hardware and retain raw results. If over budget, simplify animation, window/state handling and the rendering adapter first. Never fabricate metrics.
