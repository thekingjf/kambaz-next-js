"use client";
import "./style.css";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h6>Assignment Name</h6>
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description" rows={10} cols={45}>
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table>
        <tr>
          <td align="left" valign="middle">
            <label htmlFor="wd-points">Points </label>
          </td>
          <td align="left" valign="middle">
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <tr>
          <td align="left" valign="middle">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td align="left" valign="middle">
            <select id="wd-group">
              <option value="Assignments">ASSIGNMENTS</option>
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
            <select id="wd-display-grade-as">
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
              <select id="wd-submission-type">
                <option value="Online">Online</option>
                <option value="In Person">In Person</option>
              </select>

              <h5 className="wd-entry-title">Online Entry Options</h5>

              <div className="wd-entry-options">
                <label htmlFor="wd-text-entry">
                  <input type="checkbox" id="wd-text-entry" /> Text Entry
                </label>

                <label htmlFor="wd-website-url">
                  <input type="checkbox" id="wd-website-url" defaultChecked /> Website URL
                </label>

                <label htmlFor="wd-media-recordings">
                  <input type="checkbox" id="wd-media-recordings" /> Media Recordings
                </label>

                <label htmlFor="wd-student-annotation">
                  <input type="checkbox" id="wd-student-annotation" /> Student Annotation
                </label>

                <label htmlFor="wd-file-upload">
                  <input type="checkbox" id="wd-file-upload" /> File Uploads
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
              <input type="date" id="wd-due-date" defaultValue="2024-05-13" />
            </div>

            <div className="row-2">
              <div className="field">
                <label htmlFor="wd-available-from">Available from</label>
                <input type="date" id="wd-available-from" defaultValue="2024-05-06" />
              </div>

              <div className="field">
                <label htmlFor="wd-available-until">Until</label>
                <input type="date" id="wd-available-until" defaultValue="2024-05-20" />
              </div>
            </div>
          </div>
        </td>
        <br />
        <tr>
          <td></td>
          <td align="right" valign="middle"></td>
            <button id="wd-save-button" onClick={() => alert("Saved Successfully!")} type="button">Save</button>
            <button id="wd-cancel-button" onClick={() => alert("Changes Not Saved!")} type="button">Cancel</button>
        </tr>
      </table>
    </div>
);}
