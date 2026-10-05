import { z } from 'zod';

/** Validação do formato da requisição HTTP. As regras de negócio ficam no domínio. */
export const registerProfessionalBodySchema = z.object({
  businessName: z.string(),
  category: z.string(),
  shortDescription: z.string(),
  coverImageUrl: z.string().nullish(),
  contacts: z.array(z.object({ channel: z.string(), value: z.string() })),
});

export const listProfessionalsQuerySchema = z.object({
  category: z.string().optional(),
});

export const professionalParamsSchema = z.object({
  id: z.string().min(1),
});
