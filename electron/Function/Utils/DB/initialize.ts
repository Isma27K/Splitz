import Database from 'better-sqlite3';
import path from 'path';
import { app } from 'electron';
import fs from 'fs';

let db: Database.Database;

// Initialize or return DB
export function initDatabase() {
  if (db) return db;

  const dbPath = path.join(app.getPath('userData'), 'app.db');
  db = new Database(dbPath);

  // Create tables if they don’t exist
  db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `).run();

  return db;
}


export function getDatabase() {
    const dbPath = path.join(app.getPath('userData'), 'app.db');
    return fs.existsSync(dbPath);
}