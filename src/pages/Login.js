import { React, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "reactstrap";
import loginimg from "../assets/login.svg";
import { LoginContext } from "../helper/Context";
const API_URL = "https://salty-refuge-23420.herokuapp.com";

function Login(props) {
  document.title = "Euphorus | Login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(props.location.state.msg);
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const history = useHistory();

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
        if (res.message !== "" && res.message !== undefined) {
          setLoginMessage(res.message);
        } else {
          setLoginMessage("Login Successful!");
          setLoggedIn(true);
          localStorage.setItem("token", res.token);
          history.push("/factors");
        }
      });
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 my-3">
          <h2>Login</h2>
          {loginMessage !== "" && loginMessage !== "Login Successful!" ? (
            <Alert color="danger">{loginMessage}</Alert>
          ) : loginMessage === "Login Successful!" ? (
            <Alert color="success">{loginMessage}</Alert>
          ) : null}
          <Alert color="danger">
            Test email: test@mail.com <br></br> Test password: 123
          </Alert>
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
            No Account Yet? <Link to="/register">Register here</Link>
          </p>
        </div>
        <div className="col-md-6 my-3">
          <img
            className="img-fluid"
            src={loginimg}
            alt="Laptop with lock on the screen"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
