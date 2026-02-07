"use client";

import { FormEvent, useState } from "react";
import { Todo, useTodos } from "../hooks/useTodos";

export default function TodoApp() {
  const { todos, loading, error, addTodo, removeTodo } = useTodos();
  const [title, setTitle] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = title.trim();
    if (!value) return;

    await addTodo(value);
    setTitle("");
  }

  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        Lista de Tarefas 📝
      </h1>

      <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          aria-label="Nova tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite uma tarefa..."
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #d1d5db",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "none",
            background: "#111827",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Adicionar
        </button>
      </form>

      {loading && <p style={{ marginTop: 12 }}>Carregando...</p>}
      {error && (
        <p role="alert" style={{ marginTop: 12, color: "#b91c1c" }}>
          {error}
        </p>
      )}

      {!loading && todos.length === 0 && (
        <p style={{ marginTop: 12 }}>Nenhuma tarefa ainda.</p>
      )}

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {todos.map((t: Todo) => (
          <li
            key={t.id}
            style={{
              background: "#f3f4f6",
              padding: "10px 15px",
              borderRadius: "8px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ flex: 1, textDecoration: t.done ? "line-through" : "none" }}>
              {t.title}
            </span>

            <button
              type="button"
              onClick={() => removeTodo(t.id)}
              aria-label={`Remover ${t.title}`}
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
