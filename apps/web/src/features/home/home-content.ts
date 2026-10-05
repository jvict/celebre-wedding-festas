import type { Category } from '@/features/professionals/categories';
import { CATEGORY_LABELS } from '@/features/professionals/categories';

export interface HomeCategory {
  slug: Category;
  label: string;
  image: string;
}

const HOME_CATEGORY_SLUGS: Category[] = [
  'fotografia',
  'buffet',
  'decoracao',
  'musica-e-dj',
  'vestidos-e-trajes',
  'cerimonial',
  'beleza',
  'espaco-de-eventos',
];

export const HOME_CATEGORIES: HomeCategory[] = HOME_CATEGORY_SLUGS.map((slug) => ({
  slug,
  label: CATEGORY_LABELS[slug],
  image: `/images/home/${slug}.jpg`,
}));

export const STEPS = [
  {
    n: '01',
    title: 'Descubra',
    text: 'Navegue pela vitrine, filtre por categoria e veja produtos, serviços e canais de contato de cada profissional.',
  },
  {
    n: '02',
    title: 'Participe',
    text: 'Inscreva-se nos eventos, aceite o termo de uso de dados e confirme presença. No dia, o check-in é por QR Code.',
  },
  {
    n: '03',
    title: 'Receba o guia',
    text: 'Depois do evento, você recebe um agradecimento e o guia com os contatos dos profissionais que participaram.',
  },
];

export const PRIVACY_PROMISES = [
  'Seus dados não são compartilhados com profissionais.',
  'Você decide com quem conversar, sem intermediação.',
  'Consentimento registrado na inscrição, em conformidade com a LGPD.',
];
