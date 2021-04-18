import React from "react";
import registerimg from "../../assets/register.svg";

function Register() {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <h2>Register</h2>
          <form action="" className="form mt-4">
            <div className="form-group">
              <label htmlFor="username">User Name</label>
              <input
                id="username"
                type="text"
                name="username"
                class="form-control"
              />
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
            <input
              type="submit"
              id="submit"
              class="btn btn-primary"
              name="submit"
              value="Register"
            />
          </form>
        </div>
        <div className="col-md-6">
          <img className="img-fluid" src={registerimg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Register;
