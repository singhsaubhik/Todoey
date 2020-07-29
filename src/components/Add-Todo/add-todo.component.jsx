import React, { useState, useContext, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TodoContext from "../../context/context";
import "./add-todo.styles.scss";

const AddTodo = (props) => {
  const todoContext = useContext(TodoContext);
  const textInput = useRef(null);

  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    textInput.current.value = "";

  }, [props.isEdit]);

  useEffect(() => {
    console.log(props);

    if (props.isEdit) {
      const todoId = props.match.params.id;
      const todo = props.todos.find(todo => todo.id === todoId);

      if (todo !== undefined) {
        textInput.current.value = todo.title;
      }
    }
    textInput.current.focus();

    // eslint-disable-next-line
  }, []);



  const onTextChangeHandler = (event) => {
    setTodoText(event.target.value);
  };

  const addTodo = () => {
    todoContext.addTodoHandler(todoText);
    textInput.current.value = "";
    props.history.replace("/home");
    reset();
  };

  const reset = () => {
    textInput.current.value = "";
    props.history.replace("/home");
  };

  const editTodo = () => {
    const todoId = props.match.params.id;
    const todo = { id: todoId, title: todoText };
    todoContext.editTodoHandler(todo);
    reset();
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (props.isEdit) {
      editTodo();
    } else {
      addTodo();
    }
  };


  const button = (
    <button
      type="submit"
      className="btn"
      onClick={onSubmitHandler}
    >
      {props.isEdit ? "Edit Todo" : "Add Todo"}
    </button>
  );

  return (
    <div className="add-todo bg-card">
      <div className="add-todo__title">
        <h1>{props.isEdit ? "Edit Todo" : "Add Todo"}</h1>
      </div>

      <div className="add-todo__forms">
        <form onSubmit={onSubmitHandler}>
          <input
            className="add-todo__forms_text_input"
            type="text"
            ref={textInput}
            placeholder={props.isEdit ? "Edit todo" : "Add Todo"}
            onChange={onTextChangeHandler}
          />
        </form>
        {button}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return state;
};


export default connect(mapStateToProps)(withRouter(AddTodo));
