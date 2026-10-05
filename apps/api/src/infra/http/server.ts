import Fastify, { type FastifyInstance, type FastifyPluginAsync } from 'fastify';
import { httpErrorHandler } from './http-error-handler.js';

export interface BuildServerOptions {
  /** Rotas de cada módulo, registradas sob o prefixo /api. */
  routes: FastifyPluginAsync[];
  logger?: boolean;
}

export function buildServer({ routes, logger = true }: BuildServerOptions): FastifyInstance {
  const app = Fastify({ logger });

  app.setErrorHandler(httpErrorHandler);
  app.get('/health', async () => ({ status: 'ok' }));

  for (const route of routes) {
    app.register(route, { prefix: '/api' });
  }

  return app;
}
