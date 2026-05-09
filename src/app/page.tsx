"use client";

import { useEffect, useState } from "react";
import { VideoList } from "../components/VideoList";
import { VideoPlayer } from "../components/VideoPlayer";
import { IVideo } from "../types/video";
import { useVideos } from "../hooks/useVideos";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

export default function Home() {
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

  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);

  // Junção dos dados em uma página só
  const allVideos = data?.pages.flatMap((page) => page.data) || [];

  // Lógica do Autoplay Inicial e Favoritos
  useEffect(() => {
    if (allVideos.length > 0) {
      if (videoIdParam) {
        const videoFromUrl = allVideos.find((v) => v.id === videoIdParam);
        if (videoFromUrl) {
          setSelectedVideo(videoFromUrl);
          return;
        }
      }
      if (!selectedVideo) {
        setSelectedVideo(allVideos[0]);
      }
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

  // Lógica para selecionar o vídeo e rolar a tela para o topo
  const handleSelectVideo = (video: IVideo) => {
    setSelectedVideo(video);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
