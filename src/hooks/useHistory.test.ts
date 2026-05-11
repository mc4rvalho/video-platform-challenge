import { renderHook, act } from '@testing-library/react';
import { useHistory } from './useHistory';
import { IVideo } from '@/types/video';

const mockVideo: IVideo = {
  id: 'hist-123',
  title: 'Vídeo Histórico',
  description: 'Teste',
  thumbnailUrl: 'img.jpg',
  videoUrl: 'url',
  channel: 'Canal',
};

describe('Hook: useHistory', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('deve adicionar um vídeo ao histórico e limitar a 50 itens', () => {
    const { result } = renderHook(() => useHistory());

    act(() => {
      result.current.addToHistory(mockVideo);
    });

    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].id).toBe('hist-123');
  });

  it('deve limpar o histórico completamente', () => {
    const { result } = renderHook(() => useHistory());

    act(() => { result.current.addToHistory(mockVideo); });
    act(() => { result.current.clearHistory(); });

    expect(result.current.history).toHaveLength(0);
    expect(window.localStorage.getItem('@streamview:history')).toBeNull();
  });
});