"use client";

import { useState, useEffect, useCallback } from "react";
import { IVideo } from "@/types/video";
import toast from "react-hot-toast";

export function useFavorites() {
  const [favorites, setFavorites] = useState<IVideo[]>([]);

  const loadFavorites = useCallback(() => {
    const stored = localStorage.getItem("@streamview:favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
     // Carrega na primeira vez
    loadFavorites();

    // Fica "escutando" se alguém emitiu o evento de atualização
    window.addEventListener("favoritesUpdated", loadFavorites);

    // Limpeza do evento quando o componente morre
    return () => window.removeEventListener("favoritesUpdated", loadFavorites);
  }, [loadFavorites]);

  const toggleFavorite = (video: IVideo) => {
    // Busca a lista mais recente direto do localStorage para evitar conflitos
    const stored = localStorage.getItem("@streamview:favorites");
    const currentFavorites: IVideo[] = stored ? JSON.parse(stored) : [];

    const isAlreadyFavorite = currentFavorites.some((v) => v.id === video.id);

    let newFavorites;
    if (isAlreadyFavorite) {
      newFavorites = currentFavorites.filter((v) => v.id !== video.id);
      toast.error("Removido dos favoritos", {icon: '💔'})
    } else {
      newFavorites = [...currentFavorites, video];
      toast.error("Adicionado aos favoritos", {icon: '❤️'})
    }

    localStorage.setItem("@streamview:favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);

    // Faz a página de favoritos remover o item instantaneamente
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const isFavorite = (videoId: string) => {
    return favorites.some((v) => v.id === videoId);
  };

  return { favorites, toggleFavorite, isFavorite };
}
