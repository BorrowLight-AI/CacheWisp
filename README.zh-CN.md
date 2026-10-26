# CacheWisp · 轻灵

[English](README.md) | **简体中文**

Keep your dev space light. 让开发空间保持轻盈。

一款本地优先的开发空间管理工具。首发 macOS，以独立于平台的 Rust 核心为未来桌面平台保留复用能力。

**当前状态：工程基础已完成，尚不是完整的缓存清理工具。** 已初始化桌面外壳、SQLite 偏好设置、中英双语界面、类型化 IPC 以及测试和构建配置。扫描、清理、监控、AI 和桌面悬浮 Wisp 已列入任务计划，尚待实现。

## 开始使用

环境要求：Node.js ≥22.12、pnpm 10.28.2、Rust 1.93.0，以及 macOS 上的 Xcode Command Line Tools。仓库固定 Node/Rust 版本，并提交前端和 Rust 锁文件。

```sh
pnpm install --frozen-lockfile
pnpm tauri dev
```

仅预览网页界面：`pnpm dev`。桌面命令和 SQLite 设置需要通过 `pnpm tauri dev` 使用。

```sh
pnpm verify
pnpm tauri build --bundles app
```

应用包输出至 `target/release/bundle/macos/CacheWisp.app`。本地开发构建尚未进行 Developer ID 签名或公证；公开签名属于发布任务。

## 文档导航

仓库默认首页为[英文版 README](README.md)，本页提供中文介绍、启动说明和文档索引。两个版本描述相同的实现状态与首版范围，可通过页面顶部的语言链接切换。

| 文档               | English                                     | 简体中文                                       |
| ------------------ | ------------------------------------------- | ---------------------------------------------- |
| 详细产品与实施计划 | [English](docs/plan/PRODUCT-PLAN.en.md)     | [简体中文](docs/plan/PRODUCT-PLAN.md)          |
| 里程碑和实施顺序   | [English](docs/plan/ROADMAP.en.md)          | [简体中文](docs/plan/ROADMAP.md)               |
| 任务总表（25 项）  | [English](docs/TASKS.en.md)                 | [简体中文](docs/TASKS.md)                      |
| 领域术语           | [English](CONTEXT.md)                       | [简体中文](CONTEXT.zh-CN.md)                   |
| ADR-0001：架构     | [English](docs/adr/0001-architecture.en.md) | [简体中文](docs/adr/0001-architecture.md)      |
| ADR-0002：统计口径 | [English](docs/adr/0002-measurement.en.md)  | [简体中文](docs/adr/0002-measurement.md)       |
| ADR-0003：清理     | [English](docs/adr/0003-cleanup.en.md)      | [简体中文](docs/adr/0003-cleanup.md)           |
| ADR-0004：AI       | [English](docs/adr/0004-ai.en.md)           | [简体中文](docs/adr/0004-ai.md)                |
| ADR-0005：常驻     | [English](docs/adr/0005-residency.en.md)    | [简体中文](docs/adr/0005-residency.md)         |
| 验证与性能基准方案 | [English](docs/VALIDATION.en.md)            | [简体中文](docs/VALIDATION.md)                 |
| 初始化验证记录     | [English](docs/INITIALIZATION.en.md)        | [简体中文](docs/INITIALIZATION.md)             |
| 贡献指南           | [English](CONTRIBUTING.md)                  | [简体中文](CONTRIBUTING.zh-CN.md)              |
| 领域文档说明       | [English](docs/agents/domain.md)            | [简体中文](docs/agents/domain.zh-CN.md)        |
| 本地任务跟踪说明   | [English](docs/agents/issue-tracker.md)     | [简体中文](docs/agents/issue-tracker.zh-CN.md) |
| 分诊标签           | [English](docs/agents/triage-labels.md)     | [简体中文](docs/agents/triage-labels.zh-CN.md) |

以上文档均提供中英版本，并可通过顶部语言入口互相跳转。详细任务文件（`.scratch/cachewisp/issues`）目前以中文为主，任务索引提供双语导航。产品计划与已接受的架构决策仍是权威依据；翻译如有歧义，以记录原始决策的文档为准。修改文档时同步维护对应语言版本。

## 首版计划范围

- 基于上下文的规则，支持 JavaScript/TypeScript、Python、Go、Java/Kotlin、Rust、Swift/Xcode。
- 项目层级展示，以及独立管理的全局共享缓存。
- 目录数、文件数、逻辑大小、磁盘占用估算，以及明确标注为估算的预计释放空间。
- 手动清理：默认移至系统废纸篓，可选永久删除，并支持用户保护项目。
- 可选目录监控、菜单栏常驻、外置盘重连处理。
- 使用可配置的 Chat Completions 兼容服务和用户自有密钥，提供基于脱敏数据的 AI 建议。
- 安静、可选的桌面 Wisp；自动 AI 分析默认每天最多 20 次，可调整。
- 中英双语、本地持久化，核心功能无需账号。

常驻验收目标：主窗口关闭、Wisp 显示、监控开启且无扫描任务时，相关进程合计内存 ≤150 MB、平均空闲 CPU <1%。这些是发布目标，并非当前工程基础已测得的结果。

## 仓库结构

```text
src/                       React / TypeScript 界面与 IPC 客户端
src-tauri/                 桌面集成、IPC、SQLite 和系统适配器
crates/cachewisp-core/     独立于框架的领域核心与后续扫描策略
docs/plan/                 权威产品计划与路线图
docs/adr/                  已接受的架构决策
.scratch/cachewisp/issues/ 本地实施任务及执行记录
```

MIT 许可证。版权所有：CacheWisp 贡献者。
