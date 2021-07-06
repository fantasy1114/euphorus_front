import React from "react";
import { Button, Jumbotron } from "reactstrap";
import CountryFactors from "../components/CounctryFactors/CountryFactors";
import factorsimg from "../assets/factors.svg";
import { withRouter } from "react-router-dom";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function Factors() {
  const openWikiPage = () =>
    (window.location.href =
      "https://en.wikipedia.org/wiki/World_Happiness_Report/");
  return (
    <div>
      <Jumbotron>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-left">
              <h1 className="jumbotron-heading">Country Happiness Factors</h1>
              <p className="lead">Explore happiness factors by country.</p>
              <Button
                className="btn-rounded"
                color="primary"
                onClick={openWikiPage}
              >
                Learn More
              </Button>
            </div>

            <div className="col-md-6">
              <img
                className="img-fluid"
                src={factorsimg}
                alt="Location markers on globe"
              ></img>
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

export default withRouter(Factors);
