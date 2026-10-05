import { NotFoundError } from '../../../shared/domain/domain-error.js';

export class ProfessionalNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Profissional ${id} não encontrado.`);
  }
}
