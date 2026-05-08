import { useState } from "react";
import { VideoList } from "../components/VideoList";
import { VideoPlayer } from "../components/VideoPlayer";
import { IVideo } from "../types/video";
import { useVideos } from "../hooks/useVideos";

export default function Home() {
  // Conecta com o SearchBar do Header
  const [searchTerm, setSearchTerm] = useState("");

  const { data: videos, isLoading, isError } = useVideos(searchTerm);
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);

  // Define o primeiro vídeo como selecionado automaticamente se nenhum estiver (Autoplay de início)
  if (videos && videos.length > 0 && !selectedVideo) {
    setSelectedVideo(videos[0]);
  }

  if (isLoading)
    return (
      <div className="mt-10 text-center text-zinc-400">
        Carregando vídeos...
      </div>
    );
  if (isError)
    return (
      <div className="mt-10 text-center text-red-500">
        Erro ao carregar os vídeos.
      </div>
    );

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Lado esquerdo: Player principal em destaque */}
      <div className="flex-1">
        <VideoPlayer video={selectedVideo} />
      </div>

      {/* Lado direto: Lista de vídeos (Siderbar) */}
      <div className="w-full lg:w-1/3 xl:w-1/4">
        <h2 className="m-4 text-xl font-bold text-zinc-100">Recomendados</h2>
        <div className="flex flex-col gap-4">
          <VideoList videos={videos || []} onVideoSelect={setSelectedVideo} />
        </div>
      </div>
    </div>
  );
}
