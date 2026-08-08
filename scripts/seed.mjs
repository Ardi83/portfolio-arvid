// Fills the database with a little sample content so the blog renders during
// local development. Safe to re-run; it replaces what it inserted previously.
//
//   yarn db:seed
//
// This is placeholder data — use `yarn db:import` for the real Firestore export.

import {createClient} from '@libsql/client';
import {loadEnv} from './_env.mjs';

await loadEnv();

const url = process.env.DATABASE_URL;

if (!url) {
  console.error('DATABASE_URL is not set. Copy .env.example to .env.');
  process.exit(1);
}

const posts = [
  {
    id: 'sample-semantic-html',
    title: 'Semantic HTML is still the cheapest accessibility win',
    category: 'html',
    description:
      '<p>Using <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code> and <code>&lt;article&gt;</code> gives screen readers a document outline for free.</p>',
    example_link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
    posted_by: 'Arvid',
    created_at: '2026-05-14T09:30:00.000Z',
  },
  {
    id: 'sample-css-grid',
    title: 'Grid or flexbox? Ask which axis you care about',
    category: 'css',
    description:
      '<p>Flexbox lays out along one axis. Grid controls both at once. Reaching for grid on a single row is usually more machinery than the problem needs.</p>',
    example_link: 'https://css-tricks.com/snippets/css/complete-guide-grid/',
    posted_by: 'Arvid',
    created_at: '2026-06-02T14:05:00.000Z',
  },
  {
    id: 'sample-ts-narrowing',
    title: 'Type narrowing beats type assertions',
    category: 'typescript',
    description:
      '<p>Every <code>as</code> is a place the compiler stopped helping. A guard keeps the checking that assertions throw away.</p>',
    example_link: '',
    posted_by: 'Arvid',
    created_at: '2026-07-21T18:45:00.000Z',
  },
];

const notes = [
  {
    type: 'semantic',
    title: '<header>',
    sub_title: 'Introductory content',
    description: 'Wraps intro content or navigational aids for its nearest section.',
    example: '<header>\n  <h1>Site title</h1>\n</header>',
  },
  {
    type: 'semantic',
    title: '<main>',
    sub_title: 'The dominant content',
    description: 'The main content of the document. Only one per page.',
    example: '<main>\n  <article>...</article>\n</main>',
  },
  {
    type: 'semantic',
    title: '<footer>',
    sub_title: 'Closing content',
    description: 'Authorship, copyright, or related links for its nearest section.',
    example: '<footer>\n  <p>© 2026</p>\n</footer>',
  },
];

const db = createClient({url});

const statements = posts.map((post) => ({
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
    post.id,
    post.title,
    post.category,
    post.description,
    post.example_link,
    post.posted_by,
    post.created_at,
  ],
}));

statements.push({sql: 'DELETE FROM html_notes', args: []});

notes.forEach((note, index) => {
  statements.push({
    sql: `INSERT INTO html_notes
            (type, title, sub_title, description, example, sort_order)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [
      note.type,
      note.title,
      note.sub_title,
      note.description,
      note.example,
      index,
    ],
  });
});

await db.batch(statements, 'write');

console.log(`Seeded ${posts.length} sample post(s) and ${notes.length} html note(s).`);
