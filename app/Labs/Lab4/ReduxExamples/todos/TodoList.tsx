import { Button, ListGroup, ListGroupItem }
  from "react-bootstrap";
import { useState } from "react";
import TodoItem, { Todo } from "./TodoItem";
import TodoForm from "./TodoForm";
import { useSelector } from "react-redux";

export default function TodoList() {
    const { todos } = useSelector( (state: any) => state.todosReducer);

 return (
    <div>
      <h2>Todo List</h2>
      <TodoForm />
      <ListGroup>
        {todos.map((todo: Todo) => (
          <TodoItem key={todo.id}
                    todo={todo} /> ))}
      </ListGroup> <hr/> </div> );}

