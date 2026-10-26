//! Platform-independent domain. No Tauri, WebView or operating-system dependencies.

use serde::{Deserialize, Serialize};

pub const DEFAULT_AUTO_AI_DAILY_LIMIT: u32 = 20;

#[derive(Debug, Default, Clone, Copy, Serialize, Deserialize, PartialEq, Eq)]
pub enum Language {
    #[default]
    #[serde(rename = "system")]
    System,
    #[serde(rename = "zh-CN")]
    Chinese,
    #[serde(rename = "en")]
    English,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "camelCase", deny_unknown_fields)]
pub struct AppPreferences {
    pub language: Language,
    /// Automatic requests only; zero disables automatic analysis.
    pub auto_ai_daily_limit: u32,
}

impl Default for AppPreferences {
    fn default() -> Self {
        Self {
            language: Language::System,
            auto_ai_daily_limit: DEFAULT_AUTO_AI_DAILY_LIMIT,
        }
    }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ResourceTargets {
    pub idle_memory_mb: u32,
    pub idle_cpu_percent: f32,
}

impl Default for ResourceTargets {
    fn default() -> Self {
        Self {
            idle_memory_mb: 150,
            idle_cpu_percent: 1.0,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::AppPreferences;

    #[test]
    fn rejects_invalid_budget_inputs() {
        for budget in ["-1", "0.5", "4294967296", "\"20\""] {
            let input = format!(r#"{{"language":"system","autoAiDailyLimit":{budget}}}"#);
            assert!(serde_json::from_str::<AppPreferences>(&input).is_err());
        }
    }

    #[test]
    fn permits_zero_to_disable_automatic_analysis() {
        let input = r#"{"language":"en","autoAiDailyLimit":0}"#;
        let preferences: AppPreferences = serde_json::from_str(input).unwrap();
        assert_eq!(preferences.auto_ai_daily_limit, 0);
    }

    #[test]
    fn rejects_unknown_language_and_unexpected_settings() {
        for input in [
            r#"{"language":"xx","autoAiDailyLimit":20}"#,
            r#"{"language":"en","autoAiDailyLimit":20,"apiKey":"secret"}"#,
        ] {
            assert!(serde_json::from_str::<AppPreferences>(input).is_err());
        }
    }
}
