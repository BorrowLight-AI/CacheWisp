# CW-019 自动调用预算与用量设置闭环

Status: ready-for-agent
Type: AFK
Priority: P1
Execution: blocked
User stories: US11

## What to build

用户调整每日自动分析额度，应用在并发、重启和重试下也遵守上限。

- 默认 20/日，设置非负整数，0 停用自动调用。
- 请求前原子预留，所有自动尝试/重试计入上限，手动请求单独统计。
- 本地日历日/时区记录与重启恢复；Token 缺失保留未知。

## Acceptance criteria

- [ ] 并发事件不会超发；达到上限只提供本地提醒。
- [ ] 修改额度立即影响后续请求，减到已用以下不撤销既有记录也不继续自动发。
- [ ] 当天重启不重置预算，日期/时区切换策略可解释并有测试。
- [ ] 服务未提供 Token 或价格时不展示虚构零消耗/费用。

## Blocked by

- [CW-017](./17-ai-connection.md)
- [CW-018](./18-ai-anonymization.md)

## Verification

- mock 时钟/时区、并发请求、崩溃恢复、重试与 0 次测试。
- 端到端修改设置→候选触发→上限阻止→UI 用量验证。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
