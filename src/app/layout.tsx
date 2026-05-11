import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { QueryProvider } from "../providers/QueryProvider";
import { ThemeProvider } from "../providers/ThemeProvider";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreamView | Video Platform",
  description: "Plataforma de visualização de vídeos com Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-white text-zinc-900 antialiased transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-50`}
      >
        <ThemeProvider>
          <QueryProvider>
            <Header />
            <main className="mx-auto max-w-7xl p-6">{children}</main>
          </QueryProvider>
        </ThemeProvider>

        <Toaster
          position="bottom-right"
          toastOptions={{ className: "dark:bg-zinc-800 dark:text-white" }}
        />
      </body>
    </html>
  );
}
