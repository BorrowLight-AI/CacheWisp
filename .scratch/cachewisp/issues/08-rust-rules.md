# CW-008 Rust 项目与共享下载缓存支持

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US03, US04

## What to build

Cargo workspace 产物与共享缓存分开显示，保持 rustup/已安装程序和用户修改内容安全。

- 识别 Cargo.toml/workspace/默认 target 和静态已授权自定义目标。
- Cargo 下载缓存可确认子项独立展示。
- 为修改过的 registry 源码、未知来源数据设置只读策略。

## Acceptance criteria

- [ ] workspace target 汇总一次，成员项目关联可解释。
- [ ] 不删除 rustup 工具链、Cargo 已安装程序或未授权 target。
- [ ] 源码混入或 Git 跟踪内容阻止清理资格。
- [ ] 所有候选进入通用测量、选择和预览链路。

## Blocked by

- [CW-004](./04-project-hierarchy.md)

## Verification

- 虚拟 workspace、成员 target、自定义路径、registry 修改及假 target fixture。
- 确认扫描不触发联网解析依赖或运行 build.rs。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
