import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import TodoContext from "../../context/context";

import "./todo.styles.scss";

import { ReactComponent as EditIcon } from "../../assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";

const Todo = (props) => {
  const todoContext = useContext(TodoContext);

  const windowWidth = window.screen.width;

  const deleteButton = (
    windowWidth > 768 ? <button
      className="btn_red"
      onClick={() => todoContext.deleteTodoHandler(props.todo)}
    >
      Delete
    </button> : <DeleteIcon className="todo__icon" style={{ marginLeft: "2rem" }} />
  );

  const editButton = (
    windowWidth > 768 ? <button
      className="btn_blue"
      onClick={() => props.history.push("/todo/edit/" + props.todo.id, ["Hello"])}
    >
      Edit
    </button> : <EditIcon className="todo__icon" />
  );


  return (
    <div className="todo">
      <div className="todo__index">
        <h4>{props.index}</h4>
      </div>

      <div className="todo__title">
        <span>{props.todo.title}</span>
      </div>

      <div className="todo__controls">
        {editButton}


        {deleteButton}
      </div>
    </div>
  );
};

export default withRouter(Todo);
