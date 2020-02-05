import React, { useState, FormEvent } from "react";

import { Todo } from "../interfaces/todo";
import { addTodo } from "../services/todosService";

export function TodoForm() {
  const [todo, setTodo] = useState<Todo>({ name: "" });

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    addTodo(todo);
    setTodo({ name: "" });
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={todo.name}
        onChange={event => setTodo({ ...todo, name: event.target.value })}
        className="form-control"
        placeholder="Please enter a Todo"
      />
    </form>
  );
}
