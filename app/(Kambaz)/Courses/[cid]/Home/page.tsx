import Modules from "../Modules/page";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home" className="container-fluid">
      <div className="row g-3">
      <br /><br />
        <main className="col-12 col-md-9 col-lg-9">
          <Modules />
          <br /><br /><br /><br /><br /><br /><br />
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
