import { getTarefas, Tarefa } from "./data/tarefas";
import NovaTarefa from "./components/NovaTarefa";
import ContadorDeTarefas from "./components/ContadorDeTarefas";







export default async function Home() {
  const tarefas: Tarefa[] = await getTarefas();

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

      <ContadorDeTarefas tarefas={tarefas} />

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            style={{
              background: "#f3f4f6",
              padding: "10px 15px",
              borderRadius: "8px",
              marginBottom: "10px",
              textDecoration: tarefa.concluida ? "line-through" : "none",
            }}
          >
            {tarefa.titulo}
          </li>
        ))}
      </ul>

      <NovaTarefa />
    </main>
  );
}
