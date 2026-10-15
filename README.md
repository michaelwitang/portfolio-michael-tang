# Michael Tang — Portfólio Profissional

> Portfólio de um estudante de Engenharia de Software que conecta desenvolvimento, dados e experiência em negócios digitais.

**Status:** versão funcional em preview. Publicação final, repositório GitHub e notificação por e-mail pendentes.

Documentação adaptada do template do Prof. João Paulo Aramuni enviado pelo autor para o LAB01 de Desenvolvimento e Integração de Aplicações Web, PUC Minas.

## Índice
- [Links úteis](#links-úteis)
- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades principais](#funcionalidades-principais)
- [Tecnologias e dependências](#tecnologias-e-dependências)
- [Arquitetura](#arquitetura)
- [Instalação e execução](#instalação-e-execução)
- [Deploy](#deploy)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Demonstração](#demonstração)
- [Testes](#testes)
- [Autores e referências](#autores-e-referências)

## Links úteis
- **Preview:** em ambiente de desenvolvimento; ainda não há endereço público definitivo.
- **Site publicado:** ainda não publicado.
- **Repositório GitHub:** ainda não informado/conectado pelo autor.
- **Contato:** [michaeltangme@gmail.com](mailto:michaeltangme@gmail.com).

## Sobre o projeto
Website profissional de Michael Tang, estudante de Engenharia de Software na PUC Minas. Apresenta formação, competências em desenvolvimento, dados e analytics, experiência profissional e canais de contato. Foi desenvolvido no contexto do LAB01, com navegação por quatro páginas.

O conteúdo deriva do currículo fornecido, com o e-mail atualizado pelo autor. O endereço residencial completo e o PDF original não são publicados. Não foram inventados projetos, fotografias pessoais, perfis do GitHub ou LinkedIn.

### Identidade visual
Marca tipográfica **mt.**, fundo claro, verde discreto, fontes Manrope e DM Sans. A imagem abstrata de vidro da página inicial integra a identidade visual; não representa um projeto desenvolvido pelo autor. A interface prioriza leitura, contraste, organização e navegação em celular e computador.

## Funcionalidades principais
- **Sobre mim (`/`):** apresentação em português e inglês, formação, ferramentas e idiomas.
- **Projetos (`/projetos`):** espaço reservado, conforme solicitado pelo autor. A lista está vazia; quando houver projetos, a página os ordena do mais antigo ao mais recente e exibe descrição, tecnologias, imagem e link do GitHub.
- **Experiências (`/experiencias`):** MCF Construtora e restaurante delivery, com cargo, período, atividades e ferramentas.
- **Contato (`/contato`):** links clicáveis de e-mail e WhatsApp; formulário com nome, e-mail e mensagem.
- Alternância PT/EN preservada durante a navegação, menu móvel, foco acessível e preferência por movimento reduzido.
- Validação de formulário no navegador e servidor, limites de tamanho e campo antirobô.
- Mensagens salvas em uma tabela privada, sem leitura pública.

### Recebimento de mensagens e limitação de e-mail
As mensagens são salvas em uma tabela privada **contact_submissions** do banco de dados. O formulário confirma armazenamento real, não envio de e-mail.

**A notificação por e-mail ainda não está implementada:** não há domínio remetente configurado. O serviço de e-mail exige plano pago e domínio próprio verificado. Após configurar o domínio, solicitar a ativação das notificações para `michaeltangme@gmail.com`. Verificar o domínio sozinho não ativa os envios.

O trabalho exige envio por e-mail; este requisito permanece pendente. Os links diretos de e-mail/WhatsApp funcionam independentemente da notificação. Não há limitador padrão de requisições configurado; o campo antirobô não substitui limitação de tráfego.

## Tecnologias e dependências
| Tecnologia | Papel |
|---|---|
| React 19 | Interface |
| TypeScript 5 | Tipagem |
| TanStack Start 1 / TanStack Router 1 | Renderização e rotas |
| TanStack Query 5 | Provedor de consultas do aplicativo |
| Vite 8 | Desenvolvimento e compilação |
| Tailwind CSS 4 | Estilização e tokens |
| shadcn/ui, Radix Slot, class-variance-authority | Botões e variantes |
| Lucide React | Ícones |
| Zod 3 | Validação compartilhada |
| PostgreSQL gerenciado | Armazenamento privado das mensagens |
| @supabase/supabase-js | Cliente técnico de acesso ao Cloud |
| Vitest 4, Testing Library, JSDOM | Testes |
| Playwright | Verificação de navegação, formulário e telas |

A relação completa de dependências e versões está em `package.json`; as versões resolvidas estão em `bun.lock`. O template contém bibliotecas auxiliares de interface que nem todas são utilizadas nas páginas do portfólio.

## Arquitetura
```mermaid
flowchart LR
    V[Visitante] --> UI[Páginas React / TanStack]
    UI --> Z[Validação Zod]
    Z --> F[submitContact: função de servidor]
    F --> DB[(Cloud: contact_submissions)]
```

- `PortfolioLayout` compartilha cabeçalho, rodapé e idioma.
- Rotas de conteúdo possuem metadados próprios para compartilhamento.
- `portfolio.ts` centraliza contato, ferramentas e futuros projetos.
- `contact-schema.ts` é compartilhado entre navegador e servidor.
- `contact.functions.ts` só insere campos validados. Não aceita destinatários nem devolve mensagens armazenadas.
- A tabela possui RLS e acesso apenas por credencial de servidor. Nenhuma credencial privada é enviada ao navegador.
- Não há contas de visitantes, painel administrativo, fila de e-mail ou armazenamento no navegador.

## Instalação e execução
### Pré-requisitos
Node.js 22 ou superior e Bun. O formulário requer acesso ao banco de dados e às variáveis de servidor; a interface pode ser desenvolvida sem envio real.

1. Clone este repositório usando sua URL real.
2. Na pasta clonada:
```sh
bun install
bun run dev
```
Abra o endereço exibido pelo Vite. A porta utilizada é `8080`; localmente, confirme a porta anunciada pelo terminal.

### Variáveis de ambiente
| Variável | Uso |
|---|---|
| `VITE_SUPABASE_URL` | Endereço público de conexão do Cloud |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Chave pública do navegador |
| `SUPABASE_URL` | Endereço utilizado somente no servidor |
| `SUPABASE_SERVICE_ROLE_KEY` | Credencial privada de servidor |

O provedor de hospedagem administra as variáveis da conexão. Nunca copie credenciais privadas para o README, GitHub ou variáveis com prefixo `VITE_`. A credencial privada gerenciada não é disponibilizada para exportação pelo provedor. Em execução fora da plataforma de desenvolvimento, o formulário precisa de uma conexão de servidor compatível configurada no provedor; sem ela, exibirá erro em vez de simular sucesso.

### Comandos
```sh
bun run test
bun run lint
bun run build
bun run preview
```
`build` é utilizado na preparação de produção. Não é necessário executar um back-end Java separado nem usar Docker para este projeto.

## Deploy
### Publicação
1. Confira conteúdo e teste o formulário.
2. Use **Publish** no editor e finalize a publicação.
3. Copie o endereço público definitivo para a seção Links úteis.
4. Conecte o GitHub e adicione a URL real do repositório.
5. Para cumprir o requisito de e-mail, configure e verifique um domínio próprio e solicite a integração de notificação.

A publicação final não foi executada automaticamente. A aplicação usa TanStack Start com execução de servidor; **não** deve ser enviada ao GitHub Pages como se fosse somente HTML estático. Hospedagem externa exige suporte ao runtime/adapter utilizado e configuração das variáveis de servidor. Verifique o plano e as cotas de hospedagem; e-mail com domínio próprio não está incluído gratuitamente neste fluxo.

## Estrutura de pastas
```text
.
├── README.md
├── AGENTS.md
├── package.json
├── bun.lock
├── docs/images/
├── drizzle/migrations/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── portfolio/layout.tsx
│   │   └── ui/
│   ├── integrations/supabase/
│   ├── lib/
│   │   ├── portfolio.ts
│   │   ├── contact-schema.ts
│   │   └── contact.functions.ts
│   ├── routes/
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   ├── projetos.tsx
│   │   ├── experiencias.tsx
│   │   └── contato.tsx
│   ├── test/
│   ├── router.tsx
│   └── styles.css
└── vite.config.ts
```

### Inclusão futura de projetos
Adicionar à lista `projects` em `src/lib/portfolio.ts` objetos com `name`, `description`, `date` (ISO), `technologies`, `repository` e `image`. Usar dados reais e capturas do projeto funcionando. A ordenação cronológica é automática.

## Demonstração
Capturas reais da versão inicial. São demonstrações da aplicação implementada, não protótipos feitos no Figma.

| Computador | Celular |
|---|---|
| <img src="docs/images/portfolio-desktop.png" alt="Portfólio Michael Tang no computador" width="580"/> | <img src="docs/images/portfolio-mobile.png" alt="Portfólio Michael Tang no celular" width="220"/> |

As imagens ficam salvas na pasta `docs/images/` do repositório. Não há link de Figma: wireframes e protótipos de média fidelidade exigidos na Sprint 01 ainda não foram produzidos nessa ferramenta.

## Testes
```sh
bunx vitest run src/test/app-routing.test.tsx src/test/contact-schema.test.ts
```
- Quatro testes de correspondência de rotas.
- Três testes de validação: dados válidos, e-mail inválido, mensagem curta/longa e campo antirobô.
- Verificação no navegador: PT/EN, navegação, menu móvel e ausência de rolagem horizontal em 390 × 844.
- Uma mensagem temporária foi enviada pelo formulário e confirmada no banco de dados; apenas esse registro foi removido depois do teste.
- Notificação por e-mail e URL de produção ainda não podem ser verificadas.

## Autores e referências
**Michael Tang** — conteúdo, currículo e autoria do portfólio.

- [Template README do Prof. João Paulo Aramuni](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/TEMPLATES/template_README.md)
- [React](https://react.dev/)
- [TanStack Start](https://tanstack.com/start/latest)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vite.dev/)

### Contribuição
Proponha alterações por pull request no repositório quando conectado. Execute os testes e preserve a privacidade das mensagens. Não adicione trabalhos ou experiências sem aprovação do autor.

### Agradecimentos
PUC Minas e Prof. João Paulo Aramuni pelas orientações do LAB01 e pelo template de documentação.

### Licença
Nenhuma licença de distribuição foi escolhida pelo autor. Não presumir licença MIT; definir antes de distribuir ou reutilizar o código.
