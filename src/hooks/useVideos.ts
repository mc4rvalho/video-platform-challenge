import { useInfiniteQuery } from "@tanstack/react-query";
import { IVideo } from "../types/video";

// Interface para o novo formato da API
interface VideoResponse {
  data: IVideo[];
  nextPage: number | null;
  total: number;
}

// Função responsável pelo fetch
export function useVideos(searchQuery: string = "") {
  return useInfiniteQuery<VideoResponse>({
    queryKey: ["videos", searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `/api/videos?q=${searchQuery}&page=${pageParam}&limit=4`,
      );
      if (!res.ok) throw new Error("Erro ao buscar o vídeo");
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
