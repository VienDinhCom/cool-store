import { generate } from 'shortid';
import { CoolStore } from 'cool-store';
import { useState, useEffect } from 'react';

import { Todo } from '../interfaces/todo';

const initialState: Todo[] = [];

const todosStore = new CoolStore<Todo[]>(initialState);

export function addTodo(todo: Todo) {
  todo.id = generate();

  todosStore.set(state => {
    state.push(todo);
  });
}

export function removeTodo(id: string) {
  todosStore.set(state => {
    state.splice(
      state.findIndex(todo => todo.id === id),
      1
    );
  });
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(todosStore.get());

  useEffect(() => {
    const subscription = todosStore.getChanges().subscribe(setTodos);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return todos;
}
