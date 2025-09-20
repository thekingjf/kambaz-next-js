export default function Modules() {
  return (
    <div>
      <button> Collapse All</button>
      <button> View Progress</button>
      <select id="Publish Assignment">
        <option value="Publish All">Publish All</option>
        <option value="Publish Select">Publish Select</option>
      </select>
      <button> + Module</button>
      <ul>
        <li className="wd-module">
          <div className="wd-title">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">Learn what is Web Development</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
                <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to Web Development</li>
                <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                <li className="wd-content-item">Creating a React Application</li>
              </ul>
            </li>
            
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 2, Lecture 2 - Formatting User Interfaces with HTML</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                <li className="wd-content-item">Deploy Assignment to Netlify</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to HTML and the DOM</li>
                <li className="wd-content-item">Formatting Web content with Headings</li>
                <li className="wd-content-item">Formatting content with Lists and Tables</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">Week 3, Lecture 3 - Styling Web Pages with CSS and Bootstrap</div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to CSS</li>
                <li className="wd-content-item">Selectors by tag ID, classes, and document structure</li>
                <li className="wd-content-item">Styling color and background color</li>
                <li className="wd-content-item">Styling dimensions and positions</li>
                <li className="wd-content-item">The box model - styling margins, borders, and paddings</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">Developing Full Stack MERN Web Applications - Chapter 2 - Styling Web Pages with CSS Links to an external site.</li>
              </ul>
            </li>
            <li className="wd-lesson">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to Cascading Style Sheets Links to an external site.</li>
                <li className="wd-content-item">Styling with Colors</li>
                <li className="wd-content-item">The Box Model</li>
                <li className="wd-content-item">Size & Position</li>
                <li className="wd-content-item">Float</li>
                <li className="wd-content-item">Flex</li>
                <li className="wd-content-item">Rotating content & Gradient background Links to an external site.</li>

              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
);}
