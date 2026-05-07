import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <div className="flex w-full max-w-md items-center rounded-full bg-zinc-800/50 px-4 py-2 ring-1 ring-zinc-700 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
      <Search className="h-5 w-5 text-zinc-400" />
      <input
        type="text"
        placeholder="Buscar vídeos..."
        className="ml-3 w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-400 outline-none"
      />
    </div>
  );
}