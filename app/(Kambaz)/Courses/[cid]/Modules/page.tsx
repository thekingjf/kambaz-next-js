import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";

export default function Modules() {
  return (
    <div>
  <ModulesControls /><br /><br /><br /><br />
  <ListGroup className="rounded-0">
    <ListGroupItem className="wd-module
                    p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary">
        Week 1</div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroupItem className="wd-lesson p-3 ps-1">
          LEARNING OBJECTIVES</ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Introduction to the course</ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Learn what is Web Development</ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          READING </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Full Stack Developer - Chapter 1 - Introduction </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Full Stack Developer - Chapter 2 - Creating User </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          SLIDES </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Introduction to Web Development </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Creating an HTTP server with Node.js </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Creating a React Application </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          LESSON 1 </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          LESSON 2 </ListGroupItem>
      </ListGroup>
    </ListGroupItem>
    <ListGroupItem className="wd-module
                    p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary">
        Week 2</div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroupItem className="wd-lesson p-3 ps-1">
          LEARNING OBJECTIVES</ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Learn how to create user interfaces with HTML</ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Deploy Assignment to Netlify</ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          SLIDES </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Introduction to HTML and the DOM </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Formatting Web content with Headings </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Formatting content with Lists and Tables </ListGroupItem>
      </ListGroup>
    </ListGroupItem>
    <ListGroupItem className="wd-module
                    p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary">
        Week 3</div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroupItem className="wd-lesson p-3 ps-1">
          LEARNING OBJECTIVES</ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Introduction to CSS</ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Selectors by tag ID, classes, and document structure</ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Styling color and background color </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Introduction to HTML and the DOM </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Styling dimensions and positions </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          The box model - styling margins, borders, and paddings </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          READING </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Developing Full Stack MERN Web Applications - Chapter 2 - Styling Web Pages with CSS Links to an external site. </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          SLIDES </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Introduction to Cascading Style Sheets Links to an external site. </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Styling with Colors </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          The Box Model </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Size & Position </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Float </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Flex </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
          Rotating content & Gradient background Links to an external site. </ListGroupItem>
      </ListGroup>
    </ListGroupItem>
    </ListGroup>
    </div>
);}
