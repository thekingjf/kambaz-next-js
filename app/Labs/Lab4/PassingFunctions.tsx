export default function PassingFunctions(
 {someFunction} : { someFunction: () => void }) {
  return (
   <div>
    <h2>Passing Functions</h2>
    <button onClick={someFunction}
            className="btn btn-primary">
      Invoke the Function
    </button>
    <hr/>
   </div>
 );}
