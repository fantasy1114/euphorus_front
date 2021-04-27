import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Badge, Jumbotron } from "reactstrap";
import heroimg from "../../assets/header-img.svg";
import "./Home.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CountryRankings from "../../components/CountryRankings/CountryRankings";
import SearchBar from "../../components/SearchBar/SearchBar";
import Chart from "../../components/Chart/Chart";

function Home() {
  return (
    <div>
      <Jumbotron>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-left">
              <h1>Country Happiness Rankings</h1>
              <p className="lead">
                Euphorus measures what matters - sustainable wellbeing for all.
                Browse the below data and view by country
              </p>
              <Button className="btn-rounded" color="primary">
                Learn More
              </Button>
            </div>

            <div className="col-md-6">
              <img className="img-fluid" src={heroimg} alt="hero image"></img>
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

export default Home;
