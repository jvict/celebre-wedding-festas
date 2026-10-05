import type { Professional } from './professional.js';
import type { ProfessionalCategory } from './professional-category.js';

export interface ProfessionalFilters {
  category?: ProfessionalCategory | undefined;
}

/**
 * Porta de persistência. O domínio define o contrato;
 * a infraestrutura (memória, Prisma) fornece a implementação.
 */
export interface ProfessionalRepository {
  save(professional: Professional): Promise<void>;
  findById(id: string): Promise<Professional | null>;
  /** Somente profissionais aprovados, ordenados por nome. */
  findApproved(filters?: ProfessionalFilters): Promise<Professional[]>;
}
