import React from "react";
import { Button, Jumbotron } from "reactstrap";
import heroimg from "../../assets/header-img.svg";
import "./Hero.css";

function Hero() {
  return (
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
  );
}

export default Hero;
