# CW-005 Python 产物与共享缓存完整支持

Status: ready-for-agent
Type: AFK
Priority: P0
Execution: blocked
User stories: US03, US04

## What to build

Python 项目显示虚拟环境和工具缓存，并能解释每个候选的识别证据与恢复代价。

- 支持 pyvenv.cfg 及项目证据、**pycache**、pytest/mypy/ruff 缓存。
- 共享 pip 下载缓存独立分类；区分环境本体和项目可重建环境。
- 沿用通用列表/进度/候选策略，不增加第二套扫描引擎。

## Acceptance criteria

- [ ] 普通 env/venv 名称不能单独触发清理资格。
- [ ] Python/Conda 本体、带用户源码的环境及未知目录保守处理。
- [ ] 每类产物可在项目或共享视图看到计数、大小与规则依据。
- [ ] 缺失/损坏标记文件不会误删或使整次扫描崩溃。

## Blocked by

- [CW-004](./04-project-hierarchy.md)

## Verification

- 覆盖 pyproject/requirements 项目、pyvenv、嵌套缓存和假 env。
- Python 规则集与通用扫描/选择回归。

## Scope and completion evidence

遵守 [产品计划](../../../docs/plan/PRODUCT-PLAN.md) 与相关 ADR。实现的是完整用户路径，包含数据、后端、UI/双语及必要故障测试。完成后在此记录命令、结果、演示方式及限制，并更新任务总表。

## Comments

初始化时建立任务；验收未完成前不标记 done。
