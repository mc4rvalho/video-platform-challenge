import { VideoList } from "../components/VideoList";
import { VideoPlayer } from "../components/VideoPlayer";
import { IVideo } from "../types/video";

const mockVideos: IVideo[] = [
  {
    id: "1",
    title: "Next.js 15 in 100 Seconds",
    description: "Um resumo rápido das novidades do Next.js.",
    thumbnailUrl: "https://img.youtube.com/vi/Zq5fmkH0T78/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/Zq5fmkH0T78",
    channel: "Fireship",
  },
  {
    id: "2",
    title: "React Query Crash Course",
    description: "Aprenda a fazer fetch de dados como um profissional.",
    thumbnailUrl: "https://img.youtube.com/vi/novnyCaa7To/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/novnyCaa7To",
    channel: "Codevolution",
  },
  {
    id: "3",
    title: "Clean Code - Uncle Bob",
    description: "Os princípios básicos para escrever código limpo.",
    thumbnailUrl: "https://img.youtube.com/vi/7EmboKQH8lM/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/7EmboKQH8lM",
    channel: "Tech Conference",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Lado esquerdo: Player principal em destaque */}
      <div className="flex-1">
        <VideoPlayer video={mockVideos[0]} />
      </div>

      {/* Lado direto: Lista de vídeos (Siderbar) */}
      <div className="w-full lg:w-1/3 xl:w-1/4">
        <h2 className="m-4 text-xl font-bold text-zinc-100">Recomendados</h2>
        <div className="flex flex-col gap-4">
          <VideoList videos={mockVideos} />
        </div>
      </div>
    </div>
  );
}
