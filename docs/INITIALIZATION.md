# 初始化验证记录

日期：2026-10-26。范围：CW-001 工程初始化。

## 环境

- macOS 15.2，Apple M4，16 GiB 内存，Apple Silicon 原生构建。
- Node.js 22.22.0，pnpm 10.28.2，Rust/Cargo 1.93.0，Xcode 工具链。
- 已锁定前端和 Rust 依赖；Tauri CLI 2.12.4 / Rust tauri 2.12.5。

## 已交付

- Rust workspace、独立 cachewisp-core、Tauri 2 与 React/TypeScript。
- SQLite schema v1，双语及自动 AI 分析上限设置的本地持久化。
- 详细产品计划、路线图、领域术语、5 项 ADR、25 个本地任务和依赖验证。
- 格式、文档链接、任务依赖、类型、Rust 测试/Clippy、前端及原生 app 构建命令，macOS CI 配置。
- 自有 SVG 标记与平台图标；无外部字体、图表/动画/Agent 运行时依赖。

## 验证结果

| 检查           | 结果                                                               |
| -------------- | ------------------------------------------------------------------ |
| 冻结锁文件安装 | pnpm install --frozen-lockfile                                     |
| 完整基础检查   | pnpm verify                                                        |
| 文档和依赖     | 43 个 Markdown 文档本地链接有效，25 项任务依赖无环                 |
| Rust 测试      | 6 项通过：3 项设置输入契约，3 项 SQLite 持久化/损坏/新 schema 处理 |
| Rust 静态检查  | cargo fmt 与 Clippy（warnings as errors）通过                      |
| 前端           | TypeScript 检查与 Vite 生产构建通过                                |
| 原生构建       | pnpm tauri build --bundles app 成功，CacheWisp.app 约 5.03 MiB     |
| 原生启动       | 实际打开应用，界面显示 SQLite 已就绪、schema v1                    |
| 设置与双语     | UI 将每日上限改为 7、切为英文并保存；只读核查 SQLite 为 en/7       |
| 重启恢复       | 退出并重新打开，英文总览与上限 7 正确恢复                          |
| 恢复默认值     | 通过 UI 恢复跟随系统和每日 20，并确认总览显示中文及 20             |

## 产物

原生本地构建：target/release/bundle/macos/CacheWisp.app。
本地数据：系统应用数据目录下 app.cachewisp.desktop/cachewisp.sqlite3；仅包含本应用设置，不含 API Key。

尚未做 Developer ID 签名/公证或公开发布。CI 已配置，远端实际运行需建立仓库后验证。

## 验证边界

扫描、清理、监控、AI 请求及桌面悬浮 Wisp 属于 CW-002 之后的任务。本次只完成工程基础，不将它们标为已实现。

5.03 MiB 是初始化 app 包体，不代表完整首版最终体积。≤150 MB / <1% 是完整常驻场景的发布验收目标，当前未通过 CW-024 基准验证。未宣称 Intel 或最低 macOS 版本已完成实机验收。
