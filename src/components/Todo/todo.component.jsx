import React, { useContext } from "react";
import { withRouter } from "react-router-dom"
import TodoContext from "../../context/context";

import "./todo.styles.css";

const Todo = (props) => {
  const todoContext = useContext(TodoContext);

  return (
    <div className="alert todo container">
      <div className="row">
        <div className="col-9">
          <div className="index-title">
            <h4 className="index">{props.index}</h4>
            <h3>{props.todo.title}</h3>
          </div>

        </div>
        <div className="col-3 btn-group">
          <button
            className="edit-button btn"
            onClick={() => props.history.push("/todo/edit/" + props.todo.id, ["Hello"])}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => todoContext.deleteTodoHandler(props.todo)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Todo);
