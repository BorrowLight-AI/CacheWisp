# CW-015 可选目录监控与有界增量核对

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US08, US13

## What to build

用户对选定 scope 开启监控，变化聚合后更新相关统计，暂停和取消可控。

- 使用原生事件适配器，去抖、批次合并、并发及队列有界。
- scope 更新中状态、稳定窗口局部重算、事件丢失全量核对。
- 暂停/恢复、睡眠唤醒、清理预期变化的合并策略。

## Acceptance criteria

- [ ] 不开启监控的目录不会自动产生常驻遍历。
- [ ] 安装大量文件不触发每文件全量扫描、IPC 或永久事件写入。
- [ ] 过期数据标记清楚，最终与主动重新扫描结果一致。
- [ ] 暂停/退出释放监听与后台任务，不遗留无限重试。

## Blocked by

- [CW-014](./14-snapshots.md)

## Verification

- 事件风暴、丢失、睡眠/唤醒、清理引发事件的压力测试。
- 记录监听数量、队列上界、空闲 CPU 及回落趋势。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
