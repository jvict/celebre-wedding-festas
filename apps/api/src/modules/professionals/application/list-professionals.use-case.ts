import type { UseCase } from '../../../shared/application/use-case.js';
import { ValidationError } from '../../../shared/domain/domain-error.js';
import type { ContactChannel } from '../domain/public-contact.js';
import type { ProfessionalCategory } from '../domain/professional-category.js';
import { isProfessionalCategory } from '../domain/professional-category.js';
import type { ProfessionalRepository } from '../domain/professional.repository.js';

export interface ListProfessionalsInput {
  category?: string | undefined;
}

/** Visão pública do profissional: só o que a vitrine pode exibir (RF05). */
export interface ProfessionalListItem {
  id: string;
  businessName: string;
  category: ProfessionalCategory;
  shortDescription: string;
  coverImageUrl: string | null;
  contacts: { channel: ContactChannel; value: string }[];
}

/** RF05 / HU02 / HU03: vitrine de profissionais aprovados, com filtro por categoria. */
export class ListProfessionalsUseCase implements UseCase<
  ListProfessionalsInput,
  ProfessionalListItem[]
> {
  constructor(private readonly professionals: ProfessionalRepository) {}

  async execute(input: ListProfessionalsInput): Promise<ProfessionalListItem[]> {
    if (input.category !== undefined && !isProfessionalCategory(input.category)) {
      throw new ValidationError(`Categoria inválida: ${input.category}.`);
    }

    const found = await this.professionals.findApproved({ category: input.category });

    return found.map((professional) => {
      const snapshot = professional.toSnapshot();
      return {
        id: snapshot.id,
        businessName: snapshot.businessName,
        category: snapshot.category,
        shortDescription: snapshot.shortDescription,
        coverImageUrl: snapshot.coverImageUrl,
        contacts: snapshot.contacts.map((c) => ({ channel: c.channel, value: c.value })),
      };
    });
  }
}
