import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [username,setUsername] =
    useState("");

  const [password,setPassword] =
    useState("");

  const login = async (e) => {

    e.preventDefault();

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

      alert("Invalid Credentials");
    }
  };

  return (

    <div className="container">

      <div className="row justify-content-center mt-5">

        <div className="col-md-4">

          <div className="card shadow">

            <div className="card-body">

              <h3 className="text-center mb-4">
                Login
              </h3>

              <form onSubmit={login}>

                <input
                  className="form-control mb-3"
                  placeholder="Username"
                  onChange={(e)=>
                    setUsername(
                      e.target.value
                    )
                  }
                />

                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  onChange={(e)=>
                    setPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  className="btn btn-primary w-100"
                >
                  Login
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;