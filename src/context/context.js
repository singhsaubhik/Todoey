import React from "react";

const todoContext = React.createContext({
  todos: [],
  addTodoHandler: (todo) => {},
  deleteTodoHandler: (todo) => {},
  editTodoHandler: (todo) => {},
});

export default todoContext;
