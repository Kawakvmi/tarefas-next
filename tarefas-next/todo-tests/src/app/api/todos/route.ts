import { NextResponse } from "next/server";

type Todo = { id: string; title: string; done: boolean };

let TODOS: Todo[] = [];

export async function GET() {
  return NextResponse.json({ todos: TODOS });
}

export async function POST(req: Request) {
  const body = (await req.json()) as { title?: string };
  const title = (body.title ?? "").trim();

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const todo: Todo = {
    id: crypto.randomUUID(),
    title,
    done: false,
  };

  TODOS = [todo, ...TODOS];
  return NextResponse.json({ todo }, { status: 201 });
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const before = TODOS.length;
  TODOS = TODOS.filter((t) => t.id !== id);

  if (TODOS.length === before) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
