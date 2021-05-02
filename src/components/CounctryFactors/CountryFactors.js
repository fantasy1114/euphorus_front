import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import SearchBar from "../SearchBar/SearchBar";
import Chart from "../Chart/Chart";
import useCountryData from "../../api";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./CountryFactors.css";

function CountryFactors() {
  const [searchCountry, setSearchCountry] = useState("");
  const [searchYear, setSearchYear] = useState("2020");
  const { loading, rowData, error } = useCountryData(
    "factors",
    searchCountry,
    searchYear
  );
  const categories = [
    "Economy",
    "Family",
    "Freedom",
    "Generosity",
    "Health",
    "Trust",
  ];

  let allScores = [];

  let topCountryNames = [];
  let economyScores = [];
  let familyScores = [];
  let healthScores = [];
  let freedomScores = [];
  let generosityScores = [];
  let trustScores = [];

  if (rowData.length > 1) {
    // Get country names once
    for (let i = 0; i < 15; i++) {
      topCountryNames.push(rowData[i].country);
    }

    // Get scores for each happiness factor
    for (let i = 0; i < 15; i++) {
      economyScores.push(rowData[i].economy);
      familyScores.push(rowData[i].family);
      freedomScores.push(rowData[i].freedom);
      healthScores.push(rowData[i].health);
      generosityScores.push(rowData[i].generosity);
      trustScores.push(rowData[i].trust);
    }

    // Add individual scores arrays to one 2d array
    // so it is easier to loop through in return statement
    allScores.push(economyScores);
    allScores.push(familyScores);
    allScores.push(healthScores);
    allScores.push(freedomScores);
    allScores.push(generosityScores);
    allScores.push(trustScores);
  }

  const columns = [
    { headerName: "Rank", field: "rank", sortable: true },
    { headerName: "Country", field: "country" },
    { headerName: "Score", field: "score" },
    { headerName: "Economy", field: "economy" },
    { headerName: "Family", field: "family" },
    { headerName: "Health", field: "health" },
    { headerName: "Freedom", field: "freedom" },
    { headerName: "Generosity", field: "generosity" },
    { headerName: "Trust", field: "trust" },
  ];

  return (
    <div>
      <SearchBar
        onSubmitText={setSearchCountry}
        onSubmitCountry={setSearchCountry}
        onSubmitYear={setSearchYear}
        currentYear={searchYear}
        currentCountry="All"
        showAllYears={false}
      />
      <div
        className="ag-theme-alpine mx-auto "
        style={{
          height: "100%",
        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination={true}
          paginationPageSize={40}
          defaultColDef={{ flex: 1, minWidth: 100 }}
          domLayout="autoHeight"
        />
      </div>
      {allScores.map((scores, index) => (
        <Chart
          category={categories[index]}
          countryNames={topCountryNames}
          scores={scores}
          year={searchYear}
        />
      ))}
    </div>
  );
}

export default CountryFactors;
