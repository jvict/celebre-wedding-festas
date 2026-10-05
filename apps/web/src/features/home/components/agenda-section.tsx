import { SAMPLE_EVENTS } from '@/features/events/sample-events';
import { Container } from '@/shared/ui/container';

export function AgendaSection() {
  return (
    <section id="agenda" className="scroll-mt-20 border-y border-line bg-panel">
      <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col gap-5">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Agenda</p>
          <h2 className="font-display text-[clamp(34px,4vw,56px)] font-normal leading-[1.05] tracking-[-0.02em]">
            Próximos encontros
          </h2>
          <p className="max-w-[360px] leading-relaxed text-muted">
            Encontros presenciais com profissionais aprovados pela equipe. A inscrição é gratuita e
            o check-in é feito por QR Code.
          </p>
        </div>
        <ul className="flex flex-col">
          {SAMPLE_EVENTS.map((event) => (
            <li key={event.id} className="flex items-center gap-7 border-b border-line py-6">
              <div className="flex w-14 shrink-0 flex-col items-center leading-none">
                <span className="font-display text-[40px]">{event.day}</span>
                <span className="mt-1.5 text-[11px] tracking-[0.2em] text-muted">
                  {event.month}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="font-display text-[22px]">{event.title}</span>
                <span className="text-sm text-muted">
                  {event.place} · {event.time}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
