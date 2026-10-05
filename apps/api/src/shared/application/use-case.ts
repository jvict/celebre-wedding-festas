/** Contrato de todo caso de uso: uma única responsabilidade, uma única entrada pública. */
export interface UseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}
