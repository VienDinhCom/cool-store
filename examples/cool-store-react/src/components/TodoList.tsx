import React from "react";

import { TodoItem } from "./TodoItem";
import { useTodos } from "../services/todosService";

export function TodoList() {
  const todos = useTodos();

  return (
    <ul className="list-group">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo}></TodoItem>
      ))}
    </ul>
  );
}
