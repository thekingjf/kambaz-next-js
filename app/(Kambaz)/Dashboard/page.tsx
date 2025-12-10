"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
import * as client from "../Courses/client";
import { setCourses } from "../Courses/reducer";
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

type UserRole = "FACULTY" | "ADMIN" | "TA" | "STUDENT";

type User = {
  _id: string;
  username: string;
  role?: UserRole;
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

  const courses = useSelector<RootState, Course[]>((state) => state.coursesReducer.courses as Course[]);
  const currentUser = useSelector<RootState, User | null>(
    (state) => state.accountReducer.currentUser as User | null
  );

  const isInstructor = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [showAllCourses, setShowAllCourses] = useState(false);

  const enrolledCourseIds = useMemo(
    () => new Set(enrolledCourses.map((c) => c._id)),
    [enrolledCourses]
  );

  const fetchCourses = async () => {
    if (!currentUser) return;
    if (isInstructor) {
      const myCourses = await client.findMyCourses();
      dispatch(setCourses(myCourses));
    } else {
      const [myCourses, all] = await Promise.all([
        client.findMyCourses(),
        client.fetchAllCourses(),
      ]);
      setEnrolledCourses(myCourses);
      setAllCourses(all);
      dispatch(setCourses(myCourses));
      setShowAllCourses(false);
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c) => (c._id === course._id ? course : c))
      )
    );
  };

  const toggleEnrollmentsView = () => {
    if (isInstructor) return;
    if (showAllCourses) {
      dispatch(setCourses(enrolledCourses));
      setShowAllCourses(false);
    } else {
      dispatch(setCourses(allCourses));
      setShowAllCourses(true);
    }
  };

  const handleToggleEnrollment = async (courseId: string, isEnrolled: boolean) => {
    if (isEnrolled) {
      await client.unenrollFromCourse("current", courseId);
      const updated = enrolledCourses.filter((c) => c._id !== courseId);
      setEnrolledCourses(updated);
      if (!showAllCourses) {
        dispatch(setCourses(updated));
      }
    } else {
      await client.enrollIntoCourse("current", courseId);
      const fromAll =
        allCourses.find((c) => c._id === courseId) ||
        courses.find((c) => c._id === courseId);
      if (fromAll) {
        const updated = [...enrolledCourses, fromAll];
        setEnrolledCourses(updated);
        if (!showAllCourses) {
          dispatch(setCourses(updated));
        }
      }
    }
  };

  const canAccessCourse = (courseId: string) =>
    isInstructor || enrolledCourseIds.has(courseId);

  const handleGoToCourse = (courseId: string) => {
    if (canAccessCourse(courseId)) {
      router.push(`/Courses/${courseId}/Home`);
    } else {
      alert("You must enroll in this course before accessing it.");
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser, isInstructor]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const handleEdit = (selected: Course) => {
    setCourse(selected);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title" className="clearfix">
        Dashboard
        {!isInstructor && (
          <Button className="float-end" variant="primary" onClick={toggleEnrollmentsView}>
            {showAllCourses ? "Show My Courses" : "Enrollments"}
          </Button>
        )}
      </h1>
      <hr />

      {isInstructor && (
        <>
          <h5>
            New Course
            <button className="btn btn-primary float-end" onClick={onAddNewCourse}>
              Add
            </button>
          </h5>

          <Button onClick={onUpdateCourse}>Update</Button>

          <br />

          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />

          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {isInstructor
          ? `Published Courses (${courses.length})`
          : showAllCourses
          ? `All Courses (${courses.length})`
          : `My Courses (${courses.length})`}
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c: Course) => {
            const isEnrolled = enrolledCourseIds.has(c._id);

            return (
              <Col
                key={c._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
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

                    <Button
                      className="btn btn-primary me-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleGoToCourse(c._id);
                      }}
                    >
                      Go
                    </Button>

                    {isInstructor && (
                      <>
                        <Button
                          className="me-2"
                          onClick={(event) => {
                            event.preventDefault();
                            handleEdit(c);
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="danger"
                          onClick={(event) => {
                            event.preventDefault();
                            onDeleteCourse(c._id);
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    )}

                    {!isInstructor && (
                      <Button
                        variant={isEnrolled ? "danger" : "success"}
                        className="ms-2"
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggleEnrollment(c._id, isEnrolled);
                        }}
                      >
                        {isEnrolled ? "Unenroll" : "Enroll"}
                      </Button>
                    )}
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
