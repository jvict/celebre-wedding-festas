const API_URL = process.env.API_URL ?? 'http://localhost:3333';

export type ApiResult<T> = { ok: true; data: T } | { ok: false; status: number | null };

/**
 * Cliente HTTP mínimo para a API. Devolve um resultado em vez de lançar exceção,
 * para a página decidir como mostrar o erro.
 */
export async function apiGet<T>(path: string): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${API_URL}/api${path}`, { cache: 'no-store' });
    if (!response.ok) {
      return { ok: false, status: response.status };
    }
    return { ok: true, data: (await response.json()) as T };
  } catch {
    return { ok: false, status: null };
  }
}
