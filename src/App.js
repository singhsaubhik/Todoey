import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux"
import shortid from "shortid";

import "./App.css";
import TodoList from "./components/Todo-list/todo-list.component";
import Context from "./context/context";
import AddTodo from "./components/Add-Todo/add-todo.component";
import { TODO_ACTIONS } from "./redux/todo/todo.reducer"

import { ReactComponent as Logo} from "./assets/logo.svg"

class App extends Component {
  

  addTodoHandler = (todoTitle) => {
    let todos = [];
    if (this.props.todos && this.props.todos.length > 0) {
      todos = [...this.props.todos];
    }

    const todo = { id: shortid.generate(), title: todoTitle }
    todos.push(todo);

    this.props.onAddTodo(todos)

    this.setState({ todos });
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  getTodoIndex = (todo) => {
    const todoIndex = this.props.todos.findIndex((t) => {
      return t.id === todo.id;
    });

    return todoIndex;
  };

  deleteTodoHandler = (todo) => {
    const todoIndex = this.getTodoIndex(todo);

    const todos = [...this.props.todos];
    todos.splice(todoIndex, 1);

    this.props.onDeleteTodo(todos)

    this.setState({ todos });
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  editTodoHandler = (todo) => {
    const todoIndex = this.getTodoIndex(todo);
    const todos = [...this.props.todos];
    todos[todoIndex] = todo;

    this.props.onEditTodo(todos)
    this.setState({ todos });
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    this.props.onAddTodos(todos)
  }

  render() {
    return (
      <Context.Provider
        value={{
          todos: this.props.todos,
          addTodoHandler: this.addTodoHandler,
          deleteTodoHandler: this.deleteTodoHandler,
          editTodoHandler: this.editTodoHandler,
        }}
      >
        <div className="App">
          <header>
            <Logo className="App__logo"/>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/todo/add">Add Todo</NavLink>
            <NavLink to="/todo/edit">Edit</NavLink>
          </header>
          <Switch>
            <Route
              path="/home"
              render={() => <TodoList todos={this.props.todos} />}
            />
            <Route path="/todo/add" component={AddTodo} />
            <Route path="/todo/edit/:id" render={() => <AddTodo isEdit={true} todos={this.props.todos} />} />

            <Redirect to="/home" from="/" exact />
          </Switch>
        </div>
      </Context.Provider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddTodo: (todos) => dispatch({ type: TODO_ACTIONS.ADD_TODO, payload: { todos } }),
    onAddTodos: (todos) => dispatch({ type: TODO_ACTIONS.ADD_ALL_TODOS, payload: { todos } }),
    onDeleteTodo: (todos) => dispatch({ type: TODO_ACTIONS.DELETE_TODO, payload: { todos } }),
    onEditTodo: (todos) => dispatch({ type: TODO_ACTIONS.EDIT_TODO, payload: { todos } })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
