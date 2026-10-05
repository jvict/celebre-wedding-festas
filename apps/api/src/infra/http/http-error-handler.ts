import type { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { DomainError, type DomainErrorCode } from '../../shared/domain/domain-error.js';

const STATUS_BY_CODE: Record<DomainErrorCode, number> = {
  VALIDATION: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
};

/** Único ponto que traduz erros da aplicação em respostas HTTP. */
export function httpErrorHandler(error: unknown, request: FastifyRequest, reply: FastifyReply) {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error: 'VALIDATION',
      message: 'Dados inválidos.',
      issues: error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  if (error instanceof DomainError) {
    return reply.status(STATUS_BY_CODE[error.code]).send({
      error: error.code,
      message: error.message,
    });
  }

  request.log.error(error);
  return reply.status(500).send({ error: 'INTERNAL', message: 'Erro interno do servidor.' });
}
