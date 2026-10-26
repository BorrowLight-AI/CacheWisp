# CW-006 Go 缓存识别与共享范围管理

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US03, US04

## What to build

Go 项目及全局构建/模块缓存正确分类，明确哪些内容仅可查看。

- 静态识别 go.mod/go.work，处理已授权的缓存位置。
- 支持 GOCACHE/GOMODCACHE 可确认布局和独立共享统计。
- 明确 vendor、私有模块及本地产物的排除/保守策略。

## Acceptance criteria

- [ ] 不运行 go 命令或项目代码来扩大已授权范围。
- [ ] vendor 不因体积大而被当成缓存删除。
- [ ] 私有或唯一来源模块无法证明可重建时只统计。
- [ ] 损坏缓存、不可读子项、项目/共享视图均有结果状态。

## Blocked by

- [CW-004](./04-project-hierarchy.md)

## Verification

- go.mod/go.work、vendor 跟踪文件、私有模块和假目录 fixture。
- 覆盖自定义位置越界与共享缓存重复授权。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
