// Production server: serves the built SPA and the two read-only API routes
// from a single container, behind nginx-proxy.
import {fileURLToPath} from 'node:url';
import {dirname, join} from 'node:path';
import express from 'express';
import blogData from '../api/blog-data.js';
import html from '../api/html.js';

const here = dirname(fileURLToPath(import.meta.url));
// dist-server/server/index.js -> repo root -> dist
const distDir = join(here, '..', '..', 'dist');

const port = Number(process.env.PORT ?? 3000);
const app = express();

app.disable('x-powered-by');

// Cheap liveness endpoint for the compose healthcheck.
app.get('/healthz', (_req, res) => {
  res.status(200).json({status: 'ok'});
});

app.get('/api/blog-data', blogData);
app.get('/api/html', html);

// Anything else under /api is a 404 in JSON, never the SPA shell — otherwise a
// typo returns HTML and the client fails with a confusing parse error.
app.use('/api', (req, res) => {
  res.status(404).json({error: `No API route for ${req.path}`});
});

// Fingerprinted assets are safe to cache forever; index.html must not be.
app.use(
  '/assets',
  express.static(join(distDir, 'assets'), {
    immutable: true,
    maxAge: '1y',
  })
);

// A missing build asset must 404, never fall through to the SPA shell —
// otherwise the browser gets HTML where it expected JS and fails with a
// misleading "Unexpected token '<'".
app.use('/assets', (req, res) => {
  res.status(404).json({error: `Asset not found: ${req.path}`});
});

app.use(
  express.static(distDir, {
    index: false,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html') || filePath.endsWith('sw.js')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    },
  })
);

// Client-side routes (/, /blog) all resolve to the SPA shell.
app.use((_req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(join(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`portfolio listening on :${port}`);
});
