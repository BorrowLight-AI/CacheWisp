# CW-003 首条 JS/TS 项目与共享缓存扫描链路

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US02, US03, US04

## What to build

选择根后发现 package.json 项目及有上下文的依赖/构建产物，渐进显示文件数和逻辑大小；共享缓存独立发现。

- 从 roots 到规则检测、后台遍历、进度、结果持久化及 UI 列表贯通。
- 识别 node_modules 和可确认框架产物，记录规则 ID/证据/策略。
- 发现 npm/pnpm/Yarn 常见已启用共享 scope，保守区分 store 引用。
- 遍历不跟随目录链接，队列和并发有界，支持取消与部分结果。

## Acceptance criteria

- [ ] 普通同名目录、缺少上下文和 Git 跟踪内容不进入清理候选。
- [ ] pnpm 链接结构不循环、不越界，global virtual store 不被当作项目独占数据。
- [ ] 大目录扫描中 UI 可浏览与取消；取消保留上次成功快照。
- [ ] 共享缓存不记在任意单个项目总量内。

## Blocked by

- [CW-002](./02-scan-roots.md)

## Verification

- 小型 npm/pnpm/Yarn 真实布局 fixture，含普通 build/dist 目录。
- 扫描中修改/删除/取消测试；采样队列和进度事件数量。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
