"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Serve para inicializar o input com o termo que já estiver na URL (caso tenha)
  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Definindo para 500ms depois do usuários parar de digitar
  const debouncedQuery = useDebounce(query, 500);

  // Escuta o debouncedQuery e caso ele mude, joga pra URL
  useEffect(() => {
    // Caso esteja vazio e não tiver 'q' na URL, não faz nada no primeiro render
    if (!debouncedQuery && !searchParams.has("q")) return;

    if (debouncedQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(debouncedQuery)}`);
    } else {
      router.push("/");
    }
  }, [debouncedQuery, router, searchParams]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      // Caso tenha texto, empurra para a URL. Ex: /q=texto
      router.push(`/?q=${encodeURIComponent(query)}`);
    } else {
      // Se limpar a busca, volta para a home
      router.push("/");
    }
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-md items-center rounded-full bg-zinc-100 px-4 py-2 ring-1 ring-zinc-300 transition-all focus-within:ring-2 focus-within:ring-indigo-500 dark:bg-zinc-800/50 dark:ring-zinc-700"
    >
      <button type="submit" aria-label="Buscar">
        <Search className="h-5 w-5 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100" />
      </button>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar vídeos..."
        className="ml-3 w-full bg-transparent text-sm text-zinc-900 placeholder-zinc-500 outline-none dark:text-zinc-100 dark:placeholder-zinc-400"
      />
    </form>
  );
}
