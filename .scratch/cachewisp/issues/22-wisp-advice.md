# CW-022 Wisp 集成监控状态与安静提醒

Status: ready-for-agent
Type: AFK
Priority: P1
Execution: blocked
User stories: US12

## What to build

小精灵显示监控状态，在值得处理的变化出现时克制提示，点击查看建议。

- 只读最小状态/事件订阅，角色不持有全量项目/密钥/清理能力。
- 合并普通变化，相同问题冷却，低空间/持续增长等才主动冒泡。
- 点击卡片/小精灵打开对应主窗口，保持焦点/暂停行为一致。

## Acceptance criteria

- [ ] 同一问题不连续弹窗，不因每个文件变化反复冒泡。
- [ ] 隐藏 Wisp 不停止监控，退出应用终止一切后台工作。
- [ ] 无 AI Key/额度时仍有本地状态提醒。
- [ ] 预设追问和清理预览入口不绕过用户确认。

## Blocked by

- [CW-016](./16-tray-lifecycle.md)
- [CW-020](./20-ai-advice.md)
- [CW-021](./21-wisp-renderer.md)

## Verification

- 事件重放验证去重、冷却、合并、暂停与离线。
- 窗口开关、焦点和双语/减少动态效果原生 smoke。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
