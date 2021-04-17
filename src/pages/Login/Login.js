import React from "react";
import loginimg from "../../assets/login.svg";

function Login() {
  function login() {
    console.log("This is a test");
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
            <button onClick={login}>Login</button>
          </form>
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
