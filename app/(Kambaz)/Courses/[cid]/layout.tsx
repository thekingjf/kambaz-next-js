import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../../Database";


export default async function CoursesLayout(
  { children, params }:
    Readonly<{ children: ReactNode;
    params: Promise<{ cid: string }> }>) {
  const { cid } = await params;
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses">
    <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name} {cid} </h2> <hr />
    <div className="d-flex">
      <div className="d-none d-sm-block">
        <CourseNavigation />
      </div>
      <div className="flex-fill">
        {children}
      </div></div>
  </div>
);}
