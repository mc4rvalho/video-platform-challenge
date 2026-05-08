import { IVideo } from "@/types/video";

interface VideoPlayerProps {
  video: IVideo | null;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  if (!video) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
        <p className="text-zinc-500">Selecione um vídeo para assistir</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-lg">
        <iframe
          src={video.videoUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {video.title}
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          {video.description}
        </p>
      </div>
    </div>
  );
}
