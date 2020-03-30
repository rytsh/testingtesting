import React from "react";
import { Server, Model } from "miragejs";

interface todo {
  id: number,
  item: string
}

function startMirage({ environment = "test" } = {}) {
  return new Server({
    environment,
    urlPrefix: 'http://localhost:4000',
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
  let [todos, setTodo] = React.useState([]);
  let [err, setErr] = React.useState("");

  const fetchAPI = async () => {
    return await fetch("http://localhost:4000/api/todos")
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      throw new Error("Request Failed");
    })
    .then(json => {
      console.log(json.todos);
      return json.todos;
    })
    .catch(err => {
      setErr("Request Failed!")
      return [];
    });
  };

  React.useEffect(() => {
    let cancel = false;
    let server:any;
    if (process.env.NODE_ENV === "development") {
      server = startMirage({environment:process.env.NODE_ENV})
    }

    const runEffect = async () => {
      const data = await fetchAPI();
      if (cancel) {
        return;
      }
      setTodo(data);
    };
    runEffect();
    return () => {
      cancel = true;
      server === undefined || server.shutdown()
    };
  }, [])

  return (
    <ViewTodo err={err} todos={todos}/>
  )
}

interface ViewTodo{err:string, todos:Array<any>};

function ViewTodo({err, todos}:ViewTodo) {
  if (err === "") {
    return (
      <ul>
        {todos.map((todo:todo) => (
          <li key={todo.id}>{todo.item}</li>
        ))}
      </ul>);
  }

  return <div className="errorBox">{err}</div>
}
