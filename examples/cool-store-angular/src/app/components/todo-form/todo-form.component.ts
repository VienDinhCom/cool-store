import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TodosService } from "src/app/services/todos.service";

@Component({
  selector: "app-todo-form",
  templateUrl: "./todo-form.component.html",
  styleUrls: ["./todo-form.component.scss"]
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.todoForm = new FormGroup({
      name: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const { valid, value } = this.todoForm;

    if (valid) {
      this.todosService.addTodo(value);
      this.todoForm.reset();
    } else {
      alert("Please enter a toto!");
    }
  }
}
