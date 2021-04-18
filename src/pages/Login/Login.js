import React from "react";
import loginimg from "../../assets/login.svg";

const API_URL = "http://131.181.190.87:3000";

function Login() {
  function login() {
    const url = `${API_URL}/user/login`;

    return fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "example@api.com", password: "asdlkfj1" }),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("token", res.token);
      });
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <h2>Login</h2>
          <form action="" className="form mt-4">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="text" name="email" class="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                class="form-control"
              />
            </div>
          </form>
          <button onClick={login}>Login</button>
          <p className="mt-4">
            No Account Yet? <a href="#">Register here </a>
          </p>
        </div>
        <div className="col-md-6">
          <img className="img-fluid" src={loginimg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
