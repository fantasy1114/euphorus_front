import { React, useState } from "react";
import { Link } from "react-router-dom";
import loginimg from "../../assets/login.svg";
const API_URL = "http://131.181.190.87:3000";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    const url = `${API_URL}/user/login`;
    return fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
      });
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 my-3">
          <h2>Login</h2>
          <form className="form mt-4">
            <div className="form-group">
              <input
                id="email"
                type="text"
                name="email"
                placeholder="Email Address"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="submit"
                id="submit"
                className="btn btn-primary my-3"
                name="submit"
                value="Login"
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
              />
            </div>
          </form>
          <p className="mt-4">
            No Account Yet? <a href="#">Register here </a>
          </p>
        </div>
        <div className="col-md-6 my-3">
          <img className="img-fluid" src={loginimg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
