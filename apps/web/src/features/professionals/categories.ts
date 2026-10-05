// Mantenha em sincronia com apps/api/.../professional-category.ts.
// Evolução prevista: extrair para um pacote compartilhado (packages/contracts).
export const CATEGORY_LABELS = {
  fotografia: 'Fotografia',
  filmagem: 'Filmagem',
  buffet: 'Buffet',
  'doces-e-bolos': 'Doces e bolos',
  decoracao: 'Decoração',
  'vestidos-e-trajes': 'Vestidos e trajes',
  beleza: 'Beleza',
  'musica-e-dj': 'Música e DJ',
  cerimonial: 'Cerimonial',
  'espaco-de-eventos': 'Espaço de eventos',
  'convites-e-papelaria': 'Convites e papelaria',
  outros: 'Outros',
} as const;

export type Category = keyof typeof CATEGORY_LABELS;

export const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

export function isCategory(value: string): value is Category {
  return value in CATEGORY_LABELS;
}
