/** Porta para geração de identificadores (permite IDs fixos nos testes). */
export interface IdGenerator {
  generate(): string;
}
