"use client";

import { VideoList } from "@/components/VideoList";
import { useHistory } from "@/hooks/useHistory";
import { History as HistoryIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const { history, clearHistory } = useHistory();
  const router = useRouter();

  return (
    <div className="animate-fade-in-up flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <HistoryIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-500" />
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Histórico de Exibição
          </h1>
        </div>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 text-sm text-red-500 transition-colors hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">Limpar Histórico</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="mt-10 text-center text-zinc-500 dark:text-zinc-400">
          Você ainda não assistiu a nenhum vídeo.
        </p>
      ) : (
        <VideoList
          videos={history}
          onVideoSelect={(video) => router.push(`/?v=${video.id}`)}
        />
      )}
    </div>
  );
}
