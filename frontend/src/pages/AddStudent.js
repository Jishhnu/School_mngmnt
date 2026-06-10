import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

function AddStudent() {

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const submit = async (e) => {

    e.preventDefault();

    if (
      !student.name ||
      !student.email ||
      !student.phone ||
      !student.course
    ) {
      alert("All fields are required");
      return;
    }

    try {

      await API.post(
        "students/add/",
        student
      );

      alert("Student Added Successfully");

      navigate("/students");

    } catch {

      alert("Failed to add student");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="row justify-content-center">

          <div className="col-md-6">

            <div className="card shadow">

              <div className="card-body">

                <h3 className="mb-4">
                  Add Student
                </h3>

                <form onSubmit={submit}>

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Name"
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        name: e.target.value
                      })
                    }
                  />

                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        email: e.target.value
                      })
                    }
                  />

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Phone"
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        phone: e.target.value
                      })
                    }
                  />

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Course"
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        course: e.target.value
                      })
                    }
                  />

                  <button
                    className="btn btn-success w-100"
                  >
                    Save Student
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default AddStudent;