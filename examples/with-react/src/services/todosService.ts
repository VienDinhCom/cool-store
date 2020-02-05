import { generate } from "shortid";
import { Subscription } from "rxjs";
import { CoolStore } from "cool-store";
import { useState, useEffect } from "react";

import { Todo } from "../interfaces/todo";

const initialState: Todo[] = [];

const todosStore = new CoolStore<Todo[]>(initialState);

export function addTodo(todo: Todo) {
  todosStore.set(state => {
    state.push({ id: generate(), ...todo });
  });
}

export function removeTodo(id: string) {
  todosStore.set(state => {
    return state.filter(todo => todo.id !== id);
  });
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(todosStore.get());

  useEffect(() => {
    const subscription: Subscription = todosStore
      .getChanges()
      .subscribe(setTodos);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return todos;
}
