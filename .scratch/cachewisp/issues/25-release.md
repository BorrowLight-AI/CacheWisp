# CW-025 全范围发布验收与 macOS 安装包

Status: ready-for-human
Type: HITL
Priority: P0
Execution: blocked
User stories: US14

## What to build

开发者能够从公开发布资料下载、安装、使用并理解限制；源码和构建步骤可复现。

- 六类规则、离线本地闭环、中英 UI、恢复代价与估算说明做全量验收。
- 锁文件 CI、版本/变更说明、源码许可证、安装与问题反馈资料。
- 验证 Apple Silicon、评估/验证 Intel 与 macOS 最低版本，明确实际支持范围。
- 提供 app/DMG，公开发布前完成凭证支持下的签名/公证及安装验证。

## Acceptance criteria

- [ ] 未完成任务和未验证平台不被宣称已支持。
- [ ] 安装、首次启动、权限、升级、退出/卸载数据说明完整。
- [ ] 签名/公证状态真实，公开 GitHub URL 与发布权限由维护者提供。
- [ ] 资源、隐私、删除门禁报告齐全后才发布首版。

## Blocked by

- [CW-005](./05-python-rules.md)
- [CW-006](./06-go-rules.md)
- [CW-007](./07-jvm-rules.md)
- [CW-008](./08-rust-rules.md)
- [CW-009](./09-swift-xcode-rules.md)
- [CW-012](./12-permanent-cleanup.md)
- [CW-013](./13-activity-filters.md)
- [CW-020](./20-ai-advice.md)
- [CW-024](./24-benchmarks.md)

## Verification

- 干净 macOS 环境安装/首次授权/无 Key 使用 smoke。
- 核对发布 artifact 校验值、签名/公证、支持矩阵及文档链接。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

签名/公证凭证、公开仓库地址和最终对外发布属于维护者参与项。本地无签名构建可先验证，不能因此阻塞 CW-001。

## Comments

初始化时建立任务；验收未完成前不标记 done。
