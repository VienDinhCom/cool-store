import { Component, OnInit } from "@angular/core";
import { TodosService } from "src/app/services/todos.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent implements OnInit {
  todos$ = this.todosService.todosChanges;

  constructor(private todosService: TodosService) {}

  ngOnInit() {}

  removeTodo(id: string) {
    this.todosService.removeTodo(id);
  }
}
