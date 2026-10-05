import type { FastifyPluginAsync } from 'fastify';
import type { Clock } from '../../shared/application/clock.js';
import type { IdGenerator } from '../../shared/application/id-generator.js';
import { ApproveProfessionalUseCase } from './application/approve-professional.use-case.js';
import { ListProfessionalsUseCase } from './application/list-professionals.use-case.js';
import { RegisterProfessionalUseCase } from './application/register-professional.use-case.js';
import type { ProfessionalRepository } from './domain/professional.repository.js';
import { createProfessionalsRoutes } from './presentation/professionals.routes.js';

export interface ProfessionalsModuleDependencies {
  repository: ProfessionalRepository;
  ids: IdGenerator;
  clock: Clock;
}

/** Monta o módulo: liga casos de uso às suas dependências e expõe as rotas HTTP. */
export function createProfessionalsModule(deps: ProfessionalsModuleDependencies): {
  routes: FastifyPluginAsync;
} {
  const routes = createProfessionalsRoutes({
    register: new RegisterProfessionalUseCase(deps.repository, deps.ids, deps.clock),
    list: new ListProfessionalsUseCase(deps.repository),
    approve: new ApproveProfessionalUseCase(deps.repository),
  });

  return { routes };
}
