"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import AssignmentControls from "./[aid]/AssignmentControls";
import * as db from "./../../../Database";
import { useParams } from "next/navigation";
import CourseNavigation from "../Navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store"
import { deleteAssignment } from "./reducer";
import { FaTrashCan } from "react-icons/fa6";

type Assignment = {
  _id: string;
  title: string;
  course: string;
};

type AssignmentDetail = {
  points: number;
  group:
    | "Assignments"
    | "Projects"
    | "Quizzes"
    | "Exams"
    | "Solo"
    | "Duo";
  displayGradeAs: "Percent" | "Fraction";
  submissionType: "Online" | "In Person";
  onlineEntryOptions: (
    | "Text Entry"
    | "Website URL"
    | "Media Recordings"
    | "Student Annotation"
    | "File Uploads"
  )[];
  availableFrom: string;
  availableUntil: string;
  dueAt: string;
};

type DetailMap = Record<string, AssignmentDetail>;

function fmtDate(iso: string) {
  const d = new Date(iso);
  const month = d.toLocaleString(undefined, { month: "long" });
  const day = d.getDate();
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  return `${month} ${day} at ${h}:${m}${ampm}`;
}

export default function Assignments() {
  const { cid } = useParams() as { cid: string };

  const dispatch = useDispatch();

  const list = useSelector(
    (state: RootState) => state.assignment.assignments
  ) as Assignment[];

  const { assignmentDetails } = db;
  const details = assignmentDetails as DetailMap;

  const courseAssignments = list.filter((a) => a.course === cid);

  const handleDelete = (id: string) => {
    dispatch(deleteAssignment(id));
  };

  return (
    <div id="wd-assignments" className="container-fluid">
      <div className="row">
        <aside className="d-none d-md-block col-md-3 col-lg-2">
          <div className="position-sticky" style={{ top: 16 }}>
            <CourseNavigation />
          </div>
        </aside>

        <main className="col-12 col-md-9 col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fs-4 mb-0">Assignments</h2>
            <AssignmentControls />
          </div>

          <ListGroup className="rounded-0">
            <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                ASSIGNMENTS 40% of Total
              </div>

              <ListGroup className="wd-assignment-list">
                {courseAssignments.map((a) => {
                  const d = details[a._id];
                  return (
                    <ListGroupItem
                      key={a._id}
                      className="wd-assignment-list-item d-flex justify-content-between align-items-start"
                    >
                      <div>
                        <Link
                          href={`/Courses/${a.course}/Assignments/${a._id}`}
                          className="wd-assignment-link"
                        >
                          {a.title}
                        </Link>

                        {d && (
                          <div className="mt-1">
                            Multiple Modules | <strong>Not available until</strong>{" "}
                            {fmtDate(d.availableFrom)} | <strong>Due</strong>{" "}
                            {fmtDate(d.dueAt)} | {d.points} pts
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        className="btn btn-link text-danger p-0 ms-3"
                        onClick={() => handleDelete(a._id)}
                        title="Delete assignment"
                      >
                        <FaTrashCan />
                      </button>
                    </ListGroupItem>

                  );
                })}
              </ListGroup>
            </ListGroupItem>
          </ListGroup>
        </main>
      </div>
    </div>
  );
}
