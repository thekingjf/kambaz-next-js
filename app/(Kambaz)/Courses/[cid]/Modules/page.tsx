
"use client"
import { useParams } from "next/navigation";
import * as client from "../../client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../../store";
import ModuleControlButtons from "./ModuleControlButtons";
import { addModule, editModule, updateModule, deleteModule, setModules } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import CourseNavigation from "../Navigation";


export default function Modules() {
  const { cid } = useParams() as any;
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
  
    const newModule = { name: moduleName, course: cid };
  
    const module = await client.createModuleForCourse(cid, newModule);
  
    dispatch(setModules([...modules, module]));
  };
  
  const onRemoveModule = async (moduleId: string) => {

    await client.deleteModule(moduleId);
  
    const newModules = modules.
      filter((m: any) => m._id !== moduleId)
  
    dispatch(setModules(newModules));
  
  };

  const onUpdateModule = async (module: any) => {

    await client.updateModule(module);
  
    const newModules = modules.map(
      (m: any) => m._id === module._id ?
                            module : m );
  
    dispatch(setModules(newModules));
  };
  
  
  

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
        addModule={onCreateModuleForCourse} />
  <br /><br />
          <ListGroup id="wd-modules" className="rounded-0">
            {modules.map((module: any) => (
                <ListGroupItem
                  key={module._id}
                  className="wd-module p-0 mb-5 fs-5 border-gray"
                >
                  <div className="wd-title p-3 ps-2 bg-secondary">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}
                  { module.editing && (
                    <input className="form-control w-50 d-inline-block"
                          onChange={(e) => onUpdateModule({ ...module, name: e.target.value }) }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              onUpdateModule({ ...module, editing: false });
                            }
                          }}
                          value={module.name}/>
                  )}
                  <ModuleControlButtons moduleId={module._id}
                    deleteModule={(moduleId) => onRemoveModule(moduleId)}
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