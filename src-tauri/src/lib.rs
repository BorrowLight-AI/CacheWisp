mod storage;

use cachewisp_core::{AppPreferences, ResourceTargets};
use serde::Serialize;
use std::sync::Mutex;
use tauri::Manager;

struct AppState(Mutex<storage::Storage>);

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct Bootstrap {
    version: &'static str,
    platform: &'static str,
    database_schema_version: u32,
    preferences: AppPreferences,
    resource_targets: ResourceTargets,
}

#[tauri::command]
fn get_bootstrap(state: tauri::State<'_, AppState>) -> Result<Bootstrap, String> {
    let storage = state.0.lock().map_err(|error| error.to_string())?;
    Ok(Bootstrap {
        version: env!("CARGO_PKG_VERSION"),
        platform: std::env::consts::OS,
        database_schema_version: storage
            .schema_version()
            .map_err(|error| error.to_string())?,
        preferences: storage.preferences().map_err(|error| error.to_string())?,
        resource_targets: ResourceTargets::default(),
    })
}

#[tauri::command]
fn save_preferences(
    preferences: AppPreferences,
    state: tauri::State<'_, AppState>,
) -> Result<AppPreferences, String> {
    let storage = state.0.lock().map_err(|error| error.to_string())?;
    storage
        .save_preferences(&preferences)
        .map_err(|error| error.to_string())?;
    Ok(preferences)
}

pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let path = app.path().app_data_dir()?.join("cachewisp.sqlite3");
            let storage = storage::Storage::open(&path).map_err(std::io::Error::other)?;
            app.manage(AppState(Mutex::new(storage)));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_bootstrap, save_preferences])
        .run(tauri::generate_context!())
        .expect("failed to run CacheWisp");
}
