import type { UseCase } from '../../../shared/application/use-case.js';
import type { ProfessionalStatus } from '../domain/professional.js';
import { ProfessionalNotFoundError } from '../domain/professional-not-found.error.js';
import type { ProfessionalRepository } from '../domain/professional.repository.js';

export interface ApproveProfessionalInput {
  id: string;
}

export interface ApproveProfessionalOutput {
  id: string;
  status: ProfessionalStatus;
}

/** RF19 / HU10: o administrador aprova o cadastro para o profissional aparecer na vitrine. */
export class ApproveProfessionalUseCase implements UseCase<
  ApproveProfessionalInput,
  ApproveProfessionalOutput
> {
  constructor(private readonly professionals: ProfessionalRepository) {}

  async execute(input: ApproveProfessionalInput): Promise<ApproveProfessionalOutput> {
    const professional = await this.professionals.findById(input.id);
    if (!professional) {
      throw new ProfessionalNotFoundError(input.id);
    }

    professional.approve();
    await this.professionals.save(professional);

    return { id: professional.id, status: professional.status };
  }
}
