"use client";

import { Suspense, useEffect, useState } from "react";
import { VideoList } from "../components/VideoList";
import { VideoPlayer } from "../components/VideoPlayer";
import { IVideo } from "../types/video";
import { useVideos } from "../hooks/useVideos";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useHistory } from "../hooks/useHistory";

function HomeContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const videoIdParam = searchParams.get("v");

  // Funções do useInfiniteQuery
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useVideos(searchQuery);

  const { ref, inView } = useInView();
  
  const { addToHistory } = useHistory();

  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);

  // Junção dos dados em uma página só
  const allVideos = data?.pages.flatMap((page) => page.data) || [];

  // Lógica do Autoplay Inicial e Tratamento de Links Compartilhados
  useEffect(() => {
    if (allVideos.length === 0) return;

    if (videoIdParam) {
      // Para evitar um loop infinito
      if (selectedVideo?.id === videoIdParam) return;

      // 1. Tenta achar o vídeo na lista que já está visível na tela (ex: Página 1)
      const videoFromUrl = allVideos.find((v) => v.id === videoIdParam);

      if (videoFromUrl) {
        setSelectedVideo(videoFromUrl);
      } else {
        // 2. Se o vídeo compartilhado estiver perdido lá na Página 3, ele faz um fetch rápido com limite alto só para achá-lo sem quebrar o scroll da lateral
        fetch(`/api/videos?limit=50`)
          .then((res) => res.json())
          .then((json) => {
            const found = json.data.find((v: IVideo) => v.id === videoIdParam);
            if (found) {
              setSelectedVideo(found);
            } else if (!selectedVideo) {
              setSelectedVideo(allVideos[0]);
            }
          })
          .catch(() => {
            if (!selectedVideo) setSelectedVideo(allVideos[0]);
          });
      }
    } else if (!selectedVideo) {
      // Se não tem link compartilhado, toca o primeiro da lista
      setSelectedVideo(allVideos[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, videoIdParam]);

  // Lógica do Scroll Infinito
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  // Lógica do Autoplay contínuo
  const handleVideoEnd = () => {
    if (!selectedVideo || allVideos.length === 0) return;

    // Acha qual é a posição do vídeo atual na lista
    const currentIndex = allVideos.findIndex((v) => v.id === selectedVideo.id);

    // Se não for o último vídeo, seleciona o próximo!
    if (currentIndex !== -1 && currentIndex < allVideos.length - 1) {
      setSelectedVideo(allVideos[currentIndex + 1]);
    }
  };

  // Registra o vídeo no histórico sempre que ele for selecionado
  useEffect(() => {
    if (selectedVideo) {
      addToHistory(selectedVideo);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVideo]);

  // Lógica para mudar o título da aba do navegador dinamicamente
  useEffect(() => {
    if (selectedVideo) {
      document.title = `▶️ ${selectedVideo.title} | StreamView`;
    } else {
      document.title = `StreamView | Video Platform`;
    }
  }, [selectedVideo]);

  // Lógica para selecionar o vídeo e rolar a tela para o topo
  const handleSelectVideo = (video: IVideo) => {
    setSelectedVideo(video);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
      <div className="flex-1">
        <VideoPlayer video={selectedVideo} onVideoEnd={handleVideoEnd} />
      </div>

      <div className="w-full lg:w-1/3 xl:w-1/4">
        <h2 className="m-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Recomendados
        </h2>
        <div className="flex flex-col gap-4">
          <VideoList
            videos={allVideos}
            onVideoSelect={handleSelectVideo}
            className="flex flex-col gap-4"
          />

          <div
            ref={ref}
            className="flex h-10 w-full items-center justify-center"
          >
            {isFetchingNextPage && (
              <span className="animate-pulse text-sm text-zinc-500 dark:text-zinc-400">
                Carregando mais...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="mt-10 text-center text-zinc-500">
          Carregando plataforma...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
