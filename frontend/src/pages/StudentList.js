import { useEffect,useState }
from "react";

import API from "../api";

import Navbar
from "../components/Navbar";

import { Link }
from "react-router-dom";

function StudentList() {

  const [students,setStudents]
  = useState([]);

  const loadStudents =
  async () => {

    const res =
      await API.get("students/");

    setStudents(res.data);
  };

  const deleteStudent =
  async (id) => {

    if(
      !window.confirm(
        "Delete Student?"
      )
    ) return;

    await API.delete(
      `students/delete/${id}/`
    );

    loadStudents();
  };

  useEffect(() => {

    loadStudents();

  }, []);

  return (

    <>
      <Navbar />

      <div className="container mt-4">

        <div
          className="
          d-flex
          justify-content-between
          "
        >

          <h2>
            Students
          </h2>

          <Link
            className="btn btn-success"
            to="/add"
          >
            Add Student
          </Link>

        </div>

        <table
          className="
          table
          table-bordered
          mt-3
          "
        >

          <thead>

            <tr>

              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {
              students.map(
                student => (

                <tr
                  key={student.id}
                >

                  <td>
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

                  <td>

                    <Link
                      className="
                      btn
                      btn-warning
                      btn-sm
                      me-2
                      "
                      to={
                        `/edit/${student.id}`
                      }
                    >
                      Edit
                    </Link>

                    <button
                      className="
                      btn
                      btn-danger
                      btn-sm
                      "
                      onClick={()=>
                        deleteStudent(
                          student.id
                        )
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </>
  );
}

export default StudentList;