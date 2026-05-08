"use client";

import { useRouter } from "next/navigation";
import { useFavorites } from "../../hooks/useFavorites";
import { IVideo } from "../../types/video";
import { VideoList } from "../../components/VideoList";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const router = useRouter();

  // Quando clicar em um vídeo na página de favoritos, o usuário é redirecionado automaticamente para a Home com o título do vídeo para ele abrir no player
  const handlePlayFavorite = (video: IVideo) => {
    router.push(`/?v=${video.id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Meus Favoritos</h1>
        <span className="rounded-full bg-zinc-800 px-3 py-1 text-sm font-medium text-zinc-300">
          {favorites.length} {favorites.length === 1 ? 'vídeo' : 'vídeos'}
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 py-20 text-zinc-400">
          <p className="text-lg">Você ainda não tem vídeos favoritos.</p>
          <p className="text-sm">Volte para a página inicial e clique no coração para salvar vídeos aqui.</p>
        </div>
      ) : (
        <VideoList videos={favorites} onVideoSelect={handlePlayFavorite} />
      )}
    </div>
  );}
