import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import CountryFactors from "../../components/CounctryFactors/CountryFactors";
import Hero from "../../components/Hero/Hero";

function HomeAuthenticated() {
  return (
    <div>
      <Hero />
      <section className="container py-1 px-3 rounded bg-light-grey">
        <CountryFactors />
      </section>
    </div>
  );
}

export default HomeAuthenticated;
