# CW-009 Swift/Xcode 产物与项目映射

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US03, US04

## What to build

Swift Package 和 Xcode DerivedData 可查看并尽可能映射项目，排除归档及开发环境数据。

- 识别 Package.swift 上下文的 .build。
- 有界读取 DerivedData 元数据，可靠映射后展示项目关联；未确认保留共享视图。
- 显式排除 .xcarchive、签名材料、SDK、模拟器设备/用户数据。

## Acceptance criteria

- [ ] 不因名称含 cache/build 就清理归档或环境组件。
- [ ] 失效 DerivedData 映射不虚构所属项目。
- [ ] 项目与全局选择不会重复处理同一产物。
- [ ] 元数据损坏/权限不足记录部分状态。

## Blocked by

- [CW-004](./04-project-hierarchy.md)

## Verification

- SwiftPM、多个 Xcode 项目、失效映射、归档及模拟器排除 fixture。
- 使用自有临时 DerivedData 结构验证，不清理真实 Xcode 目录。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
