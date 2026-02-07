import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoApp from "../app/components/TodoApp";

function mockFetchSequence() {
  const fetchMock = jest
    .fn()
    // GET inicial
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ todos: [] }),
    })
    // POST cria
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        todo: { id: "1", title: "Estudar Next", done: false },
      }),
    })
    // DELETE remove
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    });

  (global as unknown as { fetch: typeof fetch }).fetch = fetchMock as unknown as typeof fetch;

  return fetchMock;
}

describe("TodoApp", () => {
  it("carrega vazio e mostra mensagem", async () => {
    mockFetchSequence();

    render(<TodoApp />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Nenhuma tarefa ainda.")).toBeInTheDocument();
    });
  });

  it("cria e remove uma tarefa refletindo na interface", async () => {
    mockFetchSequence();

    render(<TodoApp />);

    await waitFor(() => {
      expect(screen.getByText("Nenhuma tarefa ainda.")).toBeInTheDocument();
    });

    const input = screen.getByLabelText("Nova tarefa");
    fireEvent.change(input, { target: { value: "Estudar Next" } });
    fireEvent.click(screen.getByText("Adicionar"));

    await waitFor(() => {
      expect(screen.getByText("Estudar Next")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Remover Estudar Next/i }));

    await waitFor(() => {
      expect(screen.queryByText("Estudar Next")).not.toBeInTheDocument();
    });
  });
});
