// Applies db/schema.sql to the database in DATABASE_URL.
//
// Reads .env if present.
//
//   node scripts/apply-schema.mjs
//
// The schema is written with IF NOT EXISTS throughout, so this is safe to
// re-run.

import {readFile} from 'node:fs/promises';
import {createClient} from '@libsql/client';
import {loadEnv} from './_env.mjs';

await loadEnv();

const url = process.env.DATABASE_URL;

if (!url) {
  console.error(
    'DATABASE_URL is not set. Copy .env.example to .env and fill it in.'
  );
  process.exit(1);
}

const schema = await readFile(new URL('../db/schema.sql', import.meta.url), 'utf8');

const db = createClient({url});
await db.executeMultiple(schema);

const tables = await db.execute(
  "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
);

console.log(`Schema applied. Tables: ${tables.rows.map((r) => r.name).join(', ')}`);
