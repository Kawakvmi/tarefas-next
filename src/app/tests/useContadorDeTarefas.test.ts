import { renderHook } from '@testing-library/react';
import useContadorDeTarefas from '@/app/hooks/useContadorDeTarefas';

describe('useContadorDeTarefas', () => {
  it('retorna a quantidade correta', () => {
    // Não dependemos de tipo importado — evitamos o erro de tipo do TS
    const tarefas = [
  { id: 1, titulo: 'Uma', slug: 'uma', concluida: false },
  { id: 2, titulo: 'Duas', slug: 'duas', concluida: true },
  { id: 3, titulo: 'Três', slug: 'tres', concluida: false },
];
    const { result } = renderHook(() => useContadorDeTarefas(tarefas));
    expect(result.current).toBe(3);
  });
});
