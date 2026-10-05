/** Porta para o relógio (permite datas fixas nos testes). */
export interface Clock {
  now(): Date;
}
