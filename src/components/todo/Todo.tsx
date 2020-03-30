import React from "react";
import { Server, Model } from "miragejs";

interface todo {
  id: number,
  item: string
}

function startMirage({ environment = "test" } = {}) {
  return new Server({
    environment,
    models: {
      todo: Model
    },
    seeds(server:any) {
      server.create("todo", { id: 1, item: "kalem" });
      server.create("todo", { id: 2, item: "defter" });
    },
    routes() {
      this.namespace = "api";

      this.get("/todos", (schema:any) => {
        return schema.todos.all();
      })

      this.post("/todos", (schema:any, request:any) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.todos.create(attrs);
      })
    }
  })
}
// server.get("/api/todos", { todos: [{ id: 1, item: "kalem" }] })

export default function Todo() {
  let [todos, setTodo] = React.useState([])

  React.useEffect(() => {
    let server;
    if (process.env.NODE_ENV === "development") {
      server = startMirage({environment:process.env.NODE_ENV})
    }

    fetch("/api/todos")
      .then(res => res.json())
      .then(json => {
        setTodo(json.todos)
      })
    return (server === undefined || server.shutdown());
  }, [])

  return (
    <ul>
      {todos.map((todo:todo) => (
        <li key={todo.id}>{todo.item}</li>
      ))}
    </ul>
  )
}
