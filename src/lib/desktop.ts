import { invoke, isTauri } from "@tauri-apps/api/core";

export type Language = "system" | "zh-CN" | "en";
export interface Preferences {
  language: Language;
  autoAiDailyLimit: number;
}
export interface Bootstrap {
  version: string;
  platform: string;
  databaseSchemaVersion: number;
  preferences: Preferences;
  resourceTargets: { idleMemoryMb: number; idleCpuPercent: number };
}
export const defaultPreferences: Preferences = {
  language: "system",
  autoAiDailyLimit: 20,
};
export const desktopAvailable = isTauri();
export const getBootstrap = () => invoke<Bootstrap>("get_bootstrap");
export const savePreferences = (preferences: Preferences) =>
  invoke<Preferences>("save_preferences", { preferences });
