import { Link, NavLink, useNavigate } from "react-router-dom";
import { GraduationCap, LayoutDashboard, LogOut, Users } from "lucide-react";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <nav className="navbar fixed-top navbar-expand-sm bg-white">

      <div className="container">

        <Link
          className="navbar-brand d-flex align-items-center gap-2 text-dark fw-bold"
          to="/dashboard"
        >
          <span className="brand-mark">
            <GraduationCap size={20} />
          </span>
          WhiteFox Media
        </Link>

        <div className="d-flex align-items-center gap-2 ms-auto">

          <div className="navbar-nav flex-row gap-1">
            <NavLink
              className={({ isActive }) =>
                `nav-link app-nav-link d-inline-flex align-items-center gap-1 ${isActive ? "active" : ""}`
              }
              to="/dashboard"
            >
              <LayoutDashboard size={16} />
              Dashboard
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `nav-link app-nav-link d-inline-flex align-items-center gap-1 ${isActive ? "active" : ""}`
              }
              to="/students"
            >
              <Users size={16} />
              Students
            </NavLink>
          </div>

          <button
            className="btn btn-outline-primary d-inline-flex align-items-center gap-2"
            onClick={logout}
          >
            <LogOut size={17} />
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
