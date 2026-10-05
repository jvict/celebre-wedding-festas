import Link from 'next/link';

export function Brand({ size = 'md' }: { size?: 'md' | 'sm' }) {
  return (
    <Link href="/" className="flex flex-col leading-none" aria-label="Celebre Wedding & Festas">
      <span
        className={`font-display italic tracking-tight ${size === 'md' ? 'text-[28px]' : 'text-[26px]'}`}
      >
        Celebre
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.32em] text-muted">
        Wedding &amp; Festas
      </span>
    </Link>
  );
}
