import { apiGet, type ApiResult } from '@/shared/lib/api-client';
import type { Category } from './categories';
import type { Professional } from './professional.types';

/** Busca a vitrine na API. Única responsabilidade: falar com o backend sobre profissionais. */
export function fetchProfessionals(category?: Category): Promise<ApiResult<Professional[]>> {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  return apiGet<Professional[]>(`/professionals${query}`);
}
