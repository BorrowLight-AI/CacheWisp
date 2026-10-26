# CW-023 历史保留、存储有界与长时间稳定性

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US09, US13

## What to build

开发者长期使用后仍能查看有效变化历史，应用自身不会无限积累原始事件和索引。

- 聚合快照与详细事件分层保留，初始提议 90 天/30 天。
- 过期数据回收、索引/SQLite 维护与写入批处理。
- 清理审计与预算证据不被日常压缩破坏，当前基线保持一致。

## Acceptance criteria

- [ ] 事件风暴不导致每条原始事件永久落库。
- [ ] 清理过期历史后当前快照、预算和保护数据正确。
- [ ] 维护任务可取消/退出恢复，不独占 UI 或长时间锁库。
- [ ] 报告长期模拟下数据库、索引、内存及重开读取耗时。

## Blocked by

- [CW-014](./14-snapshots.md)
- [CW-015](./15-monitoring.md)

## Verification

- 模拟数月聚合/事件，压缩中断/重启/数据库迁移回归。
- 压力下校验资源回落及当前快照一致性。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
