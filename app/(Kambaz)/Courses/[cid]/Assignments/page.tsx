import Link from "next/link";
import AssignmentControls from "./[aid]/AssignmentControls";

export default function Assignments() {
  return (
    <div>
    <AssignmentControls></AssignmentControls>
    <div id="wd-assignments">
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>{" "}
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML <br />
          </Link>
          Multiple Modules | <strong>Not available until</strong> May 6 at
          12:00am | <strong> Due </strong>May 13 at 11:59pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/124"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP <br />
          </Link>
          Multiple Modules | <strong>Not available until</strong> May 13 at
          12:00am | <strong> Due </strong>May 20 at 11:59pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/125"
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT <br />
          </Link>
          Multiple Modules | <strong>Not available until</strong> May 20 at
          12:00am | <strong> Due </strong>May 27 at 11:59pm | 100 pts
        </li>
      </ul>
    </div>
    </div>
  );
}
