"use client";

import { useEffect, useState } from "react";
import { IVideo } from "../types/video";

export function useFavorites() {
  const [favorites, setFavorites] = useState<IVideo[]>([]);

  // Carrega os favoritos do localStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem("@streamview:favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Adiciona ou remove o vídeo da lista e salva no localStorage
  const toggleFavorite = (video: IVideo) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((v) => v.id === video.id);

      let newFavorites;
      if (isAlreadyFavorite) {
        // Se já é favorito, remove
        newFavorites = prev.filter((v) => v.id !== video.id);
      } else {
        // Se não é, adiciona
        newFavorites = [...prev, video];
      }

      // Salva a nova lista no localStorage
      localStorage.setItem(
        "@streamview:favorites",
        JSON.stringify(newFavorites),
      );
      return newFavorites;
    });
  };

  // Função auxiliar para o componente saber se pinta o coração de vermelho
  const isFavorite = (videoId: string) => {
    return favorites.some((v) => v.id === videoId);
  };

  return { favorites, toggleFavorite, isFavorite };
}
