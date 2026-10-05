export type DomainErrorCode = 'VALIDATION' | 'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN';

/**
 * Erro de regra de negócio. Não conhece HTTP: a camada de apresentação
 * decide como traduzir cada `code` (ex.: NOT_FOUND -> 404).
 */
export class DomainError extends Error {
  readonly code: DomainErrorCode;

  constructor(message: string, code: DomainErrorCode) {
    super(message);
    this.name = new.target.name;
    this.code = code;
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message, 'VALIDATION');
  }
}

export class NotFoundError extends DomainError {
  constructor(message: string) {
    super(message, 'NOT_FOUND');
  }
}
