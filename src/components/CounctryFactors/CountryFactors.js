import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import Select from "react-select";
import SearchBar from "../SearchBar/SearchBar";
import Chart from "../Chart/Chart";
import useCountryData from "../../api";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./CountryFactors.css";

function CountryFactors() {
  const history = useHistory();
  const [searchCountry, setSearchCountry] = useState("");
  const [searchYear, setSearchYear] = useState("2020");
  const { loading, rowData, error } = useCountryData(
    "factors",
    searchCountry,
    searchYear
  );
  const [selectedFactor, setSelectedFactor] = useState("Economy");
  const [selectedFactorData, setSelectedFactorData] = useState([]);

  document.title = "Euphorus | Happiness Factors";

  let factorOptions = [
    { label: "Economy", value: "Economy" },
    { label: "Family", value: "Family" },
    { label: "Health", value: "Health" },
    { label: "Freedom", value: "Freedom" },
    { label: "Generosity", value: "Generosity" },
    { label: "Trust", value: "Trust" },
  ];

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

  useEffect(() => {
    if (loading === false) {
      setSelectedFactorData(economyScores);
    }
  }, [loading]);

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
      {error === null ? (
        <>
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
          {topCountryNames.length > 0 ? (
            <>
              <h3 className="text-center mt-5">
                Happiness Factors Comparison {searchYear}
              </h3>
              <h4 className="text-center text-muted">(Top 15 Countries)</h4>
              <Select
                options={factorOptions}
                className="react-select-factor"
                value={factorOptions.filter(
                  (option) => option.label === selectedFactor
                )}
                onChange={(e) => {
                  if (e.value === "Economy") {
                    setSelectedFactorData(economyScores);
                  } else if (e.value === "Family") {
                    setSelectedFactorData(familyScores);
                  } else if (e.value === "Health") {
                    setSelectedFactorData(healthScores);
                  } else if (e.value === "Freedom") {
                    setSelectedFactorData(freedomScores);
                  } else if (e.value === "Family") {
                    setSelectedFactorData(generosityScores);
                  } else if (e.value === "Trust") {
                    setSelectedFactorData(trustScores);
                  }
                  setSelectedFactor(e.value);
                }}
              />
              <Chart
                category={selectedFactor}
                countryNames={topCountryNames}
                scores={selectedFactorData}
                year={searchYear}
              />
            </>
          ) : null}
        </>
      ) : (
        // Redirect to Server error page
        history.push("/503error")
      )}
    </div>
  );
}

export default CountryFactors;
