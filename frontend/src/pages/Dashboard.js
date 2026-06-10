import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Dashboard() {

  return (

    <>
      <Navbar />

      <div className="container mt-4">

        <h2>
          Welcome Admin
        </h2>

        <div className="row mt-4">

          <div className="col-md-4">

            <div className="card shadow">

              <div className="card-body">

                <h4>
                  Student Management
                </h4>

                <p>
                  Manage student records
                </p>

                <Link
                  className="btn btn-primary"
                  to="/students"
                >
                  View Students
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;