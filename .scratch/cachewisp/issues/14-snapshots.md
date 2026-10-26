# CW-014 持久快照、变化列表与离线卷状态

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US01, US09

## What to build

重开应用先查看上次结果，变化有来源与时间，断连卷不消失也不变成零占用。

- 原子提交 scope 快照，保存完整性、统计版本和时间。
- 对比稳定快照生成聚合变化，展示项目与共享变化列表。
- 保留离线/过期/部分状态，卷身份变化使旧清理预览失效。

## Acceptance criteria

- [ ] 未完成扫描不会覆盖最后成功结果而丢失可信基线。
- [ ] 外置盘断连保留上次统计并显示未连接。
- [ ] 同一路径换卷不能误用旧身份或清理授权。
- [ ] 变化区分新增/移除/大小变化/未知，不因部分失败制造骤降。

## Blocked by

- [CW-004](./04-project-hierarchy.md)
- [CW-010](./10-measurement.md)

## Verification

- 重启、取消、事务中断、断连/换卷、重复快照 fixture。
- 验证变化列表与原始聚合计数可追溯。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
