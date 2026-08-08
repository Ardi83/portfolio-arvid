// Minimal .env loader shared by the db scripts, so they work without adding a
// dotenv dependency. Real environment variables always win.
import {readFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';

export const loadEnv = async (path = '.env') => {
  if (!existsSync(path)) return;

  const contents = await readFile(path, 'utf8');
  for (const line of contents.split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (key.startsWith('#')) continue;
    if (process.env[key] === undefined) {
      process.env[key] = rawValue.trim().replace(/^["']|["']$/g, '');
    }
  }
};
