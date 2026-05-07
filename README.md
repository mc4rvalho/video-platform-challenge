# 🎥 StreamView - Video Platform Challenge

Este projeto é uma plataforma de visualização de vídeos desenvolvida como resolução de um desafio técnico. A aplicação permite aos usuários visualizar vídeos através de iframes, buscar por títulos específicos e salvar seus vídeos favoritos.

## 🚀 Tecnologias Utilizadas

- **[Next.js 15](https://nextjs.org/)** (App Router & Server Components)
- **[React](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS](https://tailwindcss.com/)** (com `prettier-plugin-tailwindcss` para ordenação de classes)
- **[Lucide React](https://lucide.dev/)** (Ícones)
- **[React Query](https://tanstack.com/query/latest)** (Gerenciamento de estado de chamadas HTTP)
- **Husky & Lint-Staged** (Qualidade de código e padronização de commits)

## 📂 Arquitetura e Estrutura de Pastas

A aplicação foi organizada de forma modular, focando em Clean Code e separação de responsabilidades:

\`\`\`text
src/
 ┣ app/
 ┃ ┣ api/videos/route.ts    # API Mockada (Route Handler)
 ┃ ┣ favorites/page.tsx     # Página de Favoritos
 ┃ ┣ layout.tsx             # Root layout com o Header global
 ┃ ┗ page.tsx               # Home (Player Principal + Lista)
 ┣ components/
 ┃ ┣ Header/                # Navegação principal
 ┃ ┣ SearchBar/             # Barra de pesquisa
 ┃ ┣ VideoPlayer/           # Componente de visualização (iframe)
 ┃ ┣ VideoCard/             # Card individual do vídeo (Thumbnail + Info)
 ┃ ┗ VideoList/             # Container Grid para renderizar os cards
 ┣ hooks/
 ┃ ┣ useVideos.ts           # Hook do React Query para chamadas na API
 ┃ ┗ useFavorites.ts        # Hook para gerenciar estado no localStorage
 ┣ types/
 ┃ ┗ video.ts               # Tipagens TypeScript (ex: IVideo)
 ┗ utils/                   # Funções auxiliares (ex: debounce)
\`\`\`

## ⚙️ Como rodar o projeto localmente

1. Clone o repositório:
\`\`\`bash
git clone https://github.com/seu-usuario/video-platform-challenge.git
\`\`\`

2. Acesse a pasta do projeto:
\`\`\`bash
cd video-platform-challenge
\`\`\`

3. Instale as dependências:
\`\`\`bash
npm install
\`\`\`

4. Inicie o servidor de desenvolvimento:
\`\`\`bash
npm run dev
\`\`\`

5. Abra o navegador e acesse:
**[http://localhost:3000](http://localhost:3000)**

## ✨ Funcionalidades

- [x] Listagem de vídeos consumindo uma API Mockada.
- [x] Player de vídeo integrado via iframe (YouTube).
- [ ] Sistema de favoritos com persistência local (LocalStorage).
- [ ] Busca e filtragem em tempo real de vídeos por título.
- [x] Design totalmente responsivo (Mobile e Desktop).

---
*Desenvolvido com dedicação para o teste técnico.*