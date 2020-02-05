import { generate } from 'shortid';
import { CoolStore } from 'cool-store';
import { useState, useEffect } from 'react';

import { Todo } from '../interfaces/todo';

const initialState: Todo[] = [];

const todosStore = new CoolStore<Todo[]>(initialState);

export function addTodo(todo: Todo) {
  todosStore.set(state => {
    todo.id = generate();
    state.push(todo);
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
    const subscription = todosStore.getChanges().subscribe(setTodos);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return todos;
}
