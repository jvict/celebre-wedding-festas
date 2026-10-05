import Image from 'next/image';
import Link from 'next/link';
import { HOME_CATEGORIES } from '../home-content';
import { Container } from '@/shared/ui/container';

export function CategoryGrid() {
  return (
    <Container className="py-16 sm:py-24 lg:py-28">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-[clamp(34px,4vw,56px)] font-normal tracking-[-0.02em]">
          Explore por categoria
        </h2>
        <Link
          href="/profissionais"
          className="border-b border-ink pb-1 text-[13px] uppercase tracking-[0.14em] hover:border-gold hover:text-gold"
        >
          Ver todos os profissionais
        </Link>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-4 sm:gap-7">
        {HOME_CATEGORIES.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/profissionais?categoria=${category.slug}`}
              className="group flex flex-col gap-3.5"
            >
              <span className="relative block aspect-square overflow-hidden bg-sand">
                <Image
                  src={category.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-opacity group-hover:opacity-85"
                />
              </span>
              <span className="font-display text-[22px]">{category.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
