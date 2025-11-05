"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const { cid } = useParams<{ cid: string }>();
  const pathname = usePathname();

  const links = [
    { href: "Home",         label: "Home" },
    { href: "Modules",      label: "Modules" },
    { href: "Piazza",       label: "Piazza" },
    { href: "Zoom",         label: "Zoom" },
    { href: "Assignments",  label: "Assignments" },
    { href: "Quizzes",      label: "Quizzes" },
    { href: "Grades",       label: "Grades" },
    { href: "People/Table", label: "People" },
  ];

  return (
    // Vertical list on the left
    <ul className="nav nav-pills flex-column rounded-0">
      {links.map(({ href, label }) => {
        const active = pathname.endsWith(href);
        return (
          <li key={href} className="nav-item">
            <Link
              href={`/Courses/${cid}/${href}`}
              className={`nav-link ${active ? "active" : "text-danger"}`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
