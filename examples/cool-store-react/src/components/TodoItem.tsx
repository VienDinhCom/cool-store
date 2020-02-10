import React from "react";

import { Todo } from "../interfaces/todo";
import { removeTodo } from "../services/todosService";

interface Props {
  todo: Todo;
}

export function TodoItem({ todo }: Props) {
  return (
    <li
      onClick={() => {
        if (todo.id) removeTodo(todo.id);
      }}
      className="list-group-item"
    >
      {todo.name}
    </li>
  );
}
