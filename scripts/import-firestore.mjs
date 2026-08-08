// One-off migration: Firestore JSON export -> Turso.
//
//   1. npx -y node-firestore-import-export firestore-export \
//        -a serviceAccount.json -b firestore-export.json
//   2. turso db shell <db-name> < db/schema.sql
//   3. TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... \
//        node scripts/import-firestore.mjs firestore-export.json
//
// Re-running is safe: rows are upserted by primary key, and html_notes is
// replaced wholesale (it has no stable ids to match on).

import {readFile} from 'node:fs/promises';
import {createClient} from '@libsql/client';
import {loadEnv} from './_env.mjs';

await loadEnv();

const exportPath = process.argv[2];

if (!exportPath) {
  console.error('Usage: node scripts/import-firestore.mjs <firestore-export.json>');
  process.exit(1);
}

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error('TURSO_DATABASE_URL is not set.');
  process.exit(1);
}

// The export tool nests collections under `__collections__` at the root of each
// document; the top level is a plain { collectionName: { docId: fields } } map.
const unwrapCollections = (root) =>
  root && typeof root === 'object' && root.__collections__
    ? root.__collections__
    : root;

// Firestore timestamps survive the export in several shapes depending on the
// tool version. Normalise them all to an ISO string, which sorts correctly as
// TEXT in SQLite.
const toIso = (value) => {
  if (value === null || value === undefined || value === '') return null;

  if (typeof value === 'object') {
    if (value.__datatype__ === 'timestamp' && value.value) {
      return toIso(value.value);
    }
    const seconds = value._seconds ?? value.seconds;
    if (typeof seconds === 'number') {
      const nanos = value._nanoseconds ?? value.nanoseconds ?? 0;
      return new Date(seconds * 1000 + Math.floor(nanos / 1e6)).toISOString();
    }
    return null;
  }

  if (typeof value === 'number') {
    // Heuristic: values this small are seconds, not milliseconds.
    return new Date(value < 1e12 ? value * 1000 : value).toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
};

const str = (value) => (value === null || value === undefined ? '' : String(value));

const raw = JSON.parse(await readFile(exportPath, 'utf8'));
const collections = unwrapCollections(raw);

const blogData = collections['blog-data'] ?? collections['blog_data'] ?? {};
const htmlData = collections['html'] ?? {};

const db = createClient({url, authToken});

const statements = [];

for (const [id, fields] of Object.entries(blogData)) {
  statements.push({
    sql: `INSERT INTO blog_posts
            (id, title, category, description, example_link, posted_by, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            title        = excluded.title,
            category     = excluded.category,
            description  = excluded.description,
            example_link = excluded.example_link,
            posted_by    = excluded.posted_by,
            created_at   = excluded.created_at`,
    args: [
      id,
      str(fields.title),
      str(fields.category),
      str(fields.description),
      str(fields.example_link),
      str(fields.posted_by),
      toIso(fields.created_at),
    ],
  });
}

statements.push({sql: 'DELETE FROM html_notes', args: []});

let order = 0;
for (const fields of Object.values(htmlData)) {
  statements.push({
    sql: `INSERT INTO html_notes
            (type, title, sub_title, description, example, sort_order)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [
      str(fields.type),
      str(fields.title),
      str(fields.subTitle ?? fields.sub_title),
      str(fields.description),
      str(fields.example),
      order++,
    ],
  });
}

if (statements.length === 0) {
  console.log('Nothing to import — no `blog-data` or `html` collections found.');
  process.exit(0);
}

await db.batch(statements, 'write');

console.log(
  `Imported ${Object.keys(blogData).length} blog post(s) and ${order} html note(s).`
);
