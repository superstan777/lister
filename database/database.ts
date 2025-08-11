import { SQLiteDatabase, openDatabaseAsync } from "expo-sqlite";

export const DB_NAME = "database.db";

export let database: SQLiteDatabase;

(async () => {
  database = await openDatabaseAsync(DB_NAME);
})();

export const createDbIfNeeded = async (db: SQLiteDatabase) => {
  try {
    await db.execAsync("PRAGMA foreign_keys = ON;");

    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS lists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
      );`
    );

    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS devices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serial TEXT,
        list_id INTEGER NOT NULL,
        created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
        FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE
      );`
    );

    console.log("Database initialized successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};
