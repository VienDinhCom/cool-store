import { generate } from 'shortid';
import { CoolStore } from 'cool-store';
import { Injectable } from '@angular/core';

import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosStore: CoolStore<Todo[]>;

  constructor() {
    const initialState: Todo[] = [];
    this.todosStore = new CoolStore(initialState);
  }

  get todos() {
    return this.todosStore.getChanges();
  }

  addTodo(todo: Todo) {
    this.todosStore.set(state => {
      todo.id = generate();
      state.push(todo);
    });
  }

  removeTodo(id: string) {
    this.todosStore.set(state => {
      state.splice(
        state.findIndex(todo => todo.id === id),
        1
      );
    });
  }
}
