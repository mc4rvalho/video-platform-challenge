import { Heart } from "lucide-react";
import { IVideo } from "@/types/video";

interface VideoCardProps {
  video: IVideo;
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="group relative flex cursor-pointer flex-col gap-3 rounded-lg p-2 transition-all hover:bg-zinc-800/50">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-md bg-zinc-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Botão de Favoritar */}
        <button className="absolute right-2 top-2 rounded-full bg-black/60 p-2 text-zinc-400 backdrop-blur-sm transition-colors hover:text-red-500">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      {/* Informações */}
      <div className="flex flex-col gap-1 px-1">
        <h3 className="line-clamp-2 text-sm font-semibold text-zinc-100 leading-tight">
          {video.title}
        </h3>
        <p className="text-xs text-zinc-400">{video.channel}</p>
      </div>
    </div>
  );
}
