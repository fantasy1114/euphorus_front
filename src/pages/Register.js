import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import registerimg from "../assets/register.svg";
const API_URL = "http://131.181.190.87:3000";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");

  document.title = "Euphorus | Register";

  function register() {
    const url = `${API_URL}/user/register`;
    return fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setRegisterMessage(res.message);
      });
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 my-3">
          <h2>Register</h2>
          {registerMessage !== "" && registerMessage !== "User created" ? (
            <Alert color="danger">{registerMessage}</Alert>
          ) : registerMessage === "User created" ? (
            <Alert color="success">
              Registration Successful! Click{" "}
              <Link to="/login">
                <u>here</u>
              </Link>{" "}
              to login
            </Alert>
          ) : null}
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
            </div>
            <input
              type="submit"
              id="submit"
              className="btn btn-primary"
              name="submit"
              value="Register"
              onClick={(e) => {
                e.preventDefault();
                register();
              }}
            />
          </form>
        </div>
        <div className="col-md-6 my-3">
          <img className="img-fluid" src={registerimg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Register;
