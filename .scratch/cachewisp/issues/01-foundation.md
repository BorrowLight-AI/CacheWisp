# CW-001 工程初始化与可运行基础链路

Status: done
Type: AFK
Priority: P0
Execution: done
User stories: US14

## What to build

从安装依赖到原生窗口启动，读取 SQLite 设置并从双语设置页保存后重启恢复。

- 建立 Cargo workspace、独立 core、Tauri IPC、React/TS 与 SQLite schema v1。
- 设置包含跟随系统/中文/英文和默认 20 的自动分析上限；0 表示停用。
- 固定工具链、锁文件、基础图标、CSP、格式/类型/测试/构建命令与 CI。
- 产品计划、ADR、领域术语和本地任务可被下一位开发者直接接手。

## Acceptance criteria

- [x] 前端类型检查与生产构建成功。
- [x] 默认设置、重启持久化、损坏数据及新 schema 拒绝路径测试成功。
- [x] Rust fmt、测试、Clippy 和原生 app 构建成功。
- [x] 原生窗口实际打开，双语切换与保存/重启读取有记录；不伪装扫描功能已完成。

## Blocked by

None — can start immediately.

## Verification

- pnpm verify；pnpm tauri build --bundles app。
- 记录原生 smoke 过程与实际命令结果到 docs/INITIALIZATION.md。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

2026-10-26：原生应用启动与设置重启恢复已验证；检查和构建记录见 [INITIALIZATION.md](../../../docs/INITIALIZATION.md)。

### 文档双语维护（2026-10-26）

- [x] 保留 `README.md` 为英文默认首页，新增 [中文首页](../../../README.zh-CN.md)，双向语言跳转。
- [x] 共 16 组中英文文档：README、贡献指南、领域上下文、产品计划、路线图、任务索引、验证方案、初始化记录、5 份 ADR 和 3 份工程协作说明。详细任务记录仍以中文为主，导航如实标注。
- [x] 中英文版本保持已实现/待实现及资源目标的边界；原始产品决策与已接受 ADR 仍为权威依据。
- [x] `pnpm verify` 通过：格式、59 份 Markdown 本地链接、25 项任务依赖无环、TypeScript、Vite 构建、6 项 Rust 测试、Rust fmt 与 Clippy。
- [x] `git diff --check` 通过。本次只修改文档及文档检查范围，未重复原生启动或资源基准验证。
