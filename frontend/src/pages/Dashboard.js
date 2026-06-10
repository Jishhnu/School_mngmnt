import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import API from "../api";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  Plus,
  TrendingUp,
  Users
} from "lucide-react";

function Dashboard() {

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await API.get("students/");
        setStudents(response.data);
      } catch {
        setError("Unable to load dashboard summary right now.");
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const totalStudents = students.length;

  const totalCourses = useMemo(() => {
    const courses = students
      .map((student) => student.course)
      .filter(Boolean);

    return new Set(courses).size;
  }, [students]);

  const recentStudents = students.slice(-5).reverse();

  const overviewItems = [
    {
      label: "Student directory",
      status: loading ? "Loading..." : error ? "Unavailable" : "Ready",
      variant: loading ? "secondary" : error ? "danger" : "success",
    },
    {
      label: "Add student form",
      status: "Ready",
      variant: "success",
    },
    {
      label: "Edit and delete actions",
      status: loading ? "Loading..." : error ? "Unavailable" : "Ready",
      variant: loading ? "secondary" : error ? "danger" : "success",
    },
  ];

  return (

    <>
      <Navbar />

      <main className="app-main">

        <div className="container">

          <section className="dashboard-hero page-header">
            <div>
              <h1 className="page-title">
                Welcome Admin
              </h1>
              <p className="page-subtitle">
                Review student activity and jump into the most common actions.
              </p>
            </div>

            <Link
              className="btn btn-primary d-inline-flex align-items-center gap-2"
              to="/add"
            >
              <Plus size={18} />
              Add Student
            </Link>
          </section>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="row g-4">

            <div className="col-md-6 col-xl-3">

              <div className="card card-soft h-100">

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="stat-label">
                      Total Students
                    </span>
                    <div className="brand-mark">
                      <Users size={20} />
                    </div>
                  </div>

                  <div className="stat-value">
                    {loading ? "..." : totalStudents}
                  </div>

                  <p className="text-muted mb-0">
                    Active records in the system.
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-6 col-xl-3">

              <div className="card card-soft h-100">

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="stat-label">
                      Courses
                    </span>
                    <div className="brand-mark">
                      <BookOpen size={20} />
                    </div>
                  </div>

                  <div className="stat-value">
                    {loading ? "..." : totalCourses}
                  </div>

                  <p className="text-muted mb-0">
                    Unique courses assigned.
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-6 col-xl-3">

              <div className="card card-soft h-100">

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="stat-label">
                      Recent Adds
                    </span>
                    <div className="brand-mark">
                      <TrendingUp size={20} />
                    </div>
                  </div>

                  <div className="stat-value">
                    {loading ? "..." : recentStudents.length}
                  </div>

                  <p className="text-muted mb-0">
                    Latest records shown below.
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-6 col-xl-3">

              <div className="card card-soft h-100">

                <div className="card-body p-4">

                  <div className="brand-mark mb-3">
                    <ClipboardList size={20} />
                  </div>

                  <h2 className="h5 fw-bold mb-2">
                    Quick Actions
                  </h2>

                  <p className="text-muted mb-4">
                    Open the student list or add a new student record.
                  </p>

                  <div className="d-grid gap-2">
                    <Link
                      className="btn btn-primary d-inline-flex justify-content-center align-items-center gap-2"
                      to="/students"
                    >
                      Student List
                      <ArrowRight size={17} />
                    </Link>

                    <Link
                      className="btn btn-outline-primary d-inline-flex justify-content-center align-items-center gap-2"
                      to="/add"
                    >
                      <Plus size={17} />
                      Add Student
                    </Link>
                  </div>

                </div>

              </div>

            </div>

          </div>

          <div className="row g-4 mt-1">

            <div className="col-lg-7">

              <div className="card card-soft h-100">

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="h5 fw-bold mb-0">
                      Recent Students
                    </h2>
                    <Link className="small fw-semibold text-decoration-none" to="/students">
                      View all
                    </Link>
                  </div>

                  {loading && (
                    <p className="text-muted mb-0">
                      Loading recent students...
                    </p>
                  )}

                  {!loading && recentStudents.length === 0 && (
                    <p className="text-muted mb-0">
                      No student records yet.
                    </p>
                  )}

                  {!loading && recentStudents.length > 0 && (
                    <div className="list-group list-group-flush">
                      {recentStudents.map((student) => (
                        <div
                          className="list-group-item px-0 d-flex justify-content-between align-items-center"
                          key={student.id}
                        >
                          <div>
                            <div className="fw-semibold">
                              {student.name}
                            </div>
                            <div className="text-muted small">
                              {student.email}
                            </div>
                          </div>
                          <span className="badge text-bg-light border">
                            {student.course}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

              </div>

            </div>

            <div className="col-lg-5">

              <div className="card card-soft dashboard-overview-card">

                <div className="card-body p-4">

                  <h2 className="h5 fw-bold mb-3">
                    Management Overview
                  </h2>

                  {overviewItems.map((item) => (
                    <div className="overview-row" key={item.label}>
                      <span>{item.label}</span>
                      <span className={`badge text-bg-${item.variant}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>
    </>
  );
}

export default Dashboard;
