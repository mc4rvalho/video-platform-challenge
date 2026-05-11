"use client";

import { IVideo } from "@/types/video";
import YouTube from "react-youtube";
import { Share2 } from "lucide-react";
import toast from "react-hot-toast";

interface VideoPlayerProps {
  video: IVideo | null;
  onVideoEnd?: () => void;
}

export function VideoPlayer({ video, onVideoEnd }: VideoPlayerProps) {
  if (!video) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-zinc-200 shadow-lg dark:bg-zinc-900">
        <p className="text-zinc-500 dark:text-zinc-400">
          Selecione um vídeo para assistir
        </p>
      </div>
    );
  }

  const videoId = video.videoUrl.split("/").pop() || "";

  const handleShare = async () => {
    try {
      // Monta a URL exata do vídeo escolhido
      const shareUrl = `${window.location.origin}/?v=${video.id}`;

      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copiado com sucesso!");
    } catch (error) {
      console.error("Erro ao copiar:", error);
      toast.error("Não foi possível copiar o link.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg">
        <YouTube
          videoId={videoId}
          onEnd={onVideoEnd}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: { autoplay: 1 },
          }}
          className="absolute top-0 left-0 h-full w-full border-0"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl leading-tight font-bold text-zinc-900 dark:text-zinc-50">
            {video.title}
          </h1>

          {/* Botão de compartilhar */}
          <button
            onClick={handleShare}
            className="flex shrink-0 items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            aria-label="Compartilhar vídeo"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Compartilhar</span>
          </button>
        </div>

        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {video.channel}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {video.description}
        </p>
      </div>
    </div>
  );
}
