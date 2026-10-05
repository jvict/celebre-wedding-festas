import type { PrismaClient, ProfessionalRecord } from '@prisma/client';
import { Professional } from '../domain/professional.js';
import type { ProfessionalCategory } from '../domain/professional-category.js';
import { PublicContact } from '../domain/public-contact.js';
import type {
  ProfessionalFilters,
  ProfessionalRepository,
} from '../domain/professional.repository.js';

interface StoredContact {
  channel: string;
  value: string;
}

/** Implementação com PostgreSQL via Prisma. Converte entre linha do banco e entidade. */
export class PrismaProfessionalRepository implements ProfessionalRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(professional: Professional): Promise<void> {
    const snapshot = professional.toSnapshot();
    const data = {
      businessName: snapshot.businessName,
      category: snapshot.category,
      shortDescription: snapshot.shortDescription,
      coverImageUrl: snapshot.coverImageUrl,
      contacts: snapshot.contacts.map((c) => ({ channel: c.channel, value: c.value })),
      status: snapshot.status,
      createdAt: snapshot.createdAt,
    };

    await this.prisma.professionalRecord.upsert({
      where: { id: snapshot.id },
      create: { id: snapshot.id, ...data },
      update: data,
    });
  }

  async findById(id: string): Promise<Professional | null> {
    const row = await this.prisma.professionalRecord.findUnique({ where: { id } });
    return row ? toDomain(row) : null;
  }

  async findApproved(filters: ProfessionalFilters = {}): Promise<Professional[]> {
    const rows = await this.prisma.professionalRecord.findMany({
      where: {
        status: 'approved',
        ...(filters.category ? { category: filters.category } : {}),
      },
      orderBy: { businessName: 'asc' },
    });
    return rows.map(toDomain);
  }
}

function toDomain(row: ProfessionalRecord): Professional {
  const stored = row.contacts as unknown as StoredContact[];

  return Professional.restore({
    id: row.id,
    businessName: row.businessName,
    category: row.category as ProfessionalCategory,
    shortDescription: row.shortDescription,
    coverImageUrl: row.coverImageUrl,
    contacts: stored.map((c) => PublicContact.create(c.channel, c.value)),
    status: row.status,
    createdAt: row.createdAt,
  });
}
