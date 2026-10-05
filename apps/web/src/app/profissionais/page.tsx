import type { Metadata } from 'next';
import { CategoryFilter } from '@/features/professionals/components/category-filter';
import { ProfessionalCard } from '@/features/professionals/components/professional-card';
import { isCategory } from '@/features/professionals/categories';
import { fetchProfessionals } from '@/features/professionals/professionals.service';
import { Container } from '@/shared/ui/container';

export const metadata: Metadata = { title: 'Profissionais' };

interface ProfessionalsPageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function ProfessionalsPage({ searchParams }: ProfessionalsPageProps) {
  const { categoria } = await searchParams;
  const category = categoria && isCategory(categoria) ? categoria : undefined;

  const result = await fetchProfessionals(category);

  return (
    <Container className="py-12">
      <h1 className="font-display text-3xl sm:text-4xl">Profissionais</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Fornecedores aprovados para casamentos, debutantes e outros eventos.
      </p>

      <div className="mt-8">
        <CategoryFilter selected={category} />
      </div>

      {result.ok ? (
        result.data.length > 0 ? (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {result.data.map((professional) => (
              <li key={professional.id}>
                <ProfessionalCard professional={professional} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-muted">Nenhum profissional encontrado nesta categoria.</p>
        )
      ) : (
        <p role="alert" className="mt-8 text-gold">
          Não foi possível carregar os profissionais agora. Tente novamente em instantes.
        </p>
      )}
    </Container>
  );
}
