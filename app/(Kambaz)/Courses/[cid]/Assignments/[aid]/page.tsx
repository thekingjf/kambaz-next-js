"use client";
import AssignmentControls from "./AssignmentControls";
export default function AssignmentEditor() {
  return (
    <div>
    <AssignmentControls></AssignmentControls>
    <div id="wd-assignments-editor">
      <h3>Assignment Name</h3>
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
            <select>
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
            <select>
              <option value="Percent">Percentage</option>
              <option value="Fraction">Fraction</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="left" valign="middle">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td> 
          <td align="left" valign="middle">
            <select>
              <option value="Online">Online</option>
              <option value="In Person">In Person</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="left" valign="top">
            <h5 id="wd-submission-type">Online Entry Options:</h5>
          </td>
          <td align="left" valign="top">
            <input type="checkbox" name="Online Entry Options" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>

            <input type="checkbox" name="Online Entry Options" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>

            <input type="checkbox" name="Online Entry Options" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

            <input type="checkbox" name="Online Entry Options" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>
                        
            <input type="checkbox" name="Online Entry Options" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Uploads</label>
          </td>
        </tr>
        <br />
        <tr>
          <td align="left" valign="middle">
            <label htmlFor="wd-assign-to">Assign Assignment to</label><br />
          </td>
          <td align="left" valign="middle">
            <input id="wd-assign-to" value="Everyone" />
          </td>
        </tr>
        <tr>
          <td align="left" valign="middle">
            <label htmlFor="wd-due-date">Due </label>
          </td>
          <br />
          <td align="left" valign="middle">
            <input type="date"
                  id="wd-due-date"
                  value="2024-05-13"/>
          </td>
        </tr>
        <tr>
          <td align="left" valign="middle">
            <label htmlFor="wd-available-from"> Avaliable from </label>
          </td>
          <br />
          <td align="left" valign="middle">
            <input type="date"
                  id="wd-available-from"
                  value="2024-05-06"/>
          </td>
        </tr>
        <tr>
          <td align="left" valign="middle">
            <label htmlFor="wd-available-until">Until </label><br />
          </td>
          <td align="left" valign="middle">
            <input type="date"
                  id="wd-available-until"
                  value="2024-05-20"/>
          </td>
        </tr>
        <tr>
          <td></td>
          <td align="right" valign="middle"></td>
            <button id="wd-save-button" onClick={() => alert("Saved Successfully!")} type="button">Save</button>
            <button id="wd-cancel-button" onClick={() => alert("Changes Not Saved!")} type="button">Cancel</button>
        </tr>
      </table>
    </div>
    </div>
);}
