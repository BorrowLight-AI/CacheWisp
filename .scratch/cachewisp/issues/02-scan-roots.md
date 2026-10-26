# CW-002 选择、保存与授权扫描根目录

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: ready
User stories: US01

## What to build

用户通过原生目录选择器添加多个项目根目录，重启后仍可查看、移除和重新授权。

- 保存 scope 类型、用户授权、卷身份、展示路径及可访问状态。
- 根重叠归一化；权限不足/根删除/外置盘离线分别呈现。
- 删除根配置不删除磁盘内容，取消选择器不创建记录。

## Acceptance criteria

- [ ] 可以添加多个根，并在应用重启后恢复。
- [ ] 重复/嵌套根不会产生重复扫描任务。
- [ ] 符号链接根解析并明确授权真实目标；目录链接不自动跨范围。
- [ ] 权限失败可以重试授权，无权限范围不显示 0 占用。

## Blocked by

- [CW-001](./01-foundation.md)

## Verification

- 临时目录覆盖重复根、嵌套根、链接、不可读和路径消失。
- 原生选择器取消/确认、重启和移除配置的中英 UI 验证。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
