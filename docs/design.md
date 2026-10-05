# Design do site

Direção visual e mapa de telas do **Celebre Wedding & Festas**. É uma proposta inicial para o grupo validar antes de desenhar as telas.

## 1. Conceito

Elegante e acolhedor, sem exagero: o site é uma vitrine de confiança para noivas e debutantes. Muito espaço em branco, fotografia dos profissionais como protagonista, tipografia com serifa nos títulos e texto limpo no corpo.

Princípios:

1. **Foto primeiro.** O trabalho dos profissionais vende; a interface sai da frente.
2. **Mobile primeiro.** A cliente acessa pelo celular (RNF04: funcionar de 360 px a 430 px sem rolagem horizontal).
3. **Privacidade visível.** Avisos curtos e claros de que os dados da cliente não são repassados (RN01).
4. **Poucos passos.** Inscrição em um formulário só; confirmação de presença em um clique.

## 2. Paleta

Definida como tokens em `apps/web/src/app/globals.css`.

| Token       | Cor       | Uso                                         | Contraste                    |
| ----------- | --------- | ------------------------------------------- | ---------------------------- |
| `cream`     | `#F6F1E9` | Fundo da página                             | base                         |
| `panel`     | `#FBF8F2` | Faixas e cartões levemente mais claros      | base                         |
| `sand`      | `#E5DAC8` | Fundo de imagens enquanto carregam          | base                         |
| `ink`       | `#231E18` | Texto principal, botões, seção escura       | 14,7:1 sobre cream           |
| `muted`     | `#6A6055` | Texto secundário                            | 5,5:1 sobre cream            |
| `gold`      | `#826330` | Rótulos, links, destaques em texto          | 4,9:1 sobre cream            |
| `gold-soft` | `#9C7A43` | **Só decoração** (losangos, numerais, foco) | não usar em texto pequeno    |
| `gold-light`| `#C9A96E` | Dourado sobre fundo escuro                  | 7,4:1 sobre ink              |
| `line`      | `#E2D8C7` | Bordas e divisórias                         | decorativo                   |

O design de referência é o protótipo `Celebre Wedding & Festas.html` (Home, vitrine, detalhe, agenda, inscrição, confirmação, guia, login, admin e cadastro). Os tokens acima foram ajustados dele: o dourado de texto foi escurecido de `#8A6A36` para `#826330` para passar o nível AA.

Contrastes calculados pela fórmula WCAG; texto precisa de pelo menos 4,5:1 (nível AA).

## 3. Tipografia

- **Títulos:** Bodoni Moda (serifa de alto contraste, itálico para destaques).
- **Corpo e interface:** Jost (geométrica, leve, legível em telas pequenas).
- Escala: título da página 30 a 48 px, subtítulo 20 a 24 px, corpo 16 px, apoio 14 px.
- Fontes carregadas com `next/font` (sem layout shift, RNF06).

## 4. Mapa de telas

| Tela                            | Rota                          | Perfil        | Requisitos       | Sprint |
| ------------------------------- | ----------------------------- | ------------- | ---------------- | ------ |
| Home                            | `/`                           | Todos         | RF15             | 0      |
| Vitrine de profissionais        | `/profissionais`              | Todos         | RF05, RF06, HU03 | 1      |
| Detalhe do profissional         | `/profissionais/[id]`         | Todos         | RF03, RF04, RF06 | 1      |
| Cadastro de profissional        | `/profissional/cadastro`      | Profissional  | RF02, RF03, RF04 | 1      |
| Entrar / criar conta            | `/entrar`, `/cadastro`        | Cliente       | RF01, RF16       | 2      |
| Meus dados                      | `/conta`                      | Todos logados | RF17             | 2      |
| Programação do evento           | `/eventos/[id]`               | Todos         | RF07, RF12       | 3      |
| Inscrição no evento             | `/eventos/[id]/inscricao`     | Cliente       | RF08, RF09       | 4      |
| Minhas inscrições               | `/minhas-inscricoes`          | Cliente       | RF18, HU06       | 4      |
| Confirmar presença (RSVP)       | `/confirmar-presenca`         | Cliente       | RF10             | 5      |
| Painel do administrador         | `/admin`                      | Administrador | RF19, RF20, HU12 | 3 a 5  |
| Check-in por QR Code            | `/admin/eventos/[id]/checkin` | Administrador | RF21             | 5      |
| Guia pós-evento (e-mail/página) | `/guia/[token]`               | Cliente       | RF13, RF14       | 5      |

## 4.1 Fluxo principal da cliente

`Home` → `Vitrine` → `Evento` → `Inscrição` → e-mail de confirmação → `RSVP` → `Check-in` no dia → `Guia pós-evento` com os contatos.

## 5. Componentes base

Construídos uma vez em `shared/ui` e reaproveitados:

- `Container`, `ButtonLink` (já criados), `Button`, `TextField`, `SelectField`, `Checkbox` (aceite do termo de privacidade).
- `ProfessionalCard` e `CategoryFilter` (já criados).
- `EventCard`, `ProgramTimeline`, `StatusBadge` (pendente, aprovado, presente).
- `FormError`, `EmptyState`, `Skeleton` (estados de carregamento, vazio e erro).

## 6. Acessibilidade e desempenho

- Navegação por teclado em tudo, com foco visível (anel `champagne` de 3 px).
- Imagens decorativas com `alt=""`; imagens com informação, com texto alternativo.
- Formulários com `label` associado e mensagem de erro ligada ao campo.
- Páginas públicas abaixo de 3 s em 4G (RNF06); imagens com `loading="lazy"`.

## 7. Próximo passo de design

Desenhar as telas de maior valor (Home, Vitrine, Detalhe, Inscrição) em protótipo no tamanho de celular e de desktop, e validar com uma pessoa de fora da equipe (tarefa da Aula 4).
