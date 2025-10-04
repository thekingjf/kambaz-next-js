"use client"

import Link from "next/link";
import { useParams } from 'next/navigation';

export default function CourseNavigation() {
  const { cid } = useParams<{ cid: string }>();
  const { aid } = useParams<{ aid: string }>();

  return (
    <div className="wd list-group fs-5 rounded-0">
      <Link href={`/Courses/${cid}/Home`} className="list-group-item active border-0">
        Home </Link><br/>
      <Link href={`/Courses/${cid}/Modules`} className="list-group-item text-danger border">
      Modules
        </Link><br/>
      <Link href={`/Courses/${cid}/Piazza`} className="list-group-item text-danger border">Piazza</Link><br/>
      <Link href={`/Courses/${cid}/Zoom`} className="list-group-item text-danger border-0">Zoom</Link><br/>
      <Link href={`/Courses/${cid}/Assignments`} className="list-group-item text-danger border-0">
          Assignments</Link><br/>
      <Link href={`/Courses/${cid}/Quizzes`} className="list-group-item text-danger border-0">Quizzes
        </Link><br/>
      <Link href={`/Courses/${cid}/Grades`} className="list-group-item text-danger border-0">Grades</Link><br/>
      <Link href={`/Courses/${cid}/People/Table`} className="list-group-item text-danger border-0">People</Link><br/>
    </div>
  );}
