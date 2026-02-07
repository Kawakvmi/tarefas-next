"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/todos", { cache: "no-store" });
      const data = (await res.json()) as { todos: Todo[] };
      setTodos(data.todos ?? []);
    } catch {
      setError("Falha ao carregar tarefas.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(async (title: string) => {
    setError(null);

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      setError("Não foi possível criar a tarefa.");
      return;
    }

    const data = (await res.json()) as { todo: Todo };
    setTodos((prev) => [data.todo, ...prev]);
  }, []);

  const removeTodo = useCallback(async (id: string) => {
    setError(null);

    const res = await fetch(`/api/todos?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      setError("Não foi possível remover a tarefa.");
      return;
    }

    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return useMemo(
    () => ({ todos, loading, error, fetchTodos, addTodo, removeTodo }),
    [todos, loading, error, fetchTodos, addTodo, removeTodo]
  );
}
