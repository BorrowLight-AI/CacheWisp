# CW-018 重要变化候选与严格脱敏数据通路

Status: ready-for-agent
Type: AFK
Priority: P1
Execution: blocked
User stories: US10, US11

## What to build

本地聚合值得关注的变化，用代号和统计生成 AI 输入，模型建议可以在本地映射回项目。

- 版本化阈值、持续增长/空间不足候选与冷却指纹。
- 定义允许字段白名单及本地别名映射，整体 payload 校验。
- 记录统计依据和数据完整性，拒绝不可信返回 ID/类别。

## Acceptance criteria

- [ ] payload 不包含真实项目名称、路径、文件名、源码或配置内容。
- [ ] 模型无法引用清单外文件/项目，不执行返回命令或 HTML。
- [ ] 不完整统计和不确定原因被明确描述，不能宣称已证明因果。
- [ ] 普通原始文件事件不直接触发 AI 请求。

## Blocked by

- [CW-014](./14-snapshots.md)
- [CW-017](./17-ai-connection.md)

## Verification

- 隐私 canary 覆盖项目名、Unicode、嵌套结构及错误重试 payload。
- mock 响应含未知 ID、路径/HTML/命令文本的拒绝及安全显示测试。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
