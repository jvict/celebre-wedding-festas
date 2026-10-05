import { z } from 'zod';

const envSchema = z
  .object({
    PORT: z.coerce.number().int().positive().default(3333),
    HOST: z.string().default('0.0.0.0'),
    PERSISTENCE: z.enum(['memory', 'prisma']).default('memory'),
    DATABASE_URL: z.string().optional(),
  })
  .refine((env) => env.PERSISTENCE !== 'prisma' || Boolean(env.DATABASE_URL), {
    message: 'DATABASE_URL é obrigatória quando PERSISTENCE=prisma.',
    path: ['DATABASE_URL'],
  });

export type Env = z.infer<typeof envSchema>;

/** Lê o arquivo .env (se existir) e valida as variáveis de ambiente. */
export function loadEnv(source: NodeJS.ProcessEnv = process.env): Env {
  try {
    process.loadEnvFile();
  } catch {
    // Sem .env: usa apenas as variáveis já definidas no ambiente.
  }
  return envSchema.parse(source);
}
