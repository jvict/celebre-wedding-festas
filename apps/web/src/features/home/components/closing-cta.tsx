import { ButtonLink } from '@/shared/ui/button-link';
import { Container } from '@/shared/ui/container';

export function ClosingCta() {
  return (
    <Container className="flex flex-col items-center gap-7 py-20 text-center sm:py-28 lg:py-32">
      <span aria-hidden className="size-[9px] rotate-45 bg-gold-soft" />
      <h2 className="max-w-[820px] font-display text-[clamp(34px,4.4vw,60px)] font-normal leading-[1.08] tracking-[-0.02em] text-balance">
        Seu grande dia começa com <em className="text-gold">as pessoas certas</em>
      </h2>
      <ButtonLink href="/#agenda">Ver próximos encontros</ButtonLink>
    </Container>
  );
}
