/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL of the separate blog app. Falls back to localhost in development. */
  readonly VITE_BLOG_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
