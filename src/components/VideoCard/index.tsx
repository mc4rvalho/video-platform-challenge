"use client";

import { Heart } from "lucide-react";
import { IVideo } from "@/types/video";
import { useFavorites } from "../../hooks/useFavorites";

interface VideoCardProps {
  video: IVideo;
  onSelect: () => void;
}

export function VideoCard({ video, onSelect }: VideoCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(video.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(video);
  };
  return (
    <div
      className="group relative flex cursor-pointer flex-col gap-3 rounded-lg p-2 transition-all hover:bg-zinc-800/50"
      onClick={onSelect}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-md bg-zinc-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Botão de Favoritar */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 rounded-full p-2 backdrop-blur-sm transition-colors ${favorited ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "bg-black/60 text-zinc-400 hover:text-red-500"}`}
        >
          <Heart
            className="h-5 w-5"
            fill={favorited ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Informações */}
      <div className="flex flex-col gap-1 px-1">
        <h3 className="line-clamp-2 text-sm leading-tight font-semibold text-zinc-100">
          {video.title}
        </h3>
        <p className="text-xs text-zinc-400">{video.channel}</p>
      </div>
    </div>
  );
}
