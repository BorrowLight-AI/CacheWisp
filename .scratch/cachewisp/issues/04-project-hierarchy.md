# CW-004 项目层级与全局共享缓存视图

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US02, US04

## What to build

将扫描结果组织为仓库/工作区父子树，用户可展开子项目，并切换独立共享缓存视图。

- 支持 Git 仓库、worktree、无 Git manifest 项目、嵌套仓库与 workspace。
- 统一产物归属和父级集合汇总，提供项目、类型和 scope 的选择。
- 项目/全局视图切换、空状态、扫描时间和部分状态完整。

## Acceptance criteria

- [ ] 父子、重复根、共享产物在汇总中不重复加总。
- [ ] 同一仓库多子项目可展开和单独选中。
- [ ] 全局共享产物始终独立展示与选择。
- [ ] 项目归属无法确定时显示未归属，不虚构关联。

## Blocked by

- [CW-003](./03-javascript-scan.md)

## Verification

- 多语言 monorepo、嵌套仓库、worktree .git 文件 fixture。
- 验证父级合计、展开项和跨视图选择集合一致。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
