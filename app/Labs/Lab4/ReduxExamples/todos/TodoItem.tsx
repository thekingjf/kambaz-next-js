import { ListGroupItem, Button }
  from "react-bootstrap";

import { useDispatch }
  from "react-redux";
import { deleteTodo, setTodo }
  from "./todosReducer";

export type Todo = {
  id: string; title: string };

export default function TodoItem({ todo } : { todo: Todo;}) {
const dispatch = useDispatch();
 return (
    <ListGroupItem key={todo.id}>
      <Button onClick={() =>
        dispatch(deleteTodo(todo.id))}>
        Delete </Button>
      <Button onClick={() =>
        dispatch(setTodo(todo))}>
        Edit </Button>
      {todo.title}
    </ListGroupItem>  );}
