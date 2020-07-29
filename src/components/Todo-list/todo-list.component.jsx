import React from "react";
import Todo from "../Todo/todo.component";
import "./todo-list.styles.scss";

const TodoList = (props) => {
  const isTodos = props.todos.length > 0 ? true : false;

  return (
    <div className="todo-list bg-card">
      <h1>Todos</h1>
      {isTodos ? (
        props.todos.map((todo, index) => (
          <div key={todo.id}>
            <Todo todo={todo} index={++index} />
          </div>
        ))
      ) : (
          <h2>Add Todos to render here</h2>
        )}
    </div>
  );
};

export default TodoList;
