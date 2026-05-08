import { useEffect, useState } from "react";

// O <T> significa que esse hook aceita qualquer tipo de dado
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Define um timer para atualizar o valor
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Função de limpeza, onde se o usuário digitar de novo antes do delay acabar, o useEffect cancela o timer anterior e começa a contar de novo
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
