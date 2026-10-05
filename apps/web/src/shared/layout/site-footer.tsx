import Link from 'next/link';
import { Brand } from '@/shared/ui/brand';
import { Container } from '@/shared/ui/container';

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-cream">
      <Container className="flex flex-wrap items-end justify-between gap-7 py-12">
        <div className="flex flex-col gap-3.5">
          <Brand size="sm" />
          <p className="text-[13px] text-muted">
            Projeto Interdisciplinar II - Fatec - Grupo Eventos Star
          </p>
          <p className="text-[13px] text-muted">
            Seus dados pessoais não são repassados a profissionais (LGPD).
          </p>
        </div>
        <ul className="flex flex-wrap gap-7 text-[13px] tracking-wide">
          <li>
            <Link href="/profissionais" className="hover:text-gold">
              Profissionais
            </Link>
          </li>
          <li>
            <Link href="/#agenda" className="hover:text-gold">
              Agenda
            </Link>
          </li>
          <li>
            <Link href="/#como" className="hover:text-gold">
              Como funciona
            </Link>
          </li>
          <li>
            <Link href="/#privacidade" className="hover:text-gold">
              Privacidade
            </Link>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
