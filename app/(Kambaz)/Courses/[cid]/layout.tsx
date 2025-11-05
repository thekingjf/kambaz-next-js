"use client";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses: courseList } = useSelector(
    (state: RootState) => state.coursesReducer
  );
  const course = courseList.find((c: any) => c._id === cid);

  return (
    <div id="wd-courses">
      <h2>{course?.name ?? "Course"}</h2>
      {children}
    </div>
  );
}