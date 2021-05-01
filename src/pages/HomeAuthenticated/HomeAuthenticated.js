import React, { useContext } from "react";
import { Button, Jumbotron } from "reactstrap";
import { LoginContext } from "../../Helper/Context";
import CountryFactors from "../../components/CounctryFactors/CountryFactors";
import factorsimg from "../../assets/factors.svg";
import { withRouter } from "react-router-dom";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function HomeAuthenticated() {
  return (
    <div>
      <Jumbotron>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-left">
              <h1>Country Happiness Factors</h1>
              <p className="lead">Explore happiness factors by country</p>
              <Button className="btn-rounded" color="primary">
                Learn More
              </Button>
            </div>

            <div className="col-md-6">
              <img className="img-fluid" src={factorsimg} alt="hero"></img>
            </div>
          </div>
        </div>
      </Jumbotron>
      <section className="container py-1 px-3 rounded bg-light-grey">
        <CountryFactors />
      </section>
    </div>
  );
}

export default withRouter(HomeAuthenticated);
