import { generate } from 'shortid';
import { CoolStore } from 'cool-store';
import { Injectable } from '@angular/core';

import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosStore = new CoolStore<Todo[]>([]);

  constructor() {}

  get todos() {
    return this.todosStore.get();
  }

  get todosChanges() {
    return this.todosStore.getChanges();
  }

  addTodo(todo: Todo) {
    this.todosStore.set(state => {
      state.push({ id: generate(), ...todo });
    });
  }

  removeTodo(id: string) {
    this.todosStore.set(state => {
      state = state.filter(todo => todo.id !== id);
      return state;
    });
  }
}
