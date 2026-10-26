# CW-011 清理预览、手动保护与系统废纸篓

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US05, US06

## What to build

用户选择产物、查看影响并确认后移入系统废纸篓，逐目标反馈并更新统计。

- 后端用产物 ID 生成带目标身份的预览，保留选择和模式。
- 实现手动项目保护及父子穿透拦截，项目/共享范围独立。
- 执行前核对授权、规则证据、身份、链接、保护和预览有效性。
- 原生废纸篓适配、部分失败、历史记录和受影响统计刷新贯通。

## Acceptance criteria

- [ ] 受保护子项目不能被父项目或父目录选择绕过。
- [ ] 预览后目标替换/链接变化/根失效时跳过并要求刷新。
- [ ] 废纸篓失败保留原目标，不降级永久删除。
- [ ] 成功目标不重复处理，重试只作用于仍有效的失败项。
- [ ] 处理结果不会把移入废纸篓标为磁盘已释放。

## Blocked by

- [CW-004](./04-project-hierarchy.md)
- [CW-010](./10-measurement.md)

## Verification

- 一次性临时 fixture 测试路径竞态、保护、重叠选择、部分失败和重试。
- 原生废纸篓 smoke 只定位测试自身目标；不清空系统废纸篓。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
