# 本地 Markdown 任务跟踪

[English](issue-tracker.md) | **简体中文**

任务存于 `.scratch/cachewisp/issues`，由 [docs/TASKS.md](../TASKS.md) 索引。该目录有意提交到 Git，不是临时数据。

权威产品计划为 [PRODUCT-PLAN.md](../plan/PRODUCT-PLAN.md)，`.scratch/cachewisp/PRD.md` 指向该计划。稳定任务编号为 CW-001 至 CW-025。

每项任务记录 Status、Type（AFK/HITL）、优先级、阻塞任务 ID、用户故事、端到端结果、验收标准与验证方法。ready-for-agent 分诊标签不允许忽略未解除依赖；所有阻塞任务完成后才能开始。

只有记录验收标准达成情况和真实验证证据后，任务才算完成。同步更新任务文件和索引。以后迁移至 GitHub 应保留本地编号并补真实 issue 链接；当前开发不要求远端仓库。
