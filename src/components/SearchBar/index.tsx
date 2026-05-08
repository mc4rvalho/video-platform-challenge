"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Serve para inicializar o input com o termo que já estiver na URL (caso tenha)
  const [query, setQuery] = useState(searchParams.get("q") || "");

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
      className="flex w-full max-w-md items-center rounded-full bg-zinc-800/50 px-4 py-2 ring-1 ring-zinc-700 transition-all focus-within:ring-2 focus-within:ring-indigo-500"
    >
      <button type="submit" aria-label="Buscar">
        <Search className="h-5 w-5 text-zinc-400 transition-colors hover:text-zinc-100" />
      </button>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar vídeos..."
        className="ml-3 w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-400 outline-none"
      />
    </form>
  );
}
