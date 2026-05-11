import { renderHook, waitFor } from "@testing-library/react";
import { useVideos } from "./useVideos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// Cria um "banco de dados" temporário do React Query para o teste
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Hook: useVideos", () => {
  beforeEach(() => {
    queryClient.clear();
    // Intercepta a chamada "fetch" do navegador para não bater na internet de verdade
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: [], nextPage: null, total: 0 }),
      }),
    ) as jest.Mock;
  });

  it("deve construir a URL da API corretamente com paginação e busca", async () => {
    const { result } = renderHook(() => useVideos("react"), { wrapper });

    // Espera a chamada da API terminar com sucesso
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Garante que o hook chamou a URL exata que programamos
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/videos?q=react&page=1&limit=4",
    );
  });
});
