import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import API from "../api";
import Navbar from "../components/Navbar";

function EditStudent() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  useEffect(() => {

    loadStudent();

  }, []);

  const loadStudent = async () => {

    try {

      const response =
        await API.get(
          `students/${id}/`
        );

      setStudent(response.data);

    } catch {

      alert("Student Not Found");
    }
  };

  const updateStudent = async (e) => {

    e.preventDefault();

    try {

      await API.put(
        `students/update/${id}/`,
        student
      );

      alert("Student Updated");

      navigate("/students");

    } catch {

      alert("Update Failed");
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
                  Edit Student
                </h3>

                <form
                  onSubmit={updateStudent}
                >

                  <input
                    type="text"
                    className="form-control mb-3"
                    value={student.name}
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
                    value={student.email}
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
                    value={student.phone}
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
                    value={student.course}
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        course: e.target.value
                      })
                    }
                  />

                  <button
                    className="btn btn-warning w-100"
                  >
                    Update Student
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

export default EditStudent;