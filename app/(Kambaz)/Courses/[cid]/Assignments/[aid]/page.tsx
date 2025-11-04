"use client";
import "./style.css";
import { useParams } from "next/navigation";
import * as db from "./../../../../Database";

type Assignment = { 
  _id: string; 
  title: string; 
  course: string 
};

type AssignmentDetail = {
  points: number;
  group: 
  "Assignments" 
  | "Projects" 
  | "Quizzes" 
  | "Exams" 
  | "Solo" 
  | "Duo";
  displayGradeAs: 
  "Percent" 
  | "Fraction";
  submissionType: 
  "Online" 
  | "In Person";
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


export default function AssignmentEditor() {

  const { cid, aid } = useParams() as { cid: string; aid: string };

  const assignments = db.assignments as Assignment[];
  const detailsMap = db.assignmentDetails as Record<string, AssignmentDetail>;

  const assignment = assignments.find(a => a._id === aid && a.course === cid);
  const detail = detailsMap[aid];

  const toYMD = (iso: string) => new Date(iso).toISOString().slice(0, 10);
  return (
    <div id="wd-assignments-editor">
      <h6>Assignment Name</h6>
      <input id="wd-name" defaultValue={assignment.title} /><br /><br />

      <textarea id="wd-description" rows={10} cols={45}>
        The assignment is available online. Submit a link to the landing page of
      </textarea>
      <br />

      <table>
        <tr>
          <td align="left" valign="middle">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td align="left" valign="middle">
            <input id="wd-points" defaultValue={detail.points} />
          </td>
        </tr>

        <tr>
          <td align="left" valign="middle">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td align="left" valign="middle">
            <select id="wd-group" defaultValue={detail.group}>
              <option value="Assignments">ASSIGNMENTS</option>
              <option value="Projects">PROJECTS</option>
              <option value="Quizzes">QUIZZES</option>
              <option value="Exams">EXAMS</option>
              <option value="Solo">SOLO</option>
              <option value="Duo">DUO</option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="left" valign="middle">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td align="left" valign="middle">
            <select id="wd-display-grade-as" defaultValue={detail.displayGradeAs}>
              <option value="Percent">Percentage</option>
              <option value="Fraction">Fraction</option>
            </select>
          </td>
        </tr>

        <br />

        <tr>
          <label htmlFor="wd-submission-type">Submission Type</label>
          <td colSpan={2}>
            <div id="wd-sub-type-box">
              <select id="wd-submission-type" defaultValue={detail.submissionType}>
                <option value="Online">Online</option>
                <option value="In Person">In Person</option>
              </select>

              <h5 className="wd-entry-title">Online Entry Options</h5>
              <div className="wd-entry-options">
                <label htmlFor="wd-text-entry">
                  <input
                    type="checkbox"
                    id="wd-text-entry"
                    defaultChecked={detail.onlineEntryOptions.includes("Text Entry")}
                  />{" "}
                  Text Entry
                </label>

                <label htmlFor="wd-website-url">
                  <input
                    type="checkbox"
                    id="wd-website-url"
                    defaultChecked={detail.onlineEntryOptions.includes("Website URL")}
                  />{" "}
                  Website URL
                </label>

                <label htmlFor="wd-media-recordings">
                  <input
                    type="checkbox"
                    id="wd-media-recordings"
                    defaultChecked={detail.onlineEntryOptions.includes("Media Recordings")}
                  />{" "}
                  Media Recordings
                </label>

                <label htmlFor="wd-student-annotation">
                  <input
                    type="checkbox"
                    id="wd-student-annotation"
                    defaultChecked={detail.onlineEntryOptions.includes("Student Annotation")}
                  />{" "}
                  Student Annotation
                </label>

                <label htmlFor="wd-file-upload">
                  <input
                    type="checkbox"
                    id="wd-file-upload"
                    defaultChecked={detail.onlineEntryOptions.includes("File Uploads")}
                  />{" "}
                  File Uploads
                </label>
              </div>
            </div>
          </td>
        </tr>

        <br />

        <label>Assign to</label>
        <td colSpan={2}>
          <div className="assign-card">
            <div className="field">
              <label htmlFor="wd-assign-to-input">Assign to</label>
              <input id="wd-assign-to-input" defaultValue="Everyone" />
            </div>

            <div className="field">
              <label htmlFor="wd-due-date">Due</label>
              <input type="date" id="wd-due-date" defaultValue={toYMD(detail.dueAt)} />
            </div>

            <div className="row-2">
              <div className="field">
                <label htmlFor="wd-available-from">Available from</label>
                <input type="date" id="wd-available-from" defaultValue={toYMD(detail.availableFrom)} />
              </div>

              <div className="field">
                <label htmlFor="wd-available-until">Until</label>
                <input type="date" id="wd-available-until" defaultValue={toYMD(detail.availableUntil)} />
              </div>
            </div>
          </div>
        </td>

        <br />

        <tr>
          <td></td>
          <td align="right" valign="middle"></td>
          <button id="wd-save-button" type="button">Save</button>
          <button id="wd-cancel-button" type="button">Cancel</button>
        </tr>
      </table>
    </div>
);}
