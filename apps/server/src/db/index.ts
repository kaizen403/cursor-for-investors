import path from "node:path";

import Database from "better-sqlite3";

const databasePath = path.resolve(process.cwd(), "neuralyn.db");

export const db = new Database(databasePath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
