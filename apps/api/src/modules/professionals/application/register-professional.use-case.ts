import type { Clock } from '../../../shared/application/clock.js';
import type { IdGenerator } from '../../../shared/application/id-generator.js';
import type { UseCase } from '../../../shared/application/use-case.js';
import { Professional, type ProfessionalStatus } from '../domain/professional.js';
import type { ProfessionalRepository } from '../domain/professional.repository.js';

export interface RegisterProfessionalInput {
  businessName: string;
  category: string;
  shortDescription: string;
  coverImageUrl?: string | null | undefined;
  contacts: { channel: string; value: string }[];
}

export interface RegisterProfessionalOutput {
  id: string;
  status: ProfessionalStatus;
}

/** RF02: cadastro de profissional (fica pendente até a aprovação do administrador). */
export class RegisterProfessionalUseCase implements UseCase<
  RegisterProfessionalInput,
  RegisterProfessionalOutput
> {
  constructor(
    private readonly professionals: ProfessionalRepository,
    private readonly ids: IdGenerator,
    private readonly clock: Clock,
  ) {}

  async execute(input: RegisterProfessionalInput): Promise<RegisterProfessionalOutput> {
    const professional = Professional.create({
      ...input,
      id: this.ids.generate(),
      createdAt: this.clock.now(),
    });

    await this.professionals.save(professional);

    return { id: professional.id, status: professional.status };
  }
}
