"use client";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { RootState } from "../../store";

type Course = {
  _id: string;
  name: string;
};

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams<{ cid: string }>();
  const { courses: courseList } = useSelector(
    (state: RootState) => state.coursesReducer
  ) as { courses: Course[] };

  const course = courseList.find((c) => c._id === cid);

  return (
    <div id="wd-courses">
      <h2>{course?.name ?? "Course"}</h2>
      {children}
    </div>
  );
}
