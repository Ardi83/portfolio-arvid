export const projects = [
  {
    id: 'netmart',
    name: 'netmart',
    tagline: 'Multi-tenant SaaS platform',
    url: 'https://arvidn.dev',
    description:
      'A Turborepo monorepo holding a NestJS API, Next.js front-ends, a visual site builder and a public site renderer, sharing typed packages. Each app deploys independently, with per-package build caching so touching one never rebuilds the others.',
    stack: ['NestJS', 'Next.js', 'TypeScript', 'GraphQL', 'PostgreSQL', 'Turborepo'],
  },
  {
    id: 'payment-service',
    name: 'Payment service',
    tagline: 'Centralised payments for multiple apps',
    url: 'https://payment-service.arvidn.dev',
    docsUrl: 'https://payment-service.arvidn.dev/docs',
    description:
      'One payment service several products can share, rather than reimplementing checkout each time. Prisma over PostgreSQL, RabbitMQ for event delivery, rate limiting, scheduled reconciliation jobs and an admin UI.',
    stack: ['NestJS', 'Prisma', 'PostgreSQL', 'RabbitMQ', 'Swagger', 'Docker'],
  },
  {
    id: 'storage',
    name: 'Storage service',
    tagline: 'S3-backed object storage API',
    url: 'https://storage.arvidn.dev',
    docsUrl: 'https://storage.arvidn.dev/docs',
    description:
      'An object storage API over S3 with presigned upload and download URLs, so large files never pass through the application server. JWT authentication, a typed client and a documented surface.',
    stack: ['NestJS', 'AWS S3', 'JWT', 'Swagger', 'Docker'],
  },
  {
    id: 'mail-service',
    name: 'Mail service',
    tagline: 'Standalone transactional email',
    url: 'https://mail-service.arvidn.dev',
    description:
      'A Fastify microservice that takes email off the critical path: multi-provider delivery with failover, a persistent queue with retries, templating, and an admin UI for inspecting what was sent and what bounced.',
    stack: ['Fastify', 'TypeScript', 'Prisma', 'Docker'],
  },
  {
    id: 'clubcart',
    name: 'clubcart',
    tagline: 'Membership & coupon platform',
    url: 'https://clubcart.arvidn.dev',
    description:
      'A membership platform where stores publish offers and members redeem them. Stripe payments, Argon2 password hashing, an admin CRUD layer with Excel import/export, and Dockerised infrastructure.',
    stack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Radix UI', 'Docker'],
  },
];
