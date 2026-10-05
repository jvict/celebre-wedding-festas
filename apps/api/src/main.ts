import { loadEnv, type Env } from './config/env.js';
import { buildServer } from './infra/http/server.js';
import {
  InMemoryProfessionalRepository,
  PrismaProfessionalRepository,
  createProfessionalsModule,
  type ProfessionalRepository,
} from './modules/professionals/index.js';
import { CryptoIdGenerator } from './shared/infra/crypto-id-generator.js';
import { SystemClock } from './shared/infra/system-clock.js';

/**
 * Composition root: o único lugar que conhece as implementações concretas
 * e as liga às interfaces (Inversão de Dependência).
 */
async function createProfessionalRepository(
  env: Env,
): Promise<{ repository: ProfessionalRepository; close: () => Promise<void> }> {
  if (env.PERSISTENCE === 'prisma') {
    // Import dinâmico: o modo "memory" funciona sem o Prisma Client gerado.
    const { createPrismaClient } = await import('./infra/prisma/create-prisma-client.js');
    const prisma = createPrismaClient();
    return {
      repository: new PrismaProfessionalRepository(prisma),
      close: () => prisma.$disconnect(),
    };
  }

  return { repository: new InMemoryProfessionalRepository(), close: async () => {} };
}

async function bootstrap(): Promise<void> {
  const env = loadEnv();
  const { repository, close } = await createProfessionalRepository(env);

  const professionals = createProfessionalsModule({
    repository,
    ids: new CryptoIdGenerator(),
    clock: new SystemClock(),
  });

  const app = buildServer({ routes: [professionals.routes] });

  const shutdown = async (): Promise<void> => {
    await app.close();
    await close();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  await app.listen({ port: env.PORT, host: env.HOST });
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
