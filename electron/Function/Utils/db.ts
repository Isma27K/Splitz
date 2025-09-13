import { initDatabase } from './DB/initialize';

function getDb() {
  return initDatabase();
}

export function addUser(name: string) {
  const db = getDb();
  const stmt = db.prepare('INSERT INTO users (name) VALUES (?)');
  const info = stmt.run(name);
  return info.lastInsertRowid;
}

export function getUsers() {
  const db = getDb();
  return db.prepare('SELECT * FROM users').all();
}
