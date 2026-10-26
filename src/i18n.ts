import type { Language } from "./lib/desktop";

const en = {
  navigation: "Workspace",
  overview: "Overview",
  settings: "Settings",
  preview: "Foundation preview",
  tagline: "Keep your dev space light.",
  intro: "Understand what your projects leave behind.",
  subtitle:
    "A quiet home for project dependencies, caches and build artifacts.",
  projectCache: "Project caches",
  globalCache: "Shared caches",
  unscanned: "Not scanned",
  dailyBudget: "Automatic AI analyses / day",
  disabled: "Disabled",
  emptyTitle: "Your workspace starts here",
  emptyBody:
    "The application foundation is ready. Project scanning, cleanup and monitoring are tracked in the implementation plan.",
  ecosystems: "Planned first-release ecosystems",
  statusTitle: "Application status",
  storage: "Local storage",
  ready: "Ready",
  waiting: "Not connected",
  platform: "Platform",
  schema: "Database schema",
  refresh: "Check application status",
  errorTitle: "Unable to load application settings",
  browserNote:
    "This is the web preview. Open the desktop application to use local settings.",
  language: "Interface language",
  system: "Follow system",
  languageHint: "Applies to the interface and future AI suggestions.",
  budget: "Daily automatic AI analysis limit",
  budgetHint:
    "Default: 20. Set to 0 to disable automatic analysis. Manual requests are counted separately.",
  budgetNote:
    "This preference is saved locally. AI requests become available in a later implementation milestone.",
  save: "Save preferences",
  saving: "Saving…",
  saved: "Preferences saved locally.",
  invalidBudget: "Enter a valid non-negative whole number.",
  saveError: "Unable to save preferences.",
  local: "Local first",
  privacy: "Future AI analyses will receive anonymized statistics only.",
  resourceTitle: "Resident resource targets",
  resourceHint:
    "Main window closed, Wisp visible, monitoring enabled, no scan running. Targets require benchmark validation.",
  memory: "Combined application memory",
  cpu: "Average idle CPU",
  version: "Version",
  skip: "Skip to content",
  planned: "Planned",
  scope: "Manual cleanup. You stay in control.",
} as const;

const zh: Record<keyof typeof en, string> = {
  navigation: "工作区",
  overview: "空间总览",
  settings: "设置",
  preview: "基础工程预览",
  tagline: "让开发空间，轻一点。",
  intro: "看清项目留下的每一份占用。",
  subtitle: "集中管理项目依赖、缓存和构建产物，安静守护开发空间。",
  projectCache: "项目内缓存",
  globalCache: "全局共享缓存",
  unscanned: "尚未扫描",
  dailyBudget: "每日自动 AI 分析上限",
  disabled: "已停用",
  emptyTitle: "从这里建立你的开发空间视图",
  emptyBody: "应用基础工程已就绪。项目扫描、清理与监控将在实施计划中逐项接入。",
  ecosystems: "首版计划支持的开发生态",
  statusTitle: "应用状态",
  storage: "本地存储",
  ready: "已就绪",
  waiting: "未连接",
  platform: "运行平台",
  schema: "数据库版本",
  refresh: "检查应用状态",
  errorTitle: "无法读取应用设置",
  browserNote: "当前为网页预览，请打开桌面应用以使用本地设置。",
  language: "界面语言",
  system: "跟随系统",
  languageHint: "用于界面和后续的 AI 建议。",
  budget: "每日自动 AI 分析次数上限",
  budgetHint: "默认 20 次。设为 0 可停用自动分析，手动请求单独统计。",
  budgetNote: "当前支持本地保存此设置，AI 请求将在后续实施阶段接入。",
  save: "保存设置",
  saving: "正在保存…",
  saved: "设置已保存到本机。",
  invalidBudget: "请输入有效的非负整数。",
  saveError: "设置保存失败。",
  local: "本地优先",
  privacy: "后续 AI 分析仅发送脱敏统计数据。",
  resourceTitle: "常驻资源验收目标",
  resourceHint:
    "主窗口关闭、小精灵显示、监控开启，且没有扫描任务时统计。目标需通过基准测试验证。",
  memory: "应用相关进程合计内存",
  cpu: "平均空闲 CPU 占用",
  version: "版本",
  skip: "跳转到主要内容",
  planned: "待实现",
  scope: "手动清理，由你决定。",
};

export function resolveLanguage(language: Language): "zh-CN" | "en" {
  return language === "system"
    ? navigator.language.toLowerCase().startsWith("zh")
      ? "zh-CN"
      : "en"
    : language;
}
export function messages(language: Language) {
  return resolveLanguage(language) === "zh-CN" ? zh : en;
}
