import { NextResponse } from "next/server";
import { IVideo } from "../../../types/video";

// Bancp de dados mockado
const videos: IVideo[] = [
  {
    id: "1",
    title: "O que é Next.js 15? Novidades e Recursos",
    channel: "Tech Channel",
    description: "Aprenda as principais novidades da nova versão do Next.js.",
    thumbnailUrl: "https://img.youtube.com/vi/_w0Ikk4JY7U/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/_w0Ikk4JY7U",
  },
  {
    id: "2",
    title: "React Query na Prática - Gerenciamento de Estado",
    channel: "Code Master",
    description: "Como fazer fetch e cache de dados de forma eficiente no React.",
    thumbnailUrl: "https://img.youtube.com/vi/novnyCaa7To/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/novnyCaa7To",
  },
  {
    id: "3", 
    title: "Clean Code na Prática: SOLID no dia a dia",
    channel: "Dev Tips",
    description: "Princípios essenciais de Clean Code para desenvolvedores aplicarem na vida real.",
    thumbnailUrl: "https://img.youtube.com/vi/p0QNfgg_YFQ/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/p0QNfgg_YFQ",
  },
  {
    id: "4",
    title: "Entendendo TypeScript em 10 Minutos",
    channel: "JS Masters",
    description: "Tudo o que você precisa saber para começar com TypeScript.",
    thumbnailUrl: "https://img.youtube.com/vi/zQnBQ4tB3ZA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/zQnBQ4tB3ZA",
  },
  {
    id: "5",
    title: "Tailwind CSS - O guia definitivo",
    channel: "CSS Tricks",
    description: "Domine o framework de CSS mais popular do momento.",
    thumbnailUrl: "https://img.youtube.com/vi/UBOj6rqRUME/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/UBOj6rqRUME",
  },
  {
    id: "6",
    title: "Zustand vs Redux - Qual escolher?",
    channel: "Frontend Hero",
    description: "Comparativo de bibliotecas de estado global no React.",
    thumbnailUrl: "https://img.youtube.com/vi/KCr-UNsM3vA/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/KCr-UNsM3vA",
  },
  {
    id: "7", 
    title: "Framer Motion Tutorial – Master React Animations",
    channel: "UI/UX Code",
    description: "Dê vida às suas interfaces com essa biblioteca fantástica.",
    thumbnailUrl: "https://img.youtube.com/vi/JALCoY9MQg8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/JALCoY9MQg8",
  },
  {
    id: "8", 
    title: "Como usar acessibilidade web no front end na prática!",
    channel: "Dev Inclusivo",
    description: "Como tornar sua aplicação usável para todos (a11y).",
    thumbnailUrl: "https://img.youtube.com/vi/zWARLxSSDHI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/zWARLxSSDHI",
  },
  
  {
    id: "9",
    title: "Soft Skills para Programadores: Comunicação e Empatia",
    channel: "Tech Career",
    description: "Como a comunicação efetiva pode impulsionar sua carreira na tecnologia.",
    thumbnailUrl: "https://img.youtube.com/vi/zdQWgFUTGE0/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/zdQWgFUTGE0",
  },
  {
    id: "10",
    title: "Resiliência e Inteligência Emocional em TI",
    channel: "Dev Mind",
    description: "Aprenda a lidar com a frustração de bugs complexos e prazos apertados.",
    thumbnailUrl: "https://img.youtube.com/vi/HdiZiSL3xvo/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/HdiZiSL3xvo",
  },
  {
    id: "11",
    title: "O que as empresas buscam além do código?",
    channel: "Soft Skills Tech",
    description: "Trabalho em equipe, adaptabilidade e resolução de conflitos no dia a dia do dev.",
    thumbnailUrl: "https://img.youtube.com/vi/SmXUoQsE9cI/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/SmXUoQsE9cI",
  },
  
  {
    id: "12",
    title: "O que é GraphQL e quando utilizar?",
    channel: "Dicionário do Programador",
    description: "Entenda os benefícios do GraphQL em relação ao tradicional REST.",
    thumbnailUrl: "https://img.youtube.com/vi/xbLpIhCsIdg/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/xbLpIhCsIdg",
  },
  {
    id: "13",
    title: "Docker Compose para Desenvolvedores",
    channel: "Tech Channel",
    description: "Aprenda a conteinerizar sua aplicação de forma simples.",
    thumbnailUrl: "https://img.youtube.com/vi/D_ha0g9yS2E/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/D_ha0g9yS2E",
  },
  {
    id: "14",
    title: "Minha Carreira Teria Sido MUITO Melhor",
    channel: "Filipe Deschamps",
    description: "Soft skills, resiliência e como não estagnar na área de tecnologia.",
    thumbnailUrl: "https://img.youtube.com/vi/NA4srP35Maw/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/NA4srP35Maw",
  },
  {
    id: "15",
    title: "O Design System da Rocketseat (Da UI ao Código)",
    channel: "Rocketseat",
    description: "Entenda como componentes são separados e organizados no Front-end.",
    thumbnailUrl: "https://img.youtube.com/vi/90y5707fJbI/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/90y5707fJbI",
  }
];

export async function GET(request: Request) {
  // Simulando um delay de internet (para visualização do loading state)
  await new Promise((resolve) => setTimeout(resolve, 800))

  const {searchParams} = new URL(request.url)
  const q = searchParams.get('q')?.toLowerCase()
  
  // Pegando os parâmetros de paginação (padrão de 4 itens por vez)
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get('limit') || '4')

  let filteredVideos = videos

  // 1. Aplica o filtro de busca, caso tenha
  if (q) {
    filteredVideos = videos.filter(
      (video) =>
        video.title.toLowerCase().includes(q) ||
        video.channel.toLowerCase().includes(q)
    )
  }

  // 2. Aplica a paginação
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedVideos = filteredVideos.slice(startIndex, endIndex)

  // 3. Verifica se tem uma próxima página disponível
  const hasNextPage = endIndex < filteredVideos.length

  // 4. Retorna no formato idela para o Scroll infinito do React Query
  return NextResponse.json({
    data: paginatedVideos,
    nextPage: hasNextPage ? page + 1 : null,
    total: filteredVideos.length
  });
}
