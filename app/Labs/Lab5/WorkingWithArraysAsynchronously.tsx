"use client"

import React, { useState, useEffect } from "react";
import * as client from "./client";
import { FaTrash } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";

export default function WorkingWithArraysAsynchronously() {
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [todos, setTodos] = useState<any[]>([]);
  const fetchTodos = async () => {
    const todos = await client.fetchTodos();
    setTodos(todos);
  };
  const removeTodo = async (todo: any) => {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
  };

  const createTodo = async () => {
    const todos = await client.createTodo();
    setTodos(todos);
  };

  const postTodo = async () => {
    const newTodo = await client.postTodo({
          title: "New Posted Todo", completed: false, });
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }  };

  const editTodo = (todo: any) => {
    const updatedTodos = todos.map(
      (t) => t.id === todo.id ? { ...todo, editing: true } : t );
    setTodos(updatedTodos);
  };
  
  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (<div id="wd-todo-error-message"
         className="alert alert-danger mb-2 mt-2">
         {errorMessage}
    </div>)}
      <h4 className="d-flex align-items-center">
        <span>Todos</span> 
        <div className="ms-auto">
          <FaPlusCircle onClick={postTodo}
                className="text-primary fs-3 me-3"
                id="wd-post-todo"/>
          <FaPlusCircle onClick={createTodo}
                className="text-success fs-3"
                id="wd-create-todo" /> 
        </div>
      </h4>
      <ul className="list-group">
       {todos.map((todo) => (
    <li
    key={todo.id}
    className="list-group-item d-flex align-items-center"
  >
      
      <FaTrash onClick={() => removeTodo(todo)} className="float-end me-2 mt-1" />
      <TiDelete onClick={() => deleteTodo(todo)}
                className="text-danger float-end me-2 fs-3"
                id="wd-delete-todo" />
      <FaPencil onClick={() => editTodo(todo)}
              className="text-primary float-end me-2 mt-1" />
    <input type="checkbox" defaultChecked={todo.completed}
           onChange={(e) => updateTodo({ ...todo, completed: e.target.checked }) } />
           {!todo.editing ? ( todo.title ) : (
             <input className="form-control w-50 float-start"
                    defaultValue={todo.title}
                    onKeyDown={(e) => {
                     if (e.key === "Enter") {
                      updateTodo({ ...todo, editing: false });
                     }
                    }}
                    onChange={(e) =>
                     updateTodo({ ...todo, title: e.target.value })
                    }/>)}
   </li> ))}
  </ul> </div>
);}
 