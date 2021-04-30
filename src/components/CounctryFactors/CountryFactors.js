import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import SearchBar from "../SearchBar/SearchBar";
import Chart from "../Chart/Chart";
import useCountryData from "../../api";

function CountryFactors() {
  const [searchCountry, setSearchCountry] = useState("");
  const [searchYear, setSearchYear] = useState("2020");
  const { loading, rowData, error } = useCountryData(
    "factors",
    searchCountry,
    searchYear
  );

  const token = localStorage.getItem("token");

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

  if (token !== "" && token !== undefined && token !== null) {
    return (
      <div>
        <SearchBar
          onSubmitText={setSearchCountry}
          onSubmitCountry={setSearchCountry}
          onSubmitYear={setSearchYear}
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
        {/* <Chart /> */}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please login to use this page</h1>
      </div>
    );
  }
}

export default CountryFactors;
