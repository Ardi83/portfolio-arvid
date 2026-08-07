// Shared Turso/libSQL client for the serverless functions in this directory.
// Files prefixed with `_` are not exposed as routes by Vercel.
import {createClient, type Client} from '@libsql/client/web';

let client: Client | undefined;

// Created lazily so a missing env var surfaces as a handled 500 with a clear
// message rather than crashing the function at module load.
export const getDb = (): Client => {
  if (client) return client;

  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    throw new Error(
      'TURSO_DATABASE_URL is not set. Add it in Vercel under Settings → Environment Variables.'
    );
  }

  client = createClient({url, authToken});
  return client;
};
