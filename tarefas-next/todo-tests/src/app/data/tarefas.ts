export type Tarefa = {
  id: number;
  titulo: string;
  concluida: boolean;
};

export async function getTarefas(): Promise<Tarefa[]> {
  return Promise.resolve([
    { id: 1, titulo: "Estudar Next.js 15", concluida: false },
    { id: 2, titulo: "Criar testes unitários", concluida: false },
    { id: 3, titulo: "Revisar conceitos de React", concluida: true },
  ]);
}
