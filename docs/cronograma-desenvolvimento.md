# Cronograma de desenvolvimento

Plano de construção do sistema em **sprints semanais**, de 05/10/2026 a 29/11/2026, encaixado nas quinzenas e marcos da disciplina (Aula 2, seção 8). É uma proposta para o grupo ajustar.

## Visão geral

| Sprint | Período       | Foco                          | Marco da disciplina                             |
| ------ | ------------- | ----------------------------- | ----------------------------------------------- |
| 0      | 05/10 a 11/10 | Fundação do projeto           | Quinzena 4 (modelagem UML + início do código)   |
| 1      | 12/10 a 18/10 | Profissionais e vitrine       | **Aula 4**                                      |
| 2      | 19/10 a 25/10 | Banco de dados e identidade   | Quinzena 5                                      |
| 3      | 26/10 a 01/11 | Eventos e administração       | **Aula 5** (banco de dados)                     |
| 4      | 02/11 a 08/11 | Inscrições                    | Quinzena 6                                      |
| 5      | 09/11 a 15/11 | Presença e pós-evento (MVP)   | **Aula 6** (MVP, requisitos de prioridade Alta) |
| 6      | 16/11 a 22/11 | Testes e correções            | Quinzena 7                                      |
| 7      | 23/11 a 29/11 | Ajustes finais e apresentação | **Aula 7** (final)                              |

Feriados que reduzem a capacidade: 12/10 (segunda), 02/11 (segunda) e 20/11 (sexta).

## Detalhe por sprint

### Sprint 0 · 05/10 a 11/10 · Fundação

| Entrega                                            | Responsável sugerido  |
| -------------------------------------------------- | --------------------- |
| Subir o esqueleto no GitHub (monorepo, CI, Docker) | João Victor           |
| Todos rodando o projeto localmente (`npm run dev`) | Time                  |
| Validar a paleta e a tipografia (`docs/design.md`) | João Victor, Adrielly |
| Protótipo das telas Home, Vitrine e Detalhe        | João Victor           |
| Proteger a `main` e combinar o fluxo de PR         | João Victor, Igor     |

**Pronto quando:** os 5 integrantes rodam o site e a API na própria máquina e o CI está verde.

### Sprint 1 · 12/10 a 18/10 · Profissionais e vitrine

| Entrega                                                              | Requisitos       | Responsável sugerido |
| -------------------------------------------------------------------- | ---------------- | -------------------- |
| Banco: tabela de profissionais migrada e vitrine lendo do PostgreSQL | RF05             | Igor, Marcia         |
| Tela de cadastro de profissional (formulário + validação)            | RF02 a RF04      | João Victor          |
| Página de detalhe do profissional (produtos e serviços)              | RF03, RF04, RF06 | João Victor          |
| Testes dos casos de uso de profissionais (já existem os da base)     | RF02, RF05, RF19 | Lucila               |

**Pronto quando:** um profissional se cadastra, fica pendente, e a vitrine mostra só os aprovados, com filtro por categoria.

### Sprint 2 · 19/10 a 25/10 · Banco de dados e identidade

| Entrega                                                   | Requisitos       | Responsável sugerido |
| --------------------------------------------------------- | ---------------- | -------------------- |
| Modelo de dados completo no Prisma (entregável da Aula 5) | Todos            | Marcia               |
| Módulo `identity`: cadastro de cliente, login, perfis     | RF01, RF16, RF17 | Igor                 |
| Telas de login, cadastro de cliente e "meus dados"        | RF01, RF16, RF17 | João Victor          |
| Proteger a aprovação de profissional (só Administrador)   | RF19             | Igor                 |

**Pronto quando:** cliente, profissional e administrador entram com login e cada um vê só o que seu perfil permite.

### Sprint 3 · 26/10 a 01/11 · Eventos e administração

| Entrega                                                              | Requisitos | Responsável sugerido |
| -------------------------------------------------------------------- | ---------- | -------------------- |
| Módulo `events`: criar evento e programação (admin)                  | RF07, RF20 | Igor                 |
| Tela pública de programação do evento                                | RF07, RF12 | João Victor          |
| Painel do admin: aprovar profissionais e gerenciar eventos           | RF19, RF20 | João Victor          |
| Entrega da Aula 5: documento do banco de dados (corrigido, ver nota) | Aula 5     | Marcia, Adrielly     |

**Pronto quando:** o administrador cria um evento com programação e aprova profissionais pelo painel.

### Sprint 4 · 02/11 a 08/11 · Inscrições

| Entrega                                                               | Requisitos        | Responsável sugerido |
| --------------------------------------------------------------------- | ----------------- | -------------------- |
| Módulo `registrations`: inscrição com aceite do termo e consentimento | RF08, RF09, RNF02 | Igor                 |
| E-mail de confirmação da inscrição                                    | HU13              | Igor                 |
| Telas de inscrição e "minhas inscrições", com cancelamento            | RF08, RF18, HU06  | João Victor          |
| Testes de inscrição e do bloqueio de dados da cliente                 | RN01, CT-RN01-01  | Lucila               |

**Pronto quando:** a cliente se inscreve, recebe o e-mail e vê a inscrição na própria conta.

### Sprint 5 · 09/11 a 15/11 · Presença e pós-evento (MVP)

| Entrega                                                       | Requisitos             | Responsável sugerido |
| ------------------------------------------------------------- | ---------------------- | -------------------- |
| Módulo `attendance`: RSVP e check-in por QR Code/Token        | RF10, RF11, RF21       | Igor                 |
| Módulo `post-event`: disparo do guia de contatos de mão única | RF13, RF14, RN01, RN04 | Igor                 |
| Tela de RSVP, tela de check-in e página do guia pós-evento    | RF10, RF21, RF14       | João Victor          |
| Casos de teste da regra de LGPD                               | CT-RN01-02, CT-RN01-03 | Lucila               |
| **Congelar o MVP em 14/11** e preparar a entrega da Aula 6    | Prioridade Alta        | Time                 |

**Pronto quando:** o fluxo completo funciona do cadastro ao guia pós-evento, com todos os requisitos de prioridade Alta.

### Sprint 6 · 16/11 a 22/11 · Testes e correções

| Entrega                                                            | Responsável sugerido |
| ------------------------------------------------------------------ | -------------------- |
| Plano e execução de testes ponta a ponta do fluxo completo         | Lucila               |
| Teste em celular (360 a 430 px) e de desempenho (carga em até 3 s) | Lucila, João Victor  |
| Correção dos defeitos encontrados                                  | Igor, João Victor    |
| Relatório de LGPD: evidência dos 3 casos de teste                  | Lucila, Adrielly     |

**Pronto quando:** nenhum defeito crítico aberto e o fluxo principal passa nos testes.

### Sprint 7 · 23/11 a 29/11 · Ajustes finais e apresentação

| Entrega                                                   | Responsável sugerido |
| --------------------------------------------------------- | -------------------- |
| Publicação em ambiente de demonstração e dados de exemplo | Igor                 |
| Roteiro e slides da apresentação final                    | João Victor          |
| Documentação final no repositório (README, manual de uso) | Adrielly             |
| Ensaio da apresentação (**26/11**)                        | Time                 |

## Riscos e como tratar

| Risco                                          | Tratamento                                                                                    |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Código concentrado em uma pessoa (R03)         | Dividir: Igor no back-end, João Victor no front-end, Marcia no banco. Revisão por PR.         |
| Envio de e-mail em massa sendo bloqueado (R06) | Começar com serviço de e-mail transacional e envio em lotes; página de guia como alternativa. |
| Atraso nas aulas de modelagem atrasar o código | O módulo `professionals` já está pronto como modelo; copiar a estrutura para os demais.       |
| Escopo crescer além do MVP                     | O que não é prioridade Alta (HU06, relatórios HU12 e HU14) só entra se sobrar tempo.          |

## Observações

- Os responsáveis são uma sugestão baseada na matriz de responsabilidades da Aula 2; o grupo deve validar.
- O documento de banco de dados enviado na Aula 2 pertence à **Aula 5** e precisa ser revisado: ele fala de "feira física", "pavilhão" e "check-in", que não correspondem à plataforma online multievento.
