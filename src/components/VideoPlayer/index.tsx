"use client";

import { IVideo } from "@/types/video";
import YouTube from "react-youtube";

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
        <h1 className="text-2xl leading-tight font-bold text-zinc-900 dark:text-zinc-50">
          {video.title}
        </h1>
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
