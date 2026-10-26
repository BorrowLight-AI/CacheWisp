# CW-012 独立确认的永久删除闭环

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US05

## What to build

用户明确选择永久删除并确认后，在同样严格的后端校验下处理，留下可核对结果。

- 将清理模式与确认令牌绑定，不复用废纸篓许可。
- 删除逐目标核对、支持失败恢复列表和退出中断记录。
- 界面解释重新安装/构建代价及不可经废纸篓恢复。

## Acceptance criteria

- [ ] 默认始终是废纸篓，永久删除必须显式选择和确认。
- [ ] 陈旧预览、受保护目标和范围外路径不能删除。
- [ ] 中途部分失败后，成功/失败/未处理状态可核对。
- [ ] 模型输出或前端原始路径不能直接触发删除。

## Blocked by

- [CW-011](./11-trash-cleanup.md)

## Verification

- 临时 fixture 中验证确认模式替换、竞态、拒绝越界和中断重试。
- 检查所有永久删除入口均经过同一后端策略。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
