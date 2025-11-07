"use client";

import { useState } from "react";

export default function NovaTarefa() {
  const [titulo, setTitulo] = useState("");
  const [tarefas, setTarefas] = useState<string[]>([]);

  const adicionarTarefa = (e: React.FormEvent) => {
    e.preventDefault();
    if (titulo.trim() === "") return;
    setTarefas([...tarefas, titulo]);
    setTitulo("");
  };

  return (
    <section style={{ marginTop: "30px" }}>
      <h2 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>
        Adicionar nova tarefa
      </h2>
      <form
        onSubmit={adicionarTarefa}
        style={{ display: "flex", gap: "10px", alignItems: "center" }}
      >
        <input
          type="text"
          placeholder="Digite a tarefa..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{
            flex: 1,
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "8px 15px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Adicionar
        </button>
      </form>

      <ul style={{ marginTop: "15px", listStyle: "none", padding: 0 }}>
        {tarefas.map((t, i) => (
          <li
            key={i}
            style={{
              background: "#e5e7eb",
              padding: "8px 10px",
              borderRadius: "6px",
              marginBottom: "6px",
            }}
          >
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
