import { createSlice }
  from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "1",  title: "Learn Mongo" },
};
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
   deleteTodo: (state, action) => {
     const id = action.payload;
     const newTodos = state.todos.filter(
       (todo) => todo.id !== id);
     state.todos = newTodos;
   },
addTodo: (state, action) => {
   const timeStamp = new Date().toISOString();
   const newTodo = { id: timeStamp,
                     title: state.todo.title };
   const newTodos = [...state.todos, newTodo];
   state.todos = newTodos;
   state.todo = { id: state.todo.id, title: "" };
},
updateTodo: (state, action) => {
   const newTodos = state.todos.map((t) =>
   t.id === state.todo.id ?
     state.todo : t );
   state.todos = newTodos;
   state.todo = { id: "", title: "" };
},
   setTodo: (state, action) => {
     state.todo = action.payload;
   },
 },
});
export const { addTodo,
  deleteTodo, updateTodo, setTodo }
  = todosSlice.actions;
export default todosSlice.reducer;
