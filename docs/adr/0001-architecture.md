# ADR-0001：Tauri 2、独立 Rust 核心与本地 SQLite

状态：接受。日期：2026-10-26。

## 背景

macOS 首发，百万级文件，菜单栏常驻与可选小精灵，后续跨平台。用户明确接受 Tauri/Rust/React/SQLite，且常驻开销优先。

## 决策

使用 Cargo workspace。cachewisp-core 保留纯领域类型、规则和策略；src-tauri 适配操作系统、SQLite、凭证库和网络；React/TypeScript 通过 IPC 展示状态。SQLite 分阶段迁移。前端使用系统 WebView、系统字体和按需资源。

初始化仅引入必需运行时依赖。不为尚未实现的能力安装图表、Agent、动画或大型状态库。凭证与网络留在后端。

## 结果与边界

存在 Rust/TypeScript 双语言维护成本；DTO 变更需要同步契约。不同系统 WebView 存在差异，首版以 macOS 验证。当前工程 macOS 13+、MIT、Apple Silicon 首先验证是工程默认值，可在发布前按实际结果调整。
