"use client";

import { Heart } from "lucide-react";
import { IVideo } from "@/types/video";
import { useFavorites } from "@/hooks/useFavorites";

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

  // Permite ativar o card apertando "Enter" ou "Espaço" quando focado
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      className="group relative flex cursor-pointer flex-col gap-3 rounded-lg p-2 transition-all hover:bg-zinc-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:hover:bg-zinc-800/50"
      onClick={onSelect}
      // Diz ao leitor de tela que essa div age como um botão
      role="button"
      // Permite que o usuário utiliza a tecla TAB
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Assistir vídeo: ${video.title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-md bg-zinc-200 dark:bg-zinc-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.thumbnailUrl}
          alt={`Capa do vídeo ${video.title}`} // A11y: Adicionando mais contexto ao alt
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Botão de Favoritar */}
        <button
          onClick={handleFavoriteClick}
          // A11y: Leitores de tela agora sabem exatamente o que este botão com um ícone faz
          aria-label={
            favorited
              ? `Remover ${video.title} dos favoritos`
              : `Adicionar ${video.title} aos favoritos`
          }
          className={`absolute top-2 right-2 rounded-full p-2 backdrop-blur-sm transition-colors ${
            favorited
              ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
              : "bg-black/60 text-zinc-300 hover:text-red-500"
          }`}
        >
          <Heart
            className="h-5 w-5"
            fill={favorited ? "currentColor" : "none"}
          />
        </button>
      </div>

      {/* Informações */}
      <div className="flex flex-col gap-1 px-1">
        {/* Título do vídeo */}
        <h3 className="line-clamp-2 text-sm leading-tight font-semibold text-zinc-900 dark:text-zinc-100">
          {video.title}
        </h3>
        {/* Nome do canal */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {video.channel}
        </p>
      </div>
    </div>
  );
}
