# CW-007 Java/Kotlin 与 Maven/Gradle 保守规则

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US03, US04

## What to build

识别 JVM 项目构建产物，独立展示依赖仓库，保护本地唯一安装产物。

- 上下文识别 pom.xml、Gradle 项目、target/build 与项目 .gradle。
- 解析有界静态配置；不执行 Gradle/Maven 项目脚本。
- 共享仓库按可恢复证据细分，记录本地安装/无法确认内容的只读原因。

## Acceptance criteria

- [ ] 仅有 build/target 目录名不具备删除资格。
- [ ] 本地安装或无法验证来源的 Maven 产物不进入清理集合。
- [ ] 不支持的自定义脚本配置显示未确认，不能猜路径。
- [ ] 项目与共享视图、规则依据和双语错误完整。

## Blocked by

- [CW-004](./04-project-hierarchy.md)

## Verification

- 多模块 Maven、Gradle/Kotlin DSL 默认布局、混入源码和本地安装仓库 fixture。
- 网络断开和不运行构建工具条件下执行扫描验证。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
