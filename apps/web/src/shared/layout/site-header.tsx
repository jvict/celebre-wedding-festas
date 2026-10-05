import Link from 'next/link';
import { Brand } from '@/shared/ui/brand';
import { Container } from '@/shared/ui/container';

// "Entrar" e "Sou profissional" entram com os módulos identity e professionals (Sprints 1 e 2).
const NAV_LINKS = [
  { href: '/profissionais', label: 'Profissionais' },
  { href: '/#agenda', label: 'Agenda' },
  { href: '/#como', label: 'Como funciona' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-cream/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-6 py-[18px]">
        <Brand />

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-9 text-sm tracking-wide">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="py-1.5 hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <details className="group relative md:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center px-1 text-xs uppercase tracking-[0.18em] [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">Fechar</span>
          </summary>
          <ul className="absolute right-0 top-full mt-[18px] w-[min(86vw,320px)] border border-line bg-panel px-5 py-2 shadow-[0_20px_40px_-24px_rgba(35,30,24,0.35)]">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-line last:border-b-0">
                <Link href={link.href} className="block py-4 font-display text-[22px]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </Container>
    </header>
  );
}
