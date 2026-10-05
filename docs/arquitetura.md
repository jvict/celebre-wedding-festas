# Arquitetura

Projeto **Celebre Wedding & Festas** (grupo Eventos Star). Este documento define como o código é organizado para o time construir o sistema em partes, sem uma parte quebrar a outra.

## 1. Decisões

| Tema        | Decisão                                                           | Por quê                                                                                  |
| ----------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Repositório | Monorepo com npm workspaces (`apps/web`, `apps/api`)              | Um só Git, uma só CI, front e back evoluem juntos.                                       |
| Front-end   | Next.js (App Router) + TypeScript + Tailwind CSS                  | Páginas rápidas no celular (RNF04, RNF06) e SEO da vitrine.                              |
| Back-end    | Node.js + TypeScript + Fastify                                    | API enxuta, validação na borda, fácil de testar.                                         |
| Arquitetura | Clean Architecture, modular por contexto de negócio               | Regras de negócio (como a LGPD, RN01) ficam protegidas de framework e banco.             |
| Banco       | PostgreSQL 16 + Prisma, rodando em Docker local                   | Dados relacionais (eventos, inscrições, presença) com tipagem forte. Detalhes na Aula 5. |
| Validação   | Zod na borda HTTP; regras de negócio dentro do domínio            | A requisição é validada no formato; o significado é validado pelo domínio.               |
| Testes      | `node:test` (já embutido no Node) + testes de arquitetura         | Sem dependência extra; o CI quebra se alguém violar as camadas.                          |
| Qualidade   | Prettier, EditorConfig, CI no GitHub Actions (typecheck + testes) | Estilo único e erro detectado antes do merge.                                            |

## 2. Estrutura do monorepo

```
celebre-wedding-festas/
├─ apps/
│  ├─ api/                      Back-end (Node + Fastify)
│  │  ├─ prisma/schema.prisma
│  │  └─ src/
│  │     ├─ main.ts             Composition root (liga tudo)
│  │     ├─ config/             Leitura e validação do .env
│  │     ├─ infra/              Servidor HTTP, cliente Prisma
│  │     ├─ shared/             Kernel compartilhado (erros, portas, utilitários)
│  │     └─ modules/
│  │        └─ professionals/   Módulo de referência (já implementado)
│  └─ web/                      Front-end (Next.js)
│     └─ src/
│        ├─ app/                Rotas (finas: só compõem)
│        ├─ features/           Uma pasta por funcionalidade
│        └─ shared/             UI, layout e utilitários comuns
├─ docs/                        Arquitetura, design, cronograma e entregas das aulas
├─ docker-compose.yml           PostgreSQL local
└─ .github/workflows/ci.yml
```

## 3. Clean Architecture no back-end

Cada módulo tem quatro camadas. **A dependência só aponta para dentro**:

```
presentation  ──►  application  ──►  domain
infra         ──►  application  ──►  domain
```

| Camada           | O que vive aqui                                                                         | Pode importar                          | Não pode importar                    |
| ---------------- | --------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------ |
| **domain**       | Entidades, objetos de valor, regras de negócio, interfaces de repositório, erros        | Só `shared/domain` e o próprio domínio | Fastify, Prisma, Zod, outras camadas |
| **application**  | Casos de uso (um por arquivo), DTOs de entrada e saída, portas (`Clock`, `IdGenerator`) | `domain`, `shared/application`         | `infra`, `presentation`, frameworks  |
| **infra**        | Implementações: repositório Prisma, repositório em memória, serviço de e-mail           | `domain`, `application`                | `presentation`                       |
| **presentation** | Rotas HTTP, schemas Zod, tradução de erro em status                                     | `application`                          | `infra`, regras de negócio           |

O arquivo `main.ts` é o **composition root**: o único lugar que conhece as implementações concretas e as liga às interfaces.

### Estrutura de um módulo

```
modules/<nome>/
├─ domain/            entidades, value objects, <nome>.repository.ts (interface), erros
├─ application/       <acao>.use-case.ts (um por ação)
├─ infra/             in-memory-*.repository.ts, prisma-*.repository.ts
├─ presentation/      <nome>.routes.ts, <nome>.schemas.ts
├─ <nome>.module.ts   monta casos de uso + rotas
└─ index.ts           API pública do módulo
```

## 4. SOLID aplicado

- **S (responsabilidade única):** um caso de uso por arquivo e por ação (`RegisterProfessionalUseCase`, `ListProfessionalsUseCase`...). Rota só traduz HTTP; repositório só persiste; entidade só guarda regra.
- **O (aberto/fechado):** novo meio de persistência ou de e-mail = nova classe que implementa a interface, sem alterar o caso de uso.
- **L (substituição de Liskov):** `InMemoryProfessionalRepository` e `PrismaProfessionalRepository` são intercambiáveis; os testes usam a de memória.
- **I (segregação de interfaces):** interfaces pequenas e específicas (`Clock`, `IdGenerator`, `ProfessionalRepository`), sem "interface gigante".
- **D (inversão de dependência):** casos de uso dependem de interfaces do domínio; quem escolhe a implementação é o `main.ts`.

## 5. Módulos e requisitos (Aula 2)

| Módulo          | Responsabilidade                                                   | Requisitos              |
| --------------- | ------------------------------------------------------------------ | ----------------------- |
| `professionals` | Cadastro, aprovação e vitrine de profissionais                     | RF02 a RF06, RF19, RN03 |
| `identity`      | Cadastro de clientes, login, perfis (cliente, profissional, admin) | RF01, RF16, RF17        |
| `events`        | Eventos e programação                                              | RF07, RF12, RF20        |
| `registrations` | Inscrição da cliente no evento e consulta das suas inscrições      | RF08, RF09, RF18, HU06  |
| `attendance`    | RSVP e check-in por QR Code/Token                                  | RF10, RF11, RF21, RN05  |
| `post-event`    | Agradecimento e guia de contatos de mão única                      | RF13, RF14, RN01, RN04  |

`professionals` já está implementado como **módulo de referência**: copie a estrutura dele para os demais.

## 6. LGPD embutida na arquitetura (RN01)

A regra "dados da cliente não vão para profissionais" é garantida pela **estrutura**, não só por cuidado:

1. O módulo `professionals` não conhece clientes nem inscrições. Não existe consulta que cruze os dois.
2. Módulos só se enxergam pelo `index.ts`. O teste `architecture.test.ts` quebra o CI se alguém importar o interior de outro módulo.
3. Somente o módulo `post-event` junta contatos de profissionais com clientes, e apenas no sentido profissional para cliente.
4. Nenhuma rota devolve lista de inscritas a perfil profissional (casos de teste CT-RN01-01 a 03, documentados na Aula 3).

## 7. Front-end (Next.js)

- **`app/`**: só rotas. Cada `page.tsx` busca dados e compõe componentes; não tem regra de negócio.
- **`features/<nome>/`**: tudo de uma funcionalidade (`components/`, `<nome>.service.ts` que fala com a API, tipos, constantes).
- **`shared/`**: UI genérica (`ui/`), estrutura (`layout/`), cliente HTTP (`lib/`).
- Páginas são **Server Components** por padrão (carregam rápido, RNF06). `"use client"` só onde houver interação.
- A API é a fonte da verdade: o front nunca reimplementa regra de negócio, só apresenta.
- Evolução prevista: extrair tipos e constantes compartilhados para `packages/contracts`.

## 8. Fluxo de trabalho no Git

- `main` sempre estável. Ninguém commita direto nela: tudo entra por **Pull Request** com pelo menos uma revisão.
- Branches: `feat/<modulo>-<descricao>`, `fix/<descricao>`, `docs/<descricao>`.
- Commits no padrão **Conventional Commits**: `feat(professionals): lista vitrine por categoria`.
- O CI (typecheck + testes + teste de arquitetura) precisa estar verde para o merge.
- **Definição de pronto** de uma funcionalidade: caso de uso com teste, rota documentada no PR, tela funcionando em 360 px de largura, requisito (RF/RN) citado no PR.

## 9. Como rodar localmente

```bash
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

npm run db:up          # sobe o PostgreSQL (Docker)
npm run db:generate    # gera o Prisma Client
npm run db:migrate     # cria as tabelas (nome da migration: init)

npm run dev            # API em :3333 e site em :3000
npm test           # testes + teste de arquitetura
```

Sem Docker, defina `PERSISTENCE=memory` em `apps/api/.env`: a API roda com dados em memória.

Teste rápido da API:

```bash
curl -X POST localhost:3333/api/professionals -H 'content-type: application/json' -d '{
  "businessName": "Studio Luz", "category": "fotografia",
  "shortDescription": "Fotografia de casamentos e debutantes.",
  "contacts": [{ "channel": "instagram", "value": "@studioluz" }]
}'
# aprovar: curl -X PATCH localhost:3333/api/professionals/<id>/approve
# vitrine:  curl "localhost:3333/api/professionals?category=fotografia"
```

## 10. Pendências conhecidas

- A rota de aprovar profissional ainda não exige perfil Administrador (depende do módulo `identity`).
- CORS ainda não configurado: hoje o Next consulta a API pelo servidor. Configurar quando houver chamadas do navegador.
- O modelo completo do banco será fechado na Aula 5; hoje o Prisma cobre só `professionals`.
