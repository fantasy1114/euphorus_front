import React from "react";
import CountryRankings from "../components/CountryRankings/CountryRankings";
import { Button, Jumbotron } from "reactstrap";
import heroimg from "../assets/header-img.svg";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function Rankings() {
  return (
    <div>
      <Jumbotron>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-left">
              <h1 className="jumbotron-heading">Country Happiness Rankings</h1>
              <p className="lead">
                Euphorus measures what matters - sustainable wellbeing for all.
                Browse the below data and view by country.
              </p>
              <Button
                className="btn-rounded"
                color="primary"
                onClick={() =>
                  window.open(
                    "https://en.wikipedia.org/wiki/World_Happiness_Report",
                    "_blank"
                  )
                }
              >
                Learn More
              </Button>
            </div>

            <div className="col-md-6">
              <img
                className="img-fluid"
                src={heroimg}
                alt="Two people running through field"
              ></img>
            </div>
          </div>
        </div>
      </Jumbotron>
      <section className="container py-1 px-3 rounded bg-light-grey">
        <CountryRankings />
      </section>
    </div>
  );
}

export default Rankings;
