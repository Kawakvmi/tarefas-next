import { Tarefa } from "../data/tarefas";
import { useMemo } from "react";

export default function useContadorDeTarefas(tarefas: Tarefa[]) {
  const quantidade = useMemo(() => tarefas.length, [tarefas]);
  return quantidade;
}
