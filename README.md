# Celebre Wedding & Festas

Plataforma web para divulgar profissionais de eventos, gerenciar inscrições e confirmar presenças em casamentos e festas de debutantes, conectando clientes e fornecedores sem intermediar negociações e em conformidade com a LGPD.

Projeto Interdisciplinar II · Fatec · Grupo **Eventos Star**.

## Tecnologias

Next.js · Node.js · TypeScript · Fastify · PostgreSQL · Prisma · Docker · Clean Architecture

## Começando

Pré-requisitos: Node 22 ou superior (já vem com o npm) e Docker.

```bash
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

npm run db:up          # PostgreSQL em Docker
npm run db:generate    # Prisma Client
npm run db:migrate     # tabelas

npm run dev            # API em http://localhost:3333 e site em http://localhost:3000
```

Sem Docker, use `PERSISTENCE=memory` em `apps/api/.env`.

Outros comandos: `npm test`, `npm run typecheck`, `npm run format`.

## Estrutura

```
apps/api    Back-end (Node + Fastify, Clean Architecture modular)
apps/web    Front-end (Next.js)
docs        Arquitetura, design, cronograma e entregas das aulas
```

## Documentação

- [Arquitetura](docs/arquitetura.md)
- [Design do site](docs/design.md)
- [Cronograma de desenvolvimento](docs/cronograma-desenvolvimento.md)
- Entregas: [Aula 1](docs/aula-1), [Aula 2](docs/aula-2), [Aula 3](docs/aula-3)

## Equipe

João Victor Tiburcio (gerente de projeto) · Marcia Aparecida de Moraes Faria (dados) · Igor Souza do Nascimento (desenvolvimento) · Adrielly Menezes Viana (documentação) · Lucila Biasini (testes)
