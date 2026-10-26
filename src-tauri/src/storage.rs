use cachewisp_core::AppPreferences;
use rusqlite::{Connection, OptionalExtension, params};
use std::{error::Error, path::Path, time::Duration};

type StorageResult<T> = Result<T, Box<dyn Error + Send + Sync>>;

pub struct Storage {
    connection: Connection,
}

impl Storage {
    pub fn open(path: &Path) -> StorageResult<Self> {
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent)?;
        }
        Self::initialize(Connection::open(path)?)
    }

    fn initialize(mut connection: Connection) -> StorageResult<Self> {
        connection.busy_timeout(Duration::from_secs(2))?;
        connection.execute_batch("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;")?;
        let version: u32 = connection.pragma_query_value(None, "user_version", |row| row.get(0))?;
        if version > 1 {
            return Err("database schema is newer than this application".into());
        }
        if version == 0 {
            let transaction = connection.transaction()?;
            transaction.execute_batch(include_str!("../migrations/0001-settings.sql"))?;
            transaction.commit()?;
        }
        Ok(Self { connection })
    }

    pub fn schema_version(&self) -> StorageResult<u32> {
        Ok(self
            .connection
            .pragma_query_value(None, "user_version", |row| row.get(0))?)
    }

    pub fn preferences(&self) -> StorageResult<AppPreferences> {
        let value: Option<String> = self
            .connection
            .query_row(
                "SELECT value FROM app_settings WHERE key = 'preferences'",
                [],
                |row| row.get(0),
            )
            .optional()?;
        match value {
            Some(value) => Ok(serde_json::from_str(&value)?),
            None => Ok(AppPreferences::default()),
        }
    }

    pub fn save_preferences(&self, preferences: &AppPreferences) -> StorageResult<()> {
        self.connection.execute(
            "INSERT INTO app_settings (key, value) VALUES ('preferences', ?1)
             ON CONFLICT(key) DO UPDATE SET value = excluded.value",
            params![serde_json::to_string(preferences)?],
        )?;
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::Storage;
    use cachewisp_core::{AppPreferences, Language};
    use rusqlite::Connection;

    #[test]
    fn persists_preferences_across_database_reopens() {
        let directory = tempfile::tempdir().unwrap();
        let path = directory.path().join("nested/cachewisp.sqlite3");
        let preferences = AppPreferences {
            language: Language::Chinese,
            auto_ai_daily_limit: 7,
        };
        {
            let storage = Storage::open(&path).unwrap();
            assert_eq!(storage.preferences().unwrap(), AppPreferences::default());
            storage.save_preferences(&preferences).unwrap();
        }
        let storage = Storage::open(&path).unwrap();
        assert_eq!(storage.schema_version().unwrap(), 1);
        assert_eq!(storage.preferences().unwrap(), preferences);
    }

    #[test]
    fn refuses_to_silently_reset_corrupt_preferences() {
        let storage = Storage::initialize(Connection::open_in_memory().unwrap()).unwrap();
        storage
            .connection
            .execute(
                "INSERT INTO app_settings (key, value) VALUES ('preferences', 'invalid json')",
                [],
            )
            .unwrap();
        assert!(storage.preferences().is_err());
    }

    #[test]
    fn refuses_to_downgrade_a_newer_database() {
        let connection = Connection::open_in_memory().unwrap();
        connection.pragma_update(None, "user_version", 99).unwrap();
        assert!(Storage::initialize(connection).is_err());
    }
}
