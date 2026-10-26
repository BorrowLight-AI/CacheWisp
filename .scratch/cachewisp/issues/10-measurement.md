# CW-010 可信磁盘统计与选择级释放估算

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US03, US04

## What to build

用户同时理解逻辑大小、磁盘占用估算、预计释放空间及计数语义，选择变化后估算随之更新。

- 引入卷＋实体身份的硬链接去重，规范目录条目和实体计数。
- 对范围外链接、APFS 克隆/快照、压缩/稀疏文件提供估算限制。
- 归一化父子/重复选择，预计释放按选中集合计算。
- 未知值和部分扫描使用状态，数值类型避免大目录溢出。

## Acceptance criteria

- [ ] 多个项目共享同一实体时总量不简单重复相加。
- [ ] 仍有范围外硬链接时，不把全部分配大小认作可释放。
- [ ] APFS 共享块无法确认时标注估算或未知，不伪造精确值。
- [ ] 移入废纸篓、已处理大小和卷空闲变化分开显示。

## Blocked by

- [CW-003](./03-javascript-scan.md)
- [CW-004](./04-project-hierarchy.md)

## Verification

- 硬链接跨 scope/范围外、稀疏文件、重叠选择及大整数 fixture。
- 在 APFS 上记录克隆/快照案例与测量口径，比较实际结果不强行等同。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
