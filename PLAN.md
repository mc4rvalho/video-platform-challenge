# 📅 Cronograma de Desenvolvimento - Video Platform Challenge

Este documento mapeia o plano de execução para o desenvolvimento da plataforma de vídeos, dividido em Sprints diárias visando a entrega no dia 11/05.

## 🛠 Padrões do Projeto
- **Branches:** `feat/nome-da-tarefa`, `chore/nome-da-tarefa`, `fix/nome-da-tarefa`
- **Commits:** Conventional Commits com escopo. Ex: `feat(ui): create video card component`

---

## 🏃‍♂️ Sprint 1: Setup da Arquitetura e Tooling (Quinta-feira) - ✅
**Objetivo:** Inicializar o projeto, garantir a qualidade do código com linters e preparar os dados mockados.

- [x] `chore(setup)`: Inicializar Next.js 15 com TypeScript e Tailwind CSS.
- [x] `chore(setup)`: Configurar Husky, Lint-Staged e git-commit-msg-linter.
- [x] `chore(setup)`: Configurar `prettier-plugin-tailwindcss` para ordenação automática de classes.
- [x] `feat(types)`: Criar a interface `IVideo` em `src/types/video.ts`.
- [x] `feat(api)`: Criar a rota mockada em `src/app/api/videos/route.ts` retornando o JSON.

---

## 🏃‍♂️ Sprint 2: Componentes Base e UI (Sexta-feira)
**Objetivo:** Construir a interface visual (casca) sem se preocupar com a lógica de estado ou chamadas reais à API ainda.

- [x] `feat(ui)`: Criar o componente `Header` com a logo e navegação básica.
- [x] `feat(ui)`: Criar o componente `SearchBar` (apenas visual, sem lógica de filtro ainda).
- [x] `feat(ui)`: Estruturar o `src/app/layout.tsx` para incluir o Header em todas as páginas.
- [x] `feat(ui)`: Criar o `VideoCard` (Thumbnail, Título, Canal e botão de favoritar estático).
- [x] `feat(ui)`: Criar o `VideoList` (Grid responsivo para exibir múltiplos cards).
- [x] `feat(ui)`: Criar o `VideoPlayer` (Componente que recebe uma URL e renderiza o `iframe`).

---

## 🏃‍♂️ Sprint 3: Integração e Estado (Sábado)
**Objetivo:** Dar vida à aplicação! Conectar a UI com a API usando React Query e implementar o LocalStorage.

- [ ] `chore(query)`: Instalar o `@tanstack/react-query` e configurar o Provider no `layout.tsx`.
- [ ] `feat(hooks)`: Criar o hook `useVideos.ts` para fazer o fetch da rota `/api/videos`.
- [ ] `feat(hooks)`: Criar o hook `useFavorites.ts` para gerenciar a persistência no `localStorage`.
- [ ] `feat(ui)`: Integrar o `useVideos` na página Home (`src/app/page.tsx`) e passar os dados para o `VideoList`.
- [ ] `feat(ui)`: Implementar a lógica de busca na `SearchBar` (passando o termo de busca para filtrar a lista de vídeos).
- [ ] `feat(pages)`: Desenvolver a página de Favoritos (`src/app/favorites/page.tsx`) listando os vídeos salvos.
- [ ] `feat(player)`: Fazer com que o clique em um `VideoCard` carregue o vídeo no `VideoPlayer` principal.

---

## 🏃‍♂️ Sprint 4: Diferenciais e Refinamento (Domingo)
**Objetivo:** Polir a aplicação para impressionar os avaliadores e garantir que todos os requisitos extras foram atendidos.

- [ ] `style(ui)`: Refinar a responsividade (garantir que o player e o grid fiquem perfeitos no mobile e desktop).
- [ ] `style(ux)`: Adicionar animações de hover nos cards de vídeo e transições suaves.
- [ ] `chore(a11y)`: Revisar acessibilidade (adicionar `aria-labels` nos botões e iframes, garantir contraste de cores).
- [ ] `feat(utils)`: (Opcional) Criar uma função de *debounce* na busca para otimizar o filtro de vídeos.
- [ ] `test(hooks)`: (Opcional) Configurar Jest e escrever testes unitários para a função de favoritar (localStorage).

---

## 🚀 Sprint 5: Entrega (Segunda-feira)
**Objetivo:** Revisão final, documentação e envio do repositório.

- [ ] `docs(readme)`: Escrever o `README.md` final do projeto com instruções de como rodar localmente.
- [ ] `chore(deploy)`: (Opcional) Fazer o deploy na Vercel para enviar um link do projeto rodando na nuvem.
- [ ] `chore(review)`: Revisão final do código (Clean Code, remoção de logs, checagem do Husky).
- [ ] Enviar o link do repositório para avaliação! 🎉