import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";
import StudentForm from "../components/StudentForm";

function AddStudent() {

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateStudent = () => {
    if (
      !student.name.trim() ||
      !student.email.trim() ||
      !student.phone.trim() ||
      !student.course.trim()
    ) {
      return "Please complete all student details.";
    }

    if (!/\S+@\S+\.\S+/.test(student.email)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const submit = async (e) => {

    e.preventDefault();
    setError("");

    const validationError = validateStudent();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {

      await API.post(
        "students/add/",
        student
      );

      navigate("/students", {
        state: {
          success: "Student added successfully.",
        },
        replace: true,
      });

    } catch {

      setError("Unable to add the student right now. Please try again.");
    } finally {

      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="app-main">

        <div className="container">

          <div className="row justify-content-center">

            <div className="col-lg-7 col-xl-6">

              <div className="page-header">
                <h1 className="page-title">
                  Add Student
                </h1>
                <p className="page-subtitle">
                  Enter the student details below.
                </p>
              </div>

              <div className="card card-soft">

                <div className="card-body p-4">

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <StudentForm
                    student={student}
                    onChange={setStudent}
                    onSubmit={submit}
                    submitLabel="Save Student"
                    loading={loading}
                  />

              </div>

            </div>

          </div>

        </div>

        </div>

      </main>
    </>
  );
}

export default AddStudent;
