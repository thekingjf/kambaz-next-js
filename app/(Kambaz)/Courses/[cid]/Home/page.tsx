// app/Courses/[cid]/Home/page.tsx
import Modules from "../Modules/page";
import CourseStatus from "./Status";
import CourseNavigation from "../Navigation";

export default function Home() {
  return (
    <div id="wd-home" className="container-fluid">
      <div className="row g-3">
        <aside className="d-none d-md-block col-md-3 col-lg-2">
          <div className="position-sticky" style={{ top: 16 }}>
            <CourseNavigation />
          </div>
        </aside>

        <main className="col-12 col-md-7 col-lg-7">
          <Modules />
        </main>

        <aside className="d-none d-lg-block col-lg-3">
          <div className="position-sticky" style={{ top: 16 }}>
            <CourseStatus />
          </div>
        </aside>
      </div>
    </div>
  );
}
