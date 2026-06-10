import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { LogIn, GraduationCap } from "lucide-react";

function Login() {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [username,setUsername] =
    useState("");

  const [password,setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const login = async (e) => {

    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);

    try {

      const response =
        await API.post(
          "login/",
          {
            username,
            password
          }
        );

      localStorage.setItem(
        "token",
        response.data.access
      );

      navigate("/dashboard");

    }

    catch {

      setError("We could not sign you in. Please check your credentials and try again.");
    }

    finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-vh-100 d-flex align-items-center bg-white">

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-sm-10 col-md-7 col-lg-5 col-xl-4">

            <div className="card card-soft">

              <div className="card-body p-4 p-sm-5">

                <div className="text-center mb-3">
                  <span className="brand-mark">
                              <GraduationCap size={20} />
                            </span>
                  <h1 className="h3 text-center fw-bold mb-2">
                    WhiteFox Media
                  </h1>
                </div>

                <p className="text-center text-muted mb-4">
                  Sign in to School Management System.
                </p>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={login} noValidate>

                  <div className="mb-3">
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                    <input
                      id="username"
                      className="form-control"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e)=>
                        setUsername(
                          e.target.value
                        )
                      }
                      autoComplete="username"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e)=>
                        setPassword(
                          e.target.value
                        )
                      }
                      autoComplete="current-password"
                    />
                  </div>

                  <button
                    className="btn btn-primary w-100 d-inline-flex justify-content-center align-items-center gap-2"
                    disabled={loading}
                  >
                    <LogIn size={18} />
                    {loading ? "Signing in..." : "Login"}
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
