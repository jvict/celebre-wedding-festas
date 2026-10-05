import Link from 'next/link';
import { CATEGORIES, CATEGORY_LABELS, type Category } from '../categories';

interface CategoryFilterProps {
  selected: Category | undefined;
}

const baseClass =
  'inline-block rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline';

export function CategoryFilter({ selected }: CategoryFilterProps) {
  return (
    <nav aria-label="Filtrar por categoria">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/profissionais"
            aria-current={selected === undefined ? 'page' : undefined}
            className={`${baseClass} ${
              selected === undefined
                ? 'border-ink bg-ink text-white'
                : 'border-line bg-white text-ink hover:border-ink'
            }`}
          >
            Todas
          </Link>
        </li>
        {CATEGORIES.map((category) => (
          <li key={category}>
            <Link
              href={`/profissionais?categoria=${category}`}
              aria-current={selected === category ? 'page' : undefined}
              className={`${baseClass} ${
                selected === category
                  ? 'border-ink bg-ink text-white'
                  : 'border-line bg-white text-ink hover:border-ink'
              }`}
            >
              {CATEGORY_LABELS[category]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
