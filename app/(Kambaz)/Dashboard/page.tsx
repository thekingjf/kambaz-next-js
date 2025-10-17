import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
    <h1>Dashboard</h1> <hr />
    <h2>Published Courses (12)</h2> <hr />
    <div id="wd-dashboard-courses">
    <Row xs={1} md={5} className="g-4">
    <Col className="wd-dashboard-course"
              style={{ width: "300px" }}>
          <Card>
          <Link className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                href="/Courses/1234/Home">
            <CardImg variant="top"  width="100%" 
      src="/images/reactjs.jpg" height={160}/>
      <CardBody>
              <CardTitle className="wd-dashboard-course-title
                                    text-nowrap overflow-hidden">
                          CS1234 React JS</CardTitle>
              <CardText  className="wd-dashboard-course-description
                                    overflow-hidden" style={{ height: "100px" }}>
                          Full Stack software developer</CardText>
              <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
        </Card>
      </Col>
      <Col className="wd-dashboard-course"
           style={{ width: "300px" }}> 
          <Card>
          <Link className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                href="/Courses/1235">
            <CardImg variant="top"  width="100%" 
      src="/images/reactjs.jpg" height={160}/>
      <CardBody>
              <CardTitle className="wd-dashboard-course-title
                                    text-nowrap overflow-hidden">
                          CS4700 Network Fundamentals</CardTitle>
              <CardText  className="wd-dashboard-course-description
                                    overflow-hidden" style={{ height: "100px" }}>
                          Network Engineer</CardText>
              <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
        </Card>
      </Col>
    <Col className="wd-dashboard-course"
           style={{ width: "300px" }}> <Card>
          <Link className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                href="/Courses/1236">
            <CardImg variant="top"  width="100%" 
      src="/images/reactjs.jpg" height={160}/>
      <CardBody>
              <CardTitle className="wd-dashboard-course-title
                                    text-nowrap overflow-hidden">
                          CS4550 Web Development</CardTitle>
              <CardText  className="wd-dashboard-course-description
                                    overflow-hidden" style={{ height: "100px" }}>
                          Website developer</CardText>
              <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
        </Card>
      </Col>
      <Col className="wd-dashboard-course"
           style={{ width: "300px" }}> <Card>
          <Link className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                href="/Courses/1237">
            <CardImg variant="top"  width="100%" 
      src="/images/reactjs.jpg" height={160}/>
      <CardBody>
              <CardTitle className="wd-dashboard-course-title
                                    text-nowrap overflow-hidden">
                          CS3500 OOD</CardTitle>
              <CardText  className="wd-dashboard-course-description
                                    overflow-hidden" style={{ height: "100px" }}>
                          Object Oriented Design</CardText>
              <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
        </Card>
      </Col>
      <Col className="wd-dashboard-course"
           style={{ width: "300px" }}> <Card>
          <Link className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                href="/Courses/1238">
            <CardImg variant="top"  width="100%" 
      src="/images/reactjs.jpg" height={160}/>
      <CardBody>
              <CardTitle className="wd-dashboard-course-title
                                    text-nowrap overflow-hidden">
                          CS2500 Fundies 1</CardTitle>
              <CardText  className="wd-dashboard-course-description
                                    overflow-hidden" style={{ height: "100px" }}>
                          Fundamentals of Programming 1</CardText>
              <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
        </Card>
      </Col>
      <Col className="wd-dashboard-course"
           style={{ width: "300px" }}> <Card>
          <Link className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                href="/Courses/1239">
            <CardImg variant="top"  width="100%" 
      src="/images/reactjs.jpg" height={160}/>
      <CardBody>
              <CardTitle className="wd-dashboard-course-title
                                    text-nowrap overflow-hidden">
                          CS2510 Fundies 2</CardTitle>
              <CardText  className="wd-dashboard-course-description
                                    overflow-hidden" style={{ height: "100px" }}>
                          Fundamentals of Programming 2</CardText>
              <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
        </Card>
      </Col>
      <Col className="wd-dashboard-course"
           style={{ width: "300px" }}> <Card>
          <Link className="wd-dashboard-course-link
                           text-decoration-none text-dark"
                href="/Courses/1237">
            <CardImg variant="top"  width="100%" 
      src="/images/reactjs.jpg" height={160}/>
      <CardBody>
              <CardTitle className="wd-dashboard-course-title
                                    text-nowrap overflow-hidden">
                          CS4410 Compilers</CardTitle>
              <CardText  className="wd-dashboard-course-description
                                    overflow-hidden" style={{ height: "100px" }}>
                          Compilers</CardText>
              <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
        </Card>
      </Col>
      
    </Row>
    </div>
    </div>
);}
