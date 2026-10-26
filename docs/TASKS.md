# CacheWisp 任务总表

[English](TASKS.en.md) | **简体中文**

25 个可验收的纵向任务，来源于 [详细计划](plan/PRODUCT-PLAN.md) 与 [路线图](plan/ROADMAP.md)。本地任务文件是执行记录，提交到 Git；后续可保留 CW 编号同步到 GitHub Issues。

P0 是基础/可靠性/发布门禁，P1 是在基础后集成的 AI/Wisp 能力；两者都属于已确认首版范围。AFK 可按已定方案实现；HITL 需要维护者提供最终发布凭证或执行对外发布。

| ID                                                             | 任务                                 | 优先级 | 类型 | 阻塞依赖                                                                                       | 执行状态 |
| -------------------------------------------------------------- | ------------------------------------ | ------ | ---- | ---------------------------------------------------------------------------------------------- | -------- |
| [CW-001](../.scratch/cachewisp/issues/01-foundation.md)        | 工程初始化与可运行基础链路           | P0     | AFK  | 无                                                                                             | 已完成   |
| [CW-002](../.scratch/cachewisp/issues/02-scan-roots.md)        | 选择、保存与授权扫描根目录           | P0     | AFK  | CW-001                                                                                         | 可开始   |
| [CW-003](../.scratch/cachewisp/issues/03-javascript-scan.md)   | 首条 JS/TS 项目与共享缓存扫描链路    | P0     | AFK  | CW-002                                                                                         | 等待依赖 |
| [CW-004](../.scratch/cachewisp/issues/04-project-hierarchy.md) | 项目层级与全局共享缓存视图           | P0     | AFK  | CW-003                                                                                         | 等待依赖 |
| [CW-005](../.scratch/cachewisp/issues/05-python-rules.md)      | Python 产物与共享缓存完整支持        | P0     | AFK  | CW-004                                                                                         | 等待依赖 |
| [CW-006](../.scratch/cachewisp/issues/06-go-rules.md)          | Go 缓存识别与共享范围管理            | P0     | AFK  | CW-004                                                                                         | 等待依赖 |
| [CW-007](../.scratch/cachewisp/issues/07-jvm-rules.md)         | Java/Kotlin 与 Maven/Gradle 保守规则 | P0     | AFK  | CW-004                                                                                         | 等待依赖 |
| [CW-008](../.scratch/cachewisp/issues/08-rust-rules.md)        | Rust 项目与共享下载缓存支持          | P0     | AFK  | CW-004                                                                                         | 等待依赖 |
| [CW-009](../.scratch/cachewisp/issues/09-swift-xcode-rules.md) | Swift/Xcode 产物与项目映射           | P0     | AFK  | CW-004                                                                                         | 等待依赖 |
| [CW-010](../.scratch/cachewisp/issues/10-measurement.md)       | 可信磁盘统计与选择级释放估算         | P0     | AFK  | CW-003, CW-004                                                                                 | 等待依赖 |
| [CW-011](../.scratch/cachewisp/issues/11-trash-cleanup.md)     | 清理预览、手动保护与系统废纸篓       | P0     | AFK  | CW-004, CW-010                                                                                 | 等待依赖 |
| [CW-012](../.scratch/cachewisp/issues/12-permanent-cleanup.md) | 独立确认的永久删除闭环               | P0     | AFK  | CW-011                                                                                         | 等待依赖 |
| [CW-013](../.scratch/cachewisp/issues/13-activity-filters.md)  | 最近修改、搜索与组合筛选             | P0     | AFK  | CW-004                                                                                         | 等待依赖 |
| [CW-014](../.scratch/cachewisp/issues/14-snapshots.md)         | 持久快照、变化列表与离线卷状态       | P0     | AFK  | CW-004, CW-010                                                                                 | 等待依赖 |
| [CW-015](../.scratch/cachewisp/issues/15-monitoring.md)        | 可选目录监控与有界增量核对           | P0     | AFK  | CW-014                                                                                         | 等待依赖 |
| [CW-016](../.scratch/cachewisp/issues/16-tray-lifecycle.md)    | 菜单栏常驻与外置盘重连生命周期       | P0     | AFK  | CW-015                                                                                         | 等待依赖 |
| [CW-017](../.scratch/cachewisp/issues/17-ai-connection.md)     | 自配 AI 服务、系统凭证与连接测试     | P1     | AFK  | CW-001                                                                                         | 可开始   |
| [CW-018](../.scratch/cachewisp/issues/18-ai-anonymization.md)  | 重要变化候选与严格脱敏数据通路       | P1     | AFK  | CW-014, CW-017                                                                                 | 等待依赖 |
| [CW-019](../.scratch/cachewisp/issues/19-ai-budget.md)         | 自动调用预算与用量设置闭环           | P1     | AFK  | CW-017, CW-018                                                                                 | 等待依赖 |
| [CW-020](../.scratch/cachewisp/issues/20-ai-advice.md)         | AI 建议卡片与预设追问                | P1     | AFK  | CW-018, CW-019                                                                                 | 等待依赖 |
| [CW-021](../.scratch/cachewisp/issues/21-wisp-renderer.md)     | 轻量 Wisp 独立窗口与资源验证         | P1     | AFK  | CW-001                                                                                         | 可开始   |
| [CW-022](../.scratch/cachewisp/issues/22-wisp-advice.md)       | Wisp 集成监控状态与安静提醒          | P1     | AFK  | CW-016, CW-020, CW-021                                                                         | 等待依赖 |
| [CW-023](../.scratch/cachewisp/issues/23-history-retention.md) | 历史保留、存储有界与长时间稳定性     | P0     | AFK  | CW-014, CW-015                                                                                 | 等待依赖 |
| [CW-024](../.scratch/cachewisp/issues/24-benchmarks.md)        | 百万文件与完整常驻资源验收           | P0     | AFK  | CW-005, CW-006, CW-007, CW-008, CW-009, CW-011, CW-012, CW-013, CW-016, CW-021, CW-022, CW-023 | 等待依赖 |
| [CW-025](../.scratch/cachewisp/issues/25-release.md)           | 全范围发布验收与 macOS 安装包        | P0     | HITL | CW-005, CW-006, CW-007, CW-008, CW-009, CW-012, CW-013, CW-020, CW-024                         | 等待依赖 |

## 如何开始下一项

1. 先读领域术语与相关 ADR，检查全部依赖是否 done。
2. 把 Execution 改成 in-progress；完成完整路径，逐条核验验收标准。
3. 执行任务规定的验证及基础检查，记录证据和限制。
4. 将任务标为 Status: done、Execution: done，更新本表；不要仅凭编译通过勾选未实现能力。

## 当前范围

CW-001 是此次初始化交付。CW-002 起为后续实施任务；扫描、清理、监控、AI 和悬浮精灵尚待这些任务完成。

## 文档维护

- [x] 英文默认首页与中文首页双向跳转，中英文贡献指南、产品计划、路线图、任务索引、领域文档、验证记录及 5 份 ADR；中文入口：[README.zh-CN.md](../README.zh-CN.md)。所有语言版本纳入本地链接检查；详细任务记录目前仍以中文为主。验证证据见 CW-001 的文档维护记录。
