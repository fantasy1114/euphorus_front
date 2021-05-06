import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import servererror from "../assets/503error.svg";

function ServerError() {
  return (
    <div className="container">
      <div className="row align-items-center my-5">
        <div className="col-md-6">
          <h2>Internal Server Error</h2>
          <p>There was a problem fetching the country data</p>
          <Link to="/">
            <Button className="btn-rounded">Back to Home</Button>
          </Link>
        </div>

        <div className="col-md-6">
          <img className="img-fluid" src={servererror} alt="pagenotfound" />
        </div>
      </div>
    </div>
  );
}

export default ServerError;
