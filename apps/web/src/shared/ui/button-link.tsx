import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'solid' | 'outline' | 'light';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
}

const base =
  'inline-block px-7 py-4 text-xs font-medium uppercase tracking-[0.18em] transition-colors';

const variants: Record<Variant, string> = {
  solid: 'bg-ink text-cream hover:bg-gold',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-cream',
  light: 'bg-cream text-ink hover:bg-gold-light',
};

export function ButtonLink({ href, children, variant = 'solid' }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
