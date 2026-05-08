"use client";

import { useEffect, useState } from "react";
import { VideoList } from "../components/VideoList";
import { VideoPlayer } from "../components/VideoPlayer";
import { IVideo } from "../types/video";
import { useVideos } from "../hooks/useVideos";
import { useSearchParams } from "next/navigation";

export default function Home() {
  // Pega o parâmetro 'q' da URL
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('q') || ''
  const videoIdParam = searchParams.get('v')

  // Toda vez que a URL mudar, ele refaz o fetch filtrado
  const { data: videos, isLoading, isError } = useVideos(searchQuery);
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);

  // Define o primeiro vídeo como selecionado automaticamente se nenhum estiver (Autoplay de início)
  useEffect(() => {
    if (videos && videos.length > 0) {
      // Se tiver um ID na URL, ou seja, veio dos favoritos, procura ele na lista e seleciona
      if (videoIdParam) {
        const videoFromUrl = videos.find((v) => v.id === videoIdParam);
        if (videoFromUrl) {
          setSelectedVideo(videoFromUrl);
          return;
        }
      }
      
      // Se não tiver ID na URL, apenas seleciona o primeiro vídeo da lista (Autoplay padrão)
      if (!selectedVideo) {
        setSelectedVideo(videos[0]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videos, videoIdParam]);

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
          <VideoList videos={videos || []} onVideoSelect={setSelectedVideo} className="flex flex-col gap-4" />
        </div>
      </div>
    </div>
  );
}
