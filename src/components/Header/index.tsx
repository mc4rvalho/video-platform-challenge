import Link from "next/link";
import { SearchBar } from "../SearchBar";
import { Heart, PlaySquare } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-auto w-full flex-wrap items-center justify-between gap-4 border-b border-zinc-200 bg-white/80 p-4 backdrop-blur-md transition-colors duration-300 md:h-16 md:px-6 md:py-0 dark:border-zinc-800 dark:bg-zinc-950/80">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-500 dark:hover:text-indigo-400"
      >
        <PlaySquare className="h-7 w-7" />
        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          StreamView
        </span>
      </Link>

      {/* Navegação/Favoritos */}
      <div className="flex items-center gap-2 md:order-last md:gap-4">
        <Link
          href="/favorites"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          <Heart className="h-5 w-5" />
          <span className="hidden sm:block">Favoritos</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Busca */}
      <div className="order-last flex w-full flex-1 justify-center md:order-0 md:w-auto md:px-6">
        <SearchBar />
      </div>
    </header>
  );
}
