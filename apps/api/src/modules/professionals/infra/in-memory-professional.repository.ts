import { Professional, type ProfessionalSnapshot } from '../domain/professional.js';
import type {
  ProfessionalFilters,
  ProfessionalRepository,
} from '../domain/professional.repository.js';

/** Implementação em memória: usada nos testes e para desenvolver sem banco. */
export class InMemoryProfessionalRepository implements ProfessionalRepository {
  private readonly items = new Map<string, ProfessionalSnapshot>();

  async save(professional: Professional): Promise<void> {
    this.items.set(professional.id, professional.toSnapshot());
  }

  async findById(id: string): Promise<Professional | null> {
    const snapshot = this.items.get(id);
    return snapshot ? Professional.restore(snapshot) : null;
  }

  async findApproved(filters: ProfessionalFilters = {}): Promise<Professional[]> {
    return [...this.items.values()]
      .filter((item) => item.status === 'approved')
      .filter((item) => !filters.category || item.category === filters.category)
      .sort((a, b) => a.businessName.localeCompare(b.businessName, 'pt-BR'))
      .map((snapshot) => Professional.restore(snapshot));
  }
}
