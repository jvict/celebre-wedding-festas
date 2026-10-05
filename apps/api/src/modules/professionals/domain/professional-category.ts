export const PROFESSIONAL_CATEGORIES = [
  'fotografia',
  'filmagem',
  'buffet',
  'doces-e-bolos',
  'decoracao',
  'vestidos-e-trajes',
  'beleza',
  'musica-e-dj',
  'cerimonial',
  'espaco-de-eventos',
  'convites-e-papelaria',
  'outros',
] as const;

export type ProfessionalCategory = (typeof PROFESSIONAL_CATEGORIES)[number];

export function isProfessionalCategory(value: string): value is ProfessionalCategory {
  return (PROFESSIONAL_CATEGORIES as readonly string[]).includes(value);
}
