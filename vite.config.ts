import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {defineConfig, loadEnv, type Plugin} from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA, VitePWAOptions} from 'vite-plugin-pwa';

// Runs the /api functions inside the dev server so `yarn dev` behaves like
// production. Without it Vite treats api/*.ts as source and hands back a
// transformed ES module, so fetch() receives JavaScript where it wants JSON.
//
// Registered from configureServer directly, which puts it ahead of Vite's
// own transform middleware — that ordering is the whole point.
const localApi = (env: Record<string, string>): Plugin => ({
  name: 'local-api',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url ?? '';
      if (!url.startsWith('/api/')) return next();

      const route = url.split('?')[0].replace(/^\/api\//, '').replace(/\/+$/, '');
      const sendJson = (status: number, body: unknown) => {
        res.statusCode = status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(body));
      };

      // `_`-prefixed files are shared helpers, not routes — same as on Vercel.
      if (route.startsWith('_') || !existsSync(resolve(server.config.root, 'api', `${route}.ts`))) {
        return sendJson(404, {error: `No API route for /api/${route}`});
      }

      for (const key of ['TURSO_DATABASE_URL', 'TURSO_AUTH_TOKEN']) {
        if (process.env[key] === undefined && env[key]) process.env[key] = env[key];
      }

      server
        .ssrLoadModule(`/api/${route}.ts`)
        .then((mod) => {
          const shim = Object.assign(res, {
            status(code: number) {
              res.statusCode = code;
              return shim;
            },
            json(body: unknown) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(body));
              return shim;
            },
          });
          return mod.default(req, shim);
        })
        .catch((error: unknown) => {
          const message = error instanceof Error ? error.message : String(error);
          server.config.logger.error(`[local-api] /api/${route} failed: ${message}`);
          if (!res.writableEnded) sendJson(500, {error: message});
        });
    });
  },
});

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'Arvid Nasirabadi',
    short_name: 'Arvid',
    description: 'Arvid Nasirabadi personal web site.',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'apple touch icon',
      },
      {
        src: '/maskable_icon.png',
        sizes: '225x225',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    theme_color: '#171717',
    background_color: '#e8ebf2',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    orientation: 'portrait',
  },

  workbox: {
    // The API must never be served from a CacheFirst store, or the blog would
    // keep rendering posts from the first response it ever saw.
    navigateFallbackDenylist: [/^\/api\//],
    runtimeCaching: [
      {
        urlPattern: ({url}) =>
          url.origin === self.location.origin && url.pathname.startsWith('/api/'),
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          networkTimeoutSeconds: 5,
          expiration: {maxAgeSeconds: 60 * 60},
        },
      },
      {
        // Only cache same-origin requests (your app assets)
        urlPattern: ({url}) =>
          url.origin === self.location.origin && !url.pathname.startsWith('/api/'),
        handler: 'CacheFirst',
        options: {
          cacheName: 'app-cache',
        },
      },
    ],
  },
};

export default defineConfig(({mode}) => {
  // '' prefix so TURSO_* are loaded too, not just VITE_*. These stay on the
  // server side — the plugin passes them to process.env, never to the client.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), VitePWA(manifestForPlugin), localApi(env)],
  };
});
