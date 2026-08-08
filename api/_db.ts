// Shared SQLite/libSQL client. `_`-prefixed files are helpers, not routes.
import {createClient, type Client} from '@libsql/client';

let client: Client | undefined;

// Created lazily so a missing env var surfaces as a handled 500 with a clear
// message rather than crashing the process at import time.
export const getDb = (): Client => {
  if (client) return client;

  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      'DATABASE_URL is not set. Locally, copy .env.example to .env; ' +
        'in Docker it is set in docker-compose.yml.'
    );
  }

  client = createClient({url});
  return client;
};
