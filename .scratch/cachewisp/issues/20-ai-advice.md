# CW-020 AI 建议卡片与预设追问

Status: ready-for-agent
Type: AFK
Priority: P1
Execution: blocked
User stories: US11

## What to build

重要变化显示带依据的建议卡片，用户可预设追问并打开对应清理预览。

- 事实、可能原因、建议类别、时间、模型和用量以结构化数据保存。
- 提供为什么增长/清理影响等预设追问，复用脱敏上下文。
- 离线/服务异常/额度耗尽显示本地统计与重试选项。

## Acceptance criteria

- [ ] 推测用可能原因表述，不从只有统计的数据断言具体命令。
- [ ] 卡片动作只跳转清理预览，任何 AI 文本不会直接清理。
- [ ] 没有自由聊天或任意工具调用，追问计为用户主动请求。
- [ ] 双语内容与模型错误/取消状态可读，建议可追溯到事件。

## Blocked by

- [CW-018](./18-ai-anonymization.md)
- [CW-019](./19-ai-budget.md)

## Verification

- mock 响应驱动卡片、预设追问、错误、取消和映射测试。
- 从卡片进入预览但未确认时文件系统不发生变化。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
