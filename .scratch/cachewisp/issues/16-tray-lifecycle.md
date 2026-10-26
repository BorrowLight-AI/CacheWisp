# CW-016 菜单栏常驻与外置盘重连生命周期

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US08

## What to build

关闭主窗口继续监控，菜单栏可暂停/恢复和重新打开；明确退出终止所有工作。

- 区分关闭窗口、隐藏 Wisp 与退出应用。
- 按需创建/释放主窗口，保留状态和可访问菜单栏入口。
- 外置卷离线停止该卷任务，重连核对身份和局部变化。

## Acceptance criteria

- [ ] 关闭窗口不退出已启用监控；明确退出后无应用监听/网络残留。
- [ ] 重复打开/关闭不会泄漏 WebView、监听或数据库连接。
- [ ] 离线状态可恢复且不重复统计，同路径不同卷触发重新确认。
- [ ] 菜单栏状态、暂停和错误文案中英完整。

## Blocked by

- [CW-015](./15-monitoring.md)

## Verification

- 原生应用窗口开关/退出/重启 smoke，统计进程与资源。
- 外置卷临时测试及睡眠/唤醒重连验证。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
