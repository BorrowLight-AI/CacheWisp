# 参与贡献 CacheWisp

[English](CONTRIBUTING.md) | **简体中文** · [首页](README.zh-CN.md)

先阅读 [CONTEXT.md](CONTEXT.md) 和 [任务总表](docs/TASKS.md)。选择依赖已完成的任务，阅读其验收标准和相关架构决策（ADR）。

运行 `pnpm install --frozen-lockfile`，再通过 `pnpm tauri dev` 启动。完成改动前运行 `pnpm verify`。涉及原生生命周期、凭证、文件系统和性能的改动，还需执行 [验证方案](docs/VALIDATION.md) 中对应的检查。

文件系统测试应使用临时 fixture。报告和 AI 请求中不得包含 API Key、私有路径或源码内容。每次贡献都应说明可观察行为、验证结果和实际限制。

将改动保持为完整且范围集中的用户功能闭环，完成后更新任务的证据记录。界面支持中英双语，每个可见文案都要提供两种翻译。引入较大的运行时依赖需要明确需求和资源测量证据。

同步维护中英文文档，包括 README、贡献指南、计划、任务索引、领域文档、验证记录与 ADR。准确标注文档链接的语言，不应暗示尚不存在的翻译已经提供。
