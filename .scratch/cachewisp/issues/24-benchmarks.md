# CW-024 百万文件与完整常驻资源验收

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US13

## What to build

用可复现实测证明重度扫描能力和完整常驻资源预算，输出原始证据与适用限制。

- 生成显式临时目录的可重复 fixture，支持百项目/百万文件/共享链接。
- 发布构建测试冷/热扫描、峰值、取消、UI 响应、存储增长。
- 主窗口关闭、Wisp 显示、监控开启、无扫描时采样全部相关进程。

## Acceptance criteria

- [ ] 固定设备/OS/文件系统/build/数据集参数和原始数据可复现。
- [ ] 常驻内存合计 ≤150 MB，平均空闲 CPU <1%，预热后至少采样 5 分钟。
- [ ] 统计共享内存/助手进程口径明确，隐藏 Wisp 有资源释放证据。
- [ ] 完整扫描耗时与峰值据实记录，未通过预算不标记首版可发布。

## Blocked by

- [CW-005](./05-python-rules.md)
- [CW-006](./06-go-rules.md)
- [CW-007](./07-jvm-rules.md)
- [CW-008](./08-rust-rules.md)
- [CW-009](./09-swift-xcode-rules.md)
- [CW-011](./11-trash-cleanup.md)
- [CW-012](./12-permanent-cleanup.md)
- [CW-013](./13-activity-filters.md)
- [CW-016](./16-tray-lifecycle.md)
- [CW-021](./21-wisp-renderer.md)
- [CW-022](./22-wisp-advice.md)
- [CW-023](./23-history-retention.md)

## Verification

- 执行 docs/VALIDATION.md 基准场景，产出带 commit 的报告。
- 故障/取消/事件风暴后验证资源回落，不只测试理想空闲瞬间。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
