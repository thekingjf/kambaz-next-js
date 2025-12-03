
"use client"
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../../store";
import ModuleControlButtons from "./ModuleControlButtons";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import CourseNavigation from "../Navigation";


export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div className="row g-3">
      <aside className="d-none d-md-block col-md-3 col-lg-2">
        <div className="position-sticky" style={{ top: 16 }}>
          <CourseNavigation />
        </div>
      </aside>
  
      <main className="col-12 col-md-9 col-lg-10">
      <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          dispatch(addModule({
            name: moduleName, course: cid }));
          setModuleName("");
        }} />
  <br /><br />
          <ListGroup id="wd-modules" className="rounded-0">
            {modules
              .filter((module: any) => module.course === cid)
              .map((module: any) => (
                <ListGroupItem
                  key={module._id}
                  className="wd-module p-0 mb-5 fs-5 border-gray"
                >
                  <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}
                  { module.editing && (
                    <input className="form-control w-50 d-inline-block"
                          onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              dispatch(updateModule({ ...module, editing: false }));
                            }
                          }}
                          value={module.name}/>
                  )}
                  <ModuleControlButtons moduleId={module._id}
                    deleteModule={(moduleId) => {
                      dispatch(deleteModule(moduleId));}}
                    editModule={(moduleId) =>
                      dispatch(editModule(moduleId))} />
                  </div>
                </ListGroupItem>
              ))}
          </ListGroup>
        </div>
      </main>
    </div>
  );}