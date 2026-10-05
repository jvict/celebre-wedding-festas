import { STEPS } from '../home-content';
import { Container } from '@/shared/ui/container';

export function HowItWorks() {
  return (
    <section id="como" className="scroll-mt-20">
      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="mb-16 flex max-w-[680px] flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Como funciona</p>
          <h2 className="font-display text-[clamp(34px,4vw,56px)] font-normal leading-[1.05] tracking-[-0.02em] text-balance">
            Do primeiro olhar ao guia de contatos
          </h2>
        </div>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-12 lg:gap-16">
          {STEPS.map((step) => (
            <li key={step.n} className="flex flex-col gap-4 border-t border-ink pt-7">
              <span className="font-display text-[56px] italic leading-none text-gold-soft">
                {step.n}
              </span>
              <h3 className="font-display text-[28px]">{step.title}</h3>
              <p className="leading-relaxed text-muted text-pretty">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
