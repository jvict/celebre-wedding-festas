import { PRIVACY_PROMISES } from '../home-content';
import { Container } from '@/shared/ui/container';

export function PrivacySection() {
  return (
    <section id="privacidade" className="scroll-mt-20 bg-ink text-cream">
      <Container className="grid items-start gap-14 py-16 sm:py-24 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-[0.28em] text-gold-light">Privacidade · LGPD</p>
          <h2 className="font-display text-[clamp(38px,4.6vw,64px)] font-normal leading-[1.02] tracking-[-0.02em]">
            Seus dados ficam <em className="text-gold-light">com você</em>
          </h2>
          <p className="max-w-[480px] text-[17px] font-light leading-[1.7] text-[#d9cfbf]">
            Profissionais nunca recebem a lista de inscritas nem seus dados pessoais. A comunicação
            pós-evento vai em uma só direção: do profissional para você.
          </p>
        </div>
        <ul className="flex flex-col">
          {PRIVACY_PROMISES.map((promise) => (
            <li key={promise} className="flex items-start gap-5 border-b border-line-dark py-6">
              <span aria-hidden className="mt-[9px] size-2 shrink-0 rotate-45 bg-gold-light" />
              <span className="text-[17px] leading-snug">{promise}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
