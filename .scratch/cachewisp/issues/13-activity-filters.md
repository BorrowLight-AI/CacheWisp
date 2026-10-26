# CW-013 最近修改、搜索与组合筛选

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US07

## What to build

开发者按生态、产物类型、名称、占用与最近修改区间找到值得清理的项目。

- 记录可解释的项目修改信号，避开生成物时间污染。
- 提供近 30/90/180 天无修改与自定义排序/组合筛选。
- 筛选与当前选择、展开状态、项目保护明确关联。

## Acceptance criteria

- [ ] 所有文案使用最近修改，不宣称最后使用或自动安全。
- [ ] 未知修改时间不能当作长期闲置。
- [ ] 安装依赖/构建产物修改不会直接把源项目标为最近开发。
- [ ] 筛选后批量选择只作用于用户可确认范围，不隐含选中隐藏项。

## Blocked by

- [CW-004](./04-project-hierarchy.md)

## Verification

- 源文件/生成物不同时间、未来时间、无法读取元数据 fixture。
- 中英筛选组合、排序、清空筛选和选择预览验证。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
