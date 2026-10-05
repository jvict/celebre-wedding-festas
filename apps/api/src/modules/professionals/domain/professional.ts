import { ValidationError } from '../../../shared/domain/domain-error.js';
import { isProfessionalCategory, type ProfessionalCategory } from './professional-category.js';
import { PublicContact, isHttpUrl } from './public-contact.js';

export type ProfessionalStatus = 'pending' | 'approved' | 'rejected';

export interface ProfessionalSnapshot {
  id: string;
  businessName: string;
  category: ProfessionalCategory;
  shortDescription: string;
  coverImageUrl: string | null;
  contacts: PublicContact[];
  status: ProfessionalStatus;
  createdAt: Date;
}

export interface CreateProfessionalInput {
  id: string;
  businessName: string;
  category: string;
  shortDescription: string;
  coverImageUrl?: string | null | undefined;
  contacts: { channel: string; value: string }[];
  createdAt: Date;
}

const MAX_CONTACTS = 5;

/**
 * Profissional/expositor que divulga produtos e serviços na vitrine (RF02 a RF06).
 * Todo cadastro nasce "pending" e só aparece na vitrine depois de aprovado (RF19).
 */
export class Professional {
  private constructor(private props: ProfessionalSnapshot) {}

  static create(input: CreateProfessionalInput): Professional {
    const businessName = input.businessName.trim();
    if (businessName.length < 2 || businessName.length > 120) {
      throw new ValidationError('O nome/razão social deve ter entre 2 e 120 caracteres.');
    }

    if (!isProfessionalCategory(input.category)) {
      throw new ValidationError(`Categoria inválida: ${input.category}.`);
    }

    const shortDescription = input.shortDescription.trim();
    if (shortDescription.length < 10 || shortDescription.length > 280) {
      throw new ValidationError('A descrição curta deve ter entre 10 e 280 caracteres.');
    }

    const coverImageUrl = input.coverImageUrl?.trim() || null;
    if (coverImageUrl !== null && !isHttpUrl(coverImageUrl)) {
      throw new ValidationError('A foto de capa deve ser uma URL http(s) válida.');
    }

    if (input.contacts.length === 0) {
      throw new ValidationError('Informe pelo menos um canal de contato público.');
    }
    if (input.contacts.length > MAX_CONTACTS) {
      throw new ValidationError(`Informe no máximo ${MAX_CONTACTS} canais de contato.`);
    }
    const contacts = input.contacts.map((c) => PublicContact.create(c.channel, c.value));

    return new Professional({
      id: input.id,
      businessName,
      category: input.category,
      shortDescription,
      coverImageUrl,
      contacts,
      status: 'pending',
      createdAt: input.createdAt,
    });
  }

  /** Reconstrói a entidade a partir de dados já validados (vindos do banco). */
  static restore(snapshot: ProfessionalSnapshot): Professional {
    return new Professional({ ...snapshot, contacts: [...snapshot.contacts] });
  }

  get id(): string {
    return this.props.id;
  }

  get status(): ProfessionalStatus {
    return this.props.status;
  }

  isVisibleInCatalog(): boolean {
    return this.props.status === 'approved';
  }

  approve(): void {
    this.props.status = 'approved';
  }

  reject(): void {
    this.props.status = 'rejected';
  }

  toSnapshot(): ProfessionalSnapshot {
    return { ...this.props, contacts: [...this.props.contacts] };
  }
}
