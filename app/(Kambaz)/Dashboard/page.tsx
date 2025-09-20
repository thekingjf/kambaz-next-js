import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" alt="course image" width={200} height={150} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/Courses/1235" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" alt="course image" width={200} height={150} />
            <div>
              <h5> CS 4700 Network Fundamentals </h5>
              <p className="wd-dashboard-course-title">
                Network Engineer</p>
              <button> Go </button>
            </div>
          </Link>
           </div>
        <div className="wd-dashboard-course"> 
          <Link href="/Courses/1236" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" alt="course image" width={200} height={150} />
            <div>
              <h5> CS4550 Web Development </h5>
              <p className="wd-dashboard-course-title">
                Website developer</p>
              <button> Go </button>
            </div>
          </Link>
           </div>
           <div className="wd-dashboard-course"> 
          <Link href="/Courses/1237" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" alt="course image" width={200} height={150} />
            <div>
              <h5> CS3500 OOD </h5>
              <p className="wd-dashboard-course-title">
                Object Oriented Design</p>
              <button> Go </button>
            </div>
          </Link>
           </div>
      </div>
    </div>
);}
