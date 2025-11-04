import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import BooleanVariable from "./BooleanVariables";
import IfElse from "./IfElse";
import TernaryOperator from "./TernaryOperator";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import LegacyFunctions from "./LegacyFunctions";
import ArrowFunctions from "./ArrowFunctions";
import ImpliedReturn from "./ImpliedReturn";
import TemplateLiterals from "./TemplateLiterals";
import SimpleArrays from "./SimpleArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ForLoops from "./ForLoops";
import MapFunction from "./MapFunction";
import FindFunction from "./FindFunction";
import FilterFunction from "./FilterFunction";
import House from "./House"
import JsonStringify from "./JsonStringify";
import TodoList from "./todos/TodoList";
import Spreading from "./Spreading";
import Destructing from "./Destructing";
import FunctionDestructing from "./FunctionDestructing";
import DestructingImports from "./DestructingImports";
import Classes from "./Classes";
import Styles from "./Styles";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import PathParameters from "./PathParameters";
import AddPathParameters from "./add/[a]/[b]/page";
import { useSelector } from "react-redux";
import { RootState } from "../Lab4/store";
import { ListGroup } from "react-bootstrap";


export default function Lab3() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  return (
    <div id="wd-lab3">
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroup.Item key={todo.id}>
            {todo.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
      <h3>Lab 3</h3>
      <AddPathParameters />
      <PathParameters />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
     </Highlight>
      <h3>JavaScript</h3>
      <h4>Square of 4</h4>
      <Square> 4 </Square>
      <hr />
      <Add a={3} b={4} />
      <Styles />
      <Classes />
      <DestructingImports />
      <FunctionDestructing />
      <Destructing />
      <Spreading />
      <TodoList />
      <JsonStringify />
      <House />
      <FilterFunction />
      <FindFunction />
      <MapFunction />
      <ForLoops />
      <AddingAndRemovingToFromArrays />
      <ArrayIndexAndLength />
      <SimpleArrays />
      <TemplateLiterals />
      <ImpliedReturn />
      <ArrowFunctions />
      <LegacyFunctions />
      <ConditionalOutputInline />
      <ConditionalOutputIfElse />
      <TernaryOperator />
      <IfElse />
      <BooleanVariable />
      <VariableTypes />
      <VariablesAndConstants />
    </div>
  );
}


