// DADOS DE EXEMPLO do protótipo de design. Serão substituídos pela API quando o
// módulo `events` existir (Sprint 3). Não representam eventos reais.
export interface SampleEvent {
  id: string;
  day: string;
  month: string;
  title: string;
  place: string;
  time: string;
}

export const SAMPLE_EVENTS: SampleEvent[] = [
  {
    id: 'encontro-de-noivas',
    day: '18',
    month: 'OUT',
    title: 'Encontro de Noivas — Primavera',
    place: 'Villa Jardim, São Paulo',
    time: '14h às 19h',
  },
  {
    id: 'noite-das-debutantes',
    day: '08',
    month: 'NOV',
    title: 'Noite das Debutantes',
    place: 'Espaço Aurora, Santo André',
    time: '18h às 22h',
  },
  {
    id: 'feira-de-verao',
    day: '06',
    month: 'DEZ',
    title: 'Feira Celebre de Verão',
    place: 'Casa Mirante, São Paulo',
    time: '11h às 18h',
  },
];
