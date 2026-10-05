import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import type { Clock } from '../../../shared/application/clock.js';
import type { IdGenerator } from '../../../shared/application/id-generator.js';
import { ValidationError } from '../../../shared/domain/domain-error.js';
import { ProfessionalNotFoundError } from '../domain/professional-not-found.error.js';
import { InMemoryProfessionalRepository } from '../infra/in-memory-professional.repository.js';
import { ApproveProfessionalUseCase } from './approve-professional.use-case.js';
import { ListProfessionalsUseCase } from './list-professionals.use-case.js';
import {
  RegisterProfessionalUseCase,
  type RegisterProfessionalInput,
} from './register-professional.use-case.js';

class SequentialIds implements IdGenerator {
  private next = 1;
  generate(): string {
    return `id-${this.next++}`;
  }
}

const fixedClock: Clock = { now: () => new Date('2026-10-05T12:00:00Z') };

function buildInput(overrides: Partial<RegisterProfessionalInput> = {}): RegisterProfessionalInput {
  return {
    businessName: 'Studio Luz',
    category: 'fotografia',
    shortDescription: 'Fotografia de casamentos, debutantes e eventos.',
    contacts: [{ channel: 'instagram', value: '@studioluz' }],
    ...overrides,
  };
}

describe('casos de uso de profissionais', () => {
  let repository: InMemoryProfessionalRepository;
  let register: RegisterProfessionalUseCase;
  let approve: ApproveProfessionalUseCase;
  let list: ListProfessionalsUseCase;

  beforeEach(() => {
    repository = new InMemoryProfessionalRepository();
    register = new RegisterProfessionalUseCase(repository, new SequentialIds(), fixedClock);
    approve = new ApproveProfessionalUseCase(repository);
    list = new ListProfessionalsUseCase(repository);
  });

  it('cadastra o profissional como pendente (RF02)', async () => {
    const output = await register.execute(buildInput());

    assert.deepEqual(output, { id: 'id-1', status: 'pending' });
  });

  it('não mostra na vitrine quem ainda não foi aprovado', async () => {
    await register.execute(buildInput());

    assert.deepEqual(await list.execute({}), []);
  });

  it('mostra na vitrine depois da aprovação (RF19 + RF05)', async () => {
    const { id } = await register.execute(buildInput());
    await approve.execute({ id });

    const items = await list.execute({});

    assert.equal(items.length, 1);
    assert.equal(items[0]?.businessName, 'Studio Luz');
    assert.deepEqual(items[0]?.contacts, [{ channel: 'instagram', value: 'studioluz' }]);
  });

  it('filtra a vitrine por categoria (HU03)', async () => {
    const foto = await register.execute(buildInput());
    const buffet = await register.execute(
      buildInput({ businessName: 'Buffet Sabor', category: 'buffet' }),
    );
    await approve.execute({ id: foto.id });
    await approve.execute({ id: buffet.id });

    const items = await list.execute({ category: 'buffet' });

    assert.deepEqual(
      items.map((item) => item.businessName),
      ['Buffet Sabor'],
    );
  });

  it('ordena a vitrine por nome', async () => {
    const b = await register.execute(buildInput({ businessName: 'Zênite Fotos' }));
    const a = await register.execute(buildInput({ businessName: 'Aurora Fotos' }));
    await approve.execute({ id: b.id });
    await approve.execute({ id: a.id });

    const names = (await list.execute({})).map((item) => item.businessName);

    assert.deepEqual(names, ['Aurora Fotos', 'Zênite Fotos']);
  });

  it('rejeita filtro com categoria inválida', async () => {
    await assert.rejects(() => list.execute({ category: 'magia' }), ValidationError);
  });

  it('falha ao aprovar profissional inexistente', async () => {
    await assert.rejects(() => approve.execute({ id: 'nao-existe' }), ProfessionalNotFoundError);
  });
});
