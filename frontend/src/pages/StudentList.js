import { useEffect,useState }
from "react";

import API from "../api";

import Navbar
from "../components/Navbar";

import {
  Link,
  useLocation,
  useNavigate
}
from "react-router-dom";

import { Edit, Plus, Search, Trash2 }
from "lucide-react";

function StudentList() {

  const location = useLocation();
  const navigate = useNavigate();

  const [students,setStudents]
  = useState([]);

  const [searchTerm,setSearchTerm]
  = useState("");

  const [error,setError]
  = useState("");

  const [success, setSuccess]
  = useState(location.state?.success || "");

  const [loading,setLoading]
  = useState(true);

  const [pendingDelete, setPendingDelete] =
    useState(null);

  const loadStudents =
  async () => {

    try {

      const res =
        await API.get("students/");

      setStudents(res.data);

    } catch {

      setError("Unable to load students. Please try again.");

    } finally {

      setLoading(false);
    }
  };

  const deleteStudent =
  async (id) => {
    try {
      await API.delete(
        `students/delete/${id}/`
      );
      setPendingDelete(null);
      loadStudents();
    } catch {
      setError("Unable to delete this student. Please try again.");
    }
  };

  const confirmDelete = (student) => {
    setPendingDelete(student);
  };

  const cancelDelete = () => {
    setPendingDelete(null);
  };

  useEffect(() => {

    loadStudents();

  }, []);

  useEffect(() => {
    if (!location.state?.success) {
      return;
    }

    setSuccess(location.state.success);
    navigate(location.pathname, {
      replace: true,
      state: {},
    });
  }, [location.pathname, location.state, navigate]);

  const filteredStudents =
    students.filter((student) =>
      student.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  return (

    <>
      <Navbar />

      <main className="app-main">

        <div className="container">

          <div className="d-flex flex-column flex-sm-row justify-content-between gap-3 page-header">

            <div>
              <h1 className="page-title">
                Students
              </h1>
              <p className="page-subtitle">
                Search, review, and manage student records.
              </p>
            </div>

            <Link
              className="btn btn-primary d-inline-flex align-items-center justify-content-center gap-2"
              to="/add"
            >
              <Plus size={18} />
              Add Student
            </Link>

          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success" role="alert">
              {success}
            </div>
          )}

          {pendingDelete && (
            <div className="card card-soft mb-3">
              <div className="card-body p-3 d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
                <div>
                  <h2 className="h6 mb-1">
                    Delete student?
                  </h2>
                  <p className="mb-0 text-muted">
                    Confirm deletion of <strong>{pendingDelete.name}</strong> from the student directory.
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteStudent(pendingDelete.id)}
                  >
                    Yes, delete
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={cancelDelete}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="card card-soft">

            <div className="card-body p-3 p-sm-4">

              <div className="position-relative search-control mb-3">
                <Search className="position-absolute search-icon" size={18} />
                <input
                  className="form-control search-input"
                  placeholder="Search students by name"
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </div>

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead>

                    <tr>

                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Course</th>
                      <th className="text-end">Actions</th>

                    </tr>

                  </thead>

                  <tbody>

                    {loading && (
                      <tr>
                        <td colSpan="5" className="empty-state">
                          Loading students...
                        </td>
                      </tr>
                    )}

                    {!loading && filteredStudents.length === 0 && (
                      <tr>
                        <td colSpan="5" className="empty-state">
                          No students found.
                        </td>
                      </tr>
                    )}

                    {
                      !loading && filteredStudents.map(
                        student => (

                        <tr
                          key={student.id}
                        >

                          <td className="fw-semibold">
                            {student.name}
                          </td>

                          <td>
                            {student.email}
                          </td>

                          <td>
                            {student.phone}
                          </td>

                          <td>
                            {student.course}
                          </td>

                          <td className="text-end">

                            <Link
                              className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1 me-2"
                              to={
                                `/edit/${student.id}`
                              }
                            >
                              <Edit size={15} />
                              Edit
                            </Link>

                            <button
                              className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-1"
                              onClick={()=>
                                confirmDelete(student)
                              }
                            >
                              <Trash2 size={15} />
                              Delete
                            </button>

                          </td>

                        </tr>
                      ))
                    }

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </main>

    </>
  );
}

export default StudentList;
