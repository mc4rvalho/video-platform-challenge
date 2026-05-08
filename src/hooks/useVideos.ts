import { useQuery } from "@tanstack/react-query";
import { IVideo } from "../types/video";

// Função responsável pelo fetch
async function fetchVideos(search: string): Promise<IVideo[]> {
  const response = await fetch("/api/videos");

  if (!response.ok) {
    throw new Error("Erro ao buscar vídeos");
  }

  const data: IVideo[] = await response.json();
  if (search) {
    return data.filter((video) =>
      video.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return data;
}

// Hook customizado
export function useVideos(search: string = "") {
  return useQuery({
    queryKey: ["videos", search],
    queryFn: () => fetchVideos(search),
    // Mantém o cache por 5 minutos
    staleTime: 1000 * 60 * 5,
  });
}
