"use client";

import useContadorDeTarefas from "../hooks/useContadorDeTarefas";
import { Tarefa } from "../data/tarefas";




type Props = {
  tarefas: Tarefa[];
};

export default function ContadorDeTarefas({ tarefas }: Props) {
  const quantidade = useContadorDeTarefas(tarefas);

  return (
    <p style={{ fontSize: "1rem", color: "#374151" }}>
      Total de tarefas: <strong>{quantidade}</strong>
    </p>
  );
}
