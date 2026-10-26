# CW-017 自配 AI 服务、系统凭证与连接测试

Status: ready-for-agent
Type: AFK
Priority: P1
Execution: ready
User stories: US10

## What to build

用户配置兼容服务地址、模型和 Key，连接测试可用，Key 只留在系统凭证库。

- 设置页＋后端凭证适配器＋非敏感连接配置持久化。
- 兼容 Chat Completions 文本请求，校验地址/模型、超时和取消。
- 明确测试请求及调用统计，支持删除凭证和服务异常降级。

## Acceptance criteria

- [ ] SQLite、WebView 状态、错误日志与导出均不含明文 Key。
- [ ] 默认远端 HTTPS，本地 HTTP 地址显式允许；不静默转发到未知替代服务。
- [ ] 测试仅发送固定无项目身份内容。
- [ ] 无 Key/失败/限流不影响本地功能，提供可操作错误。

## Blocked by

- [CW-001](./01-foundation.md)

## Verification

- mock HTTP 服务覆盖鉴权、超时、错误格式、取消和连接测试。
- Keychain 存取/删除 smoke；搜索日志/数据库确保无测试 secret。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
