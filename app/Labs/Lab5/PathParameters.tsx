"use client"

import { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function PathParameters() {

  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  return (
    <div>
      <h3>Path Parameters</h3>

      <FormControl type="number" defaultValue={a}
             onChange={(e) => setA(e.target.value)}/>

      <FormControl type="number" defaultValue={b}
             onChange={(e) => setB(e.target.value)}/>
             
  <a href={`${HTTP_SERVER}/lab5/add/${a}/${b}`}>
     Add {a} + {b} </a>
	
  <a href={`${HTTP_SERVER}/lab5/subtract/${a}/${b}`}>
     Substract {a} - {b} </a>

  <a href={`${HTTP_SERVER}/lab5/multiply/${a}/${b}`}>
  Multiply {a} * {b} </a>
	
  <a href={`${HTTP_SERVER}/lab5/divide/${a}/${b}`}>
  Divide {a} / {b} </a>

 </div>
);}
