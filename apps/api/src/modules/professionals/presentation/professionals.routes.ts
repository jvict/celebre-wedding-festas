import type { FastifyPluginAsync } from 'fastify';
import type { ApproveProfessionalUseCase } from '../application/approve-professional.use-case.js';
import type { ListProfessionalsUseCase } from '../application/list-professionals.use-case.js';
import type { RegisterProfessionalUseCase } from '../application/register-professional.use-case.js';
import {
  listProfessionalsQuerySchema,
  professionalParamsSchema,
  registerProfessionalBodySchema,
} from './professionals.schemas.js';

export interface ProfessionalsUseCases {
  register: RegisterProfessionalUseCase;
  list: ListProfessionalsUseCase;
  approve: ApproveProfessionalUseCase;
}

/** Adaptador HTTP: traduz requisição -> caso de uso -> resposta. Sem regra de negócio. */
export function createProfessionalsRoutes(useCases: ProfessionalsUseCases): FastifyPluginAsync {
  return async (app) => {
    app.post('/professionals', async (request, reply) => {
      const body = registerProfessionalBodySchema.parse(request.body);
      const output = await useCases.register.execute(body);
      return reply.status(201).send(output);
    });

    app.get('/professionals', async (request) => {
      const query = listProfessionalsQuerySchema.parse(request.query);
      return useCases.list.execute(query);
    });

    // ATENÇÃO: exige perfil Administrador. Proteger quando o módulo "identity" (RF16) existir.
    app.patch('/professionals/:id/approve', async (request) => {
      const params = professionalParamsSchema.parse(request.params);
      return useCases.approve.execute({ id: params.id });
    });
  };
}
