# 🎥 StreamView - Video Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

Este projeto é uma plataforma de visualização de vídeos de alta performance desenvolvida como resolução de um desafio técnico. A aplicação foi construída com foco em **Clean Code**, **Experiência do Usuário (UX)** e **Acessibilidade (a11y)**.

## ✨ Funcionalidades Entregues

Além dos requisitos básicos do desafio, o projeto conta com implementações avançadas para garantir uma experiência premium:

### 🎯 Core Features
- **Player de Vídeo Integrado:** Visualização de vídeos do YouTube diretamente na plataforma.
- **Sistema de Favoritos:** Persistência de dados local (`localStorage`) sincronizada em tempo real em todas as abas/componentes via Custom Events.
- **Busca em Tempo Real:** Filtragem de vídeos por título ou canal com sistema de **Debounce** para otimização de performance e persistência na URL.
- **Design Responsivo:** Layout fluido que se adapta perfeitamente do Mobile ao Desktop.

### 🚀 Diferenciais (Bônus Implementados)
- **Scroll Infinito:** Paginação contínua e otimizada utilizando `useInfiniteQuery` e Intersection Observers.
- **Autoplay Inteligente:** O player avança automaticamente para o próximo vídeo da lista ao finalizar a reprodução atual.
- **Dark/Light Mode:** Alternância de tema baseada na preferência do sistema do usuário ou escolha manual.
- **Acessibilidade (a11y):** Suporte total a navegação por teclado (Tab/Enter), Focus Rings visíveis e `aria-labels` dinâmicos para leitores de tela.
- **Testes Unitários:** Cobertura de testes de regras de negócio (Hooks) e Componentes Visuais utilizando **Jest** e **React Testing Library**.
- **Animações (UX):** Transições suaves, botões responsivos e animação em cascata (Fade-in-up) na renderização da lista.
- **Padronização:** Configuração rígida de linters, Prettier e Husky para Conventional Commits.

---

> ⚠️ **Nota Técnica - Política de Autoplay dos Navegadores:**
> O autoplay para o *próximo* vídeo da fila funciona nativamente. No entanto, o autoplay do *primeiro* vídeo no momento exato em que a página é carregada pela primeira vez pode ser bloqueado pelos navegadores modernos (Chrome, Safari, etc.) devido à [Browser Autoplay Policy](https://developer.chrome.com/blog/autoplay/), que exige uma interação prévia do usuário (clique) antes de emitir áudio não solicitado. A aplicação foi projetada respeitando esse comportamento nativo da Web.

---

## 🛠️ Tecnologias Utilizadas

- **[Next.js 15](https://nextjs.org/)** (App Router)
- **[React](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Tailwind CSS v4](https://tailwindcss.com/)**
- **[TanStack Query v5](https://tanstack.com/query/latest)** (Gerenciamento de cache e paginação)
- **[React YouTube](https://github.com/tjallingt/react-youtube)** (Wrapper de Iframe com eventos)
- **[Jest & Testing Library](https://testing-library.com/)** (Testes Unitários)
- **[Lucide React](https://lucide.dev/)** (Ícones SVG otimizados)

## ⚙️ Como rodar o projeto localmente

1. Clone o repositório:
```bash
git clone [https://github.com/seu-usuario/video-platform-challenge.git](https://github.com/seu-usuario/video-platform-challenge.git)

```

2. Acesse a pasta do projeto:

```bash
cd video-platform-challenge

```

3. Instale as dependências:

```bash
npm install

```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev

```

5. Abra o navegador e acesse: **[http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)**

## 🧪 Como rodar os Testes

Para garantir o funcionamento das regras de negócio e renderização, execute:

```bash
# Rodar todos os testes (Hooks e Componentes UI)
npm run test

# Rodar em modo interativo (Watch)
npm run test:watch

```

## 📂 Arquitetura (Resumo)

```text
src/
 ┣ app/
 ┃ ┣ api/videos/     # API Mockada com paginação inteligente
 ┃ ┣ favorites/      # Rota de Favoritos isolada
 ┃ ┗ page.tsx        # Home (Player + Lista Infinita)
 ┣ components/       # Componentes burros/apresentacionais e inteligentes
 ┣ hooks/            # Regras de negócio separadas da UI (ex: useFavorites)
 ┣ providers/        # Configurações globais (React Query, Tema)
 ┗ types/            # Tipagens globais TypeScript

```

---

*Desenvolvido com foco em boas práticas de Engenharia de Software Frontend.*

```