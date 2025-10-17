import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import AssignmentControls from "./[aid]/AssignmentControls";

export default function Assignments() {
  return (
    <div>
    <AssignmentControls></AssignmentControls>

    <div id="wd-assignments">
    <ListGroup className="rounded-0">
      <ListGroupItem className="wd-module
                    p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary">
        ASSIGNMENTS 40% of Total
      </div>
        <ListGroup className="wd-assignment-list">
          <ListGroupItem className="wd-assignment-list-item">
            <Link
              href="/Courses/1234/Assignments/123"
              className="wd-assignment-link"
            >
            A1 - ENV + HTML <br />
            </Link>
            Multiple Modules | <strong>Not available until</strong> May 6 at
            12:00am | <strong> Due </strong>May 13 at 11:59pm | 100 pts
          </ListGroupItem>
          <ListGroupItem className="wd-assignment-list-item">
            <Link
              href="/Courses/1234/Assignments/124"
              className="wd-assignment-link"
            >
              A2 - CSS + BOOTSTRAP <br />
            </Link>
            Multiple Modules | <strong>Not available until</strong> May 13 at
            12:00am | <strong> Due </strong>May 20 at 11:59pm | 100 pts
          </ListGroupItem>
          <ListGroupItem className="wd-assignment-list-item">
            <Link
              href="/Courses/1234/Assignments/125"
              className="wd-assignment-link"
            >
              A3 - JAVASCRIPT + REACT <br />
            </Link>
            Multiple Modules | <strong>Not available until</strong> May 20 at
            12:00am | <strong> Due </strong>May 27 at 11:59pm | 100 pts
          </ListGroupItem>
        </ListGroup>
      </ListGroupItem>
    </ListGroup>




    </div>
    </div>
  );
}
