import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

jest.useFakeTimers();

describe('Hook: useDebounce', () => {
  it('deve retornar o valor inicial imediatamente', () => {
    const { result } = renderHook(() => useDebounce('teste', 500));
    expect(result.current).toBe('teste');
  });

  it('deve atualizar o valor apenas após o delay especificado', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'teste', delay: 500 } }
    );

    // Atualiza a prop para um novo valor
    rerender({ value: 'teste atualizado', delay: 500 });

    // O valor ainda deve ser o antigo ANTES do tempo passar
    expect(result.current).toBe('teste');

    // Avança o relógio do Jest em 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Agora o valor deve estar atualizado!
    expect(result.current).toBe('teste atualizado');
  });
});