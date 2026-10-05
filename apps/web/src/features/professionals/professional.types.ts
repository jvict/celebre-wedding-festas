import type { Category } from './categories';

export type ContactChannel = 'whatsapp' | 'instagram' | 'email' | 'site';

/** Formato devolvido por GET /api/professionals. */
export interface Professional {
  id: string;
  businessName: string;
  category: Category;
  shortDescription: string;
  coverImageUrl: string | null;
  contacts: { channel: ContactChannel; value: string }[];
}
