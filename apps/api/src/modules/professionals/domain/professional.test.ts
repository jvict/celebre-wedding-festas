import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { ValidationError } from '../../../shared/domain/domain-error.js';
import { Professional, type CreateProfessionalInput } from './professional.js';

function validInput(overrides: Partial<CreateProfessionalInput> = {}): CreateProfessionalInput {
  return {
    id: 'p-1',
    businessName: 'Ateliê Rosa & Ouro',
    category: 'decoracao',
    shortDescription: 'Decoração completa para casamentos e debutantes.',
    contacts: [{ channel: 'whatsapp', value: '(11) 99999-0000' }],
    createdAt: new Date('2026-10-05T12:00:00Z'),
    ...overrides,
  };
}

describe('Professional', () => {
  it('nasce pendente e fora da vitrine (RF19)', () => {
    const professional = Professional.create(validInput());

    assert.equal(professional.status, 'pending');
    assert.equal(professional.isVisibleInCatalog(), false);
  });

  it('aparece na vitrine depois de aprovado', () => {
    const professional = Professional.create(validInput());

    professional.approve();

    assert.equal(professional.isVisibleInCatalog(), true);
  });

  it('normaliza o WhatsApp para apenas dígitos', () => {
    const snapshot = Professional.create(validInput()).toSnapshot();

    assert.equal(snapshot.contacts[0]?.value, '11999990000');
  });

  it('exige pelo menos um canal de contato público (RF05)', () => {
    assert.throws(() => Professional.create(validInput({ contacts: [] })), ValidationError);
  });

  it('rejeita categoria inexistente', () => {
    assert.throws(() => Professional.create(validInput({ category: 'magia' })), ValidationError);
  });

  it('rejeita descrição curta demais', () => {
    assert.throws(
      () => Professional.create(validInput({ shortDescription: 'curta' })),
      ValidationError,
    );
  });

  it('rejeita e-mail de contato inválido', () => {
    assert.throws(
      () =>
        Professional.create(validInput({ contacts: [{ channel: 'email', value: 'sem-arroba' }] })),
      ValidationError,
    );
  });

  it('rejeita foto de capa que não seja URL http(s)', () => {
    assert.throws(
      () => Professional.create(validInput({ coverImageUrl: 'arquivo-local.png' })),
      ValidationError,
    );
  });
});
