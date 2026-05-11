import { useState, useEffect } from "react";
import { IVideo } from "@/types/video";
import toast from "react-hot-toast";

export function useHistory() {
  const [history, setHistory] = useState<IVideo[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("@streamview:history");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const addToHistory = (video: IVideo) => {
    setHistory((prev) => {
      // Remove o vídeo se ele já estiver no histórico, para colocá-lo no topo novamente
      const filtered = prev.filter((v) => v.id !== video.id);
      // Coloca o vídeo no começo da lista e limita a 50 itens
      const newHistory = [video, ...filtered].slice(0, 50);

      localStorage.setItem("@streamview:history", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem("@streamview:history");
    setHistory([]);
    toast.success("Histórico apagado com sucesso!", { icon: '🧹' });
  };

  return { history, addToHistory, clearHistory };
}
