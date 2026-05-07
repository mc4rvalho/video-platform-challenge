import { NextResponse } from "next/server";
import { IVideo } from "../../../types/video";

const videos: IVideo[] = [
  {
    id: "1",
    title: "O que é Next.js 15? Novidades e Recursos",
    description: "Aprenda as principais novidades da nova versão do Next.js.",
    thumbnailUrl: "https://img.youtube.com/vi/jBnwNTKAGH8/maxresdefault.jpg", // Peguei um ID real de teste
    videoUrl: "https://www.youtube.com/embed/jBnwNTKAGH8",
    channel: "Tech Channel",
  },
  {
    id: "2",
    title: "React Query na Prática - Gerenciamento de Estado",
    description:
      "Como fazer fetch e cache de dados de forma eficiente no React.",
    thumbnailUrl: "https://img.youtube.com/vi/novnyCaa7To/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/novnyCaa7To",
    channel: "Code Master",
  },
  {
    id: "3",
    title: "Clean Code: O que é e por que usar?",
    description:
      "Dicas fundamentais para escrever código legível e manutenível.",
    thumbnailUrl: "https://img.youtube.com/vi/vGgwQk-RQns/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/vGgwQk-RQns",
    channel: "Dev Tips",
  },
];

export async function GET() {
  return NextResponse.json(videos);
}
