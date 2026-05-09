import { renderHook, act } from '@testing-library/react';
import { useFavorites } from './useFavorites';
import { IVideo } from '@/types/video';

// Mock: Um vídeo de mentira para o teste
const mockVideo: IVideo = {
  id: 'test-123',
  title: 'Vídeo de Teste Jest',
  description: 'Descrição de teste',
  thumbnailUrl: 'https://img.youtube.com/vi/test-123/hqdefault.jpg',
  videoUrl: 'https://www.youtube.com/embed/test-123',
  channel: 'Canal do Teste',
};

describe('Hook: useFavorites', () => {
  // Limpa o localStorage falso do JSDOM antes de cada teste para não haver interferência
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('deve iniciar com uma lista vazia de favoritos', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('deve adicionar um vídeo aos favoritos e salvar no localStorage', () => {
    const { result } = renderHook(() => useFavorites());

    // Para quando uma função no React for alterada dentro do estado (setState)
    act(() => {
      result.current.toggleFavorite(mockVideo);
    });

    // Verifica se a lista agora tem 1 item e se é o vídeo
    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe(mockVideo.id);

    // Verifica se salvou corretamente no localStorage
    const storage = window.localStorage.getItem('@streamview:favorites');
    expect(storage).toContain(mockVideo.id);
  });

  it('deve remover o vídeo caso ele já seja um favorito', () => {
    const { result } = renderHook(() => useFavorites());

    // 1º clique: Adiciona
    act(() => {
      result.current.toggleFavorite(mockVideo);
    });

    // 2º clique: Remove
    act(() => {
      result.current.toggleFavorite(mockVideo);
    });

    // A lista deve voltar a ficar vazia
    expect(result.current.favorites).toHaveLength(0);
    expect(window.localStorage.getItem('@streamview:favorites')).toBe('[]');
  });
});