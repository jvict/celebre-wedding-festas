// API pública do módulo "professionals". Outros módulos só podem importar por aqui.
export { createProfessionalsModule } from './professionals.module.js';
export type { ProfessionalsModuleDependencies } from './professionals.module.js';
export { InMemoryProfessionalRepository } from './infra/in-memory-professional.repository.js';
export { PrismaProfessionalRepository } from './infra/prisma-professional.repository.js';
export type { ProfessionalRepository } from './domain/professional.repository.js';
