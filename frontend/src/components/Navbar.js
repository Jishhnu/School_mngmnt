import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <nav className="navbar navbar-dark bg-primary">

      <div className="container">

        <Link
          className="navbar-brand"
          to="/dashboard"
        >
          WhiteFox
        </Link>

        <button
          className="btn btn-light"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;