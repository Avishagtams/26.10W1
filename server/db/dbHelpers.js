import fs from 'fs/promises';

const DB_PATH = new URL('./db.json', import.meta.url);

export async function readDb() {
  const text = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(text);
}

export async function writeDb(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}