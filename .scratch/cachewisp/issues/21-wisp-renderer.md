# CW-021 轻量 Wisp 独立窗口与资源验证

Status: ready-for-agent
Type: AFK
Priority: P1
Execution: ready
User stories: US12, US13

## What to build

以可拖动、可隐藏的简洁 2D 角色验证透明悬浮窗口及按需生命周期。

- 尽早做 release 透明窗口/桌面行为验证，不等待 AI 完成。
- 有限状态动效，静止停刷新，遵循减少动态效果。
- 隐藏销毁窗口资源，重新显示按需创建，不中断后台监控。

## Acceptance criteria

- [ ] 可拖动、隐藏、恢复，不抢键盘焦点、不遮挡普通操作的无关区域。
- [ ] 隐藏后不残留该角色的计时器/渲染循环/WebView。
- [ ] 显示静止时有资源采样记录；超预算优先降复杂度或切换适配器。
- [ ] 窗口工作区/显示器变化行为可解释，主窗口逻辑独立。

## Blocked by

- [CW-001](./01-foundation.md)

## Verification

- 原生 release 原型：拖动、多显示器、隐藏重建、减少动态效果。
- 记录相关进程内存/CPU，不能只记录主 PID。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
