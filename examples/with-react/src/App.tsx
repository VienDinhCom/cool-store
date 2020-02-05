import React from "react";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <div className="container">
      <br />
      <TodoForm></TodoForm>
      <br />
      <TodoList></TodoList>
    </div>
  );
}

export default App;
