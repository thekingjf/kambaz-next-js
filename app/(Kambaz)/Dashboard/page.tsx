"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, setCourses, updateCourse} from "../Courses/reducer";
import * as client from "../Courses/client";
import { Row, Col, Card, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
import type { RootState } from "../store";

type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  image: string;
  description: string;
};

export default function Dashboard() {
  const dispatch = useDispatch();

  const courses = useSelector(
    (state: RootState) => state.coursesReducer.courses
  ) as Course[];

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchCourses = async () => {
    try {
      const fetchedCourses = await client.findMyCourses();
      dispatch(setCourses(fetchedCourses));
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([ ...courses, newCourse ]));
  };

  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) =>
      course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })));};

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const handleAdd = () => {
    dispatch(addNewCourse(course));
  };

  const handleUpdate = () => {
    dispatch(updateCourse(course));
  };

  const handleEdit = (selected: Course) => {
    setCourse(selected);
  };
  

  const handleDelete = (id: string) => {
    dispatch(deleteCourse(id));
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          onClick={handleAdd}
        >
          Add
        </button>
      </h5>

      <Button onClick={onUpdateCourse} >
        Update
      </Button>

      <br />

      <input
        value={course.name}
        className="form-control mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <textarea
        value={course.description}
        className="form-control"
        onChange={(e) =>
          setCourse({ ...course, description: e.target.value })
        }
      />

      <hr />

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c: Course) => (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/Courses/${c._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    variant="top"
                    src={c.image || "/images/reactjs.jpg"}
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.description}
                    </CardText>
                    <button onClick={onAddNewCourse} >
                    Add </button>
                    <Button className="btn btn-primary">Go</Button>

                    <Button
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        handleEdit(c);
                      }}
                      className="me-2 float-end"
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={(event) => {
                        event.preventDefault();
                        onDeleteCourse(course._id);
                      }}
                    >
                      Delete
                    </Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
