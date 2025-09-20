"use client"

import Link from "next/link";
import { useParams } from 'next/navigation';

export default function CourseNavigation() {
  const { cid } = useParams<{ cid: string }>();
  const { aid } = useParams<{ aid: string }>();

  return (
    <div id="wd-courses-navigation">
      <Link href={`/Courses/${cid}/Home`}>Home</Link><br/>
      <Link href={`/Courses/${cid}/Modules`}>Modules
        </Link><br/>
      <Link href={`/Courses/${cid}/Piazza`}>Piazza</Link><br/>
      <Link href={`/Courses/${cid}/Zoom`}>Zoom</Link><br/>
      <Link href={`/Courses/${cid}/Assignments`}>
          Assignments</Link><br/>
      <Link href={`/Courses/${cid}/Assignments/${aid}`}>
          Assignment Editor</Link><br/>
      <Link href={`/Courses/${cid}/Quizzes`}>Quizzes
        </Link><br/>
      <Link href={`/Courses/${cid}/Grades`}>Grades</Link><br/>
      <Link href={`/Courses/${cid}/People`}>People</Link><br/>
    </div>
  );}
