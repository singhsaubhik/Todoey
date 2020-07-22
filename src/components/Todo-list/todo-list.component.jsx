import React from "react";
import Todo from "../Todo/todo.component";
import "./todo-list.styles.css";

const TodoList = (props) => {
  const isTodos = props.todos ? true : false;

  return (
    <div className="todo-list-parent">
      <div className="alert container"><h1>Todos</h1></div>
      {isTodos ? (
        props.todos.map((todo, index) => (
          <div key={todo.id} style={{ marginBottom: "1rem" }}>
            <Todo todo={todo} index={++index}/>
          </div>
        ))
      ) : (
          <p>Add Todos to render here</p>
        )}
    </div>
  );
};

export default TodoList;
