import Image from 'next/image';
import Link from 'next/link';
import { SAMPLE_EVENTS } from '@/features/events/sample-events';
import { ButtonLink } from '@/shared/ui/button-link';
import { Container } from '@/shared/ui/container';

export function Hero() {
  const next = SAMPLE_EVENTS[0];

  return (
    <Container className="grid items-center gap-10 py-10 sm:py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
      <div className="flex flex-col gap-7">
        <p className="text-xs uppercase tracking-[0.28em] text-gold">Casamentos e debutantes</p>
        <h1 className="font-display text-[clamp(46px,6.4vw,92px)] font-normal leading-[0.98] tracking-[-0.025em] text-balance">
          Encontre quem faz <em className="text-gold">a sua festa</em> acontecer
        </h1>
        <p className="max-w-[480px] text-lg font-light leading-relaxed text-muted text-pretty">
          Conheça profissionais de eventos em um só lugar, inscreva-se nos encontros e confirme sua
          presença. Você conversa direto com quem escolher, sem intermediários.
        </p>
        <div className="mt-1 flex flex-wrap gap-3">
          <ButtonLink href="/profissionais">Ver profissionais</ButtonLink>
          <ButtonLink href="/#como" variant="outline">
            Como funciona
          </ButtonLink>
        </div>
        <div className="mt-5 flex max-w-[480px] items-start gap-4 border-t border-line pt-6">
          <span aria-hidden className="mt-2 size-[7px] shrink-0 rotate-45 bg-gold-soft" />
          <div className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.24em] text-gold">
              Guia pós-evento
            </span>
            <span className="text-[15px] text-muted">
              Depois da festa, você recebe os contatos de quem participou.
            </span>
          </div>
        </div>
      </div>

      <div className="relative pb-10">
        <div className="relative aspect-[4/5] bg-sand">
          <Image
            src="/images/home/hero.jpg"
            alt="Casal em cerimônia de casamento"
            fill
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </div>
        <Link
          href="/#agenda"
          className="absolute bottom-0 left-4 flex items-center gap-5 border border-line bg-panel px-6 py-5 shadow-[0_20px_40px_-24px_rgba(35,30,24,0.35)] transition-colors hover:border-gold-soft lg:-left-10"
        >
          <span className="flex flex-col items-center border-r border-line pr-5 leading-none">
            <span className="font-display text-[38px]">{next.day}</span>
            <span className="mt-1.5 text-[11px] tracking-[0.2em] text-muted">{next.month}</span>
          </span>
          <span className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-[0.22em] text-gold">
              Próximo encontro
            </span>
            <span className="font-display text-[19px]">{next.title}</span>
            <span className="text-[13px] text-muted">{next.place}</span>
          </span>
        </Link>
      </div>
    </Container>
  );
}
