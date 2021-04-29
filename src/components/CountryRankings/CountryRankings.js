import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import SearchBar from "../SearchBar/SearchBar";
import Chart from "../Chart/Chart";
import useCountryData from "../../api";

function CountryRankings() {
  const [searchCountry, setSearchCountry] = useState("");
  const [searchYear, setSearchYear] = useState("2020");
  const { loading, rowData, error } = useCountryData(
    "rankings",
    searchCountry,
    searchYear
  );

  const columns = [
    { headerName: "Rank", field: "rank", sortable: true },
    { headerName: "Country", field: "country" },
    { headerName: "Score", field: "score" },
    { headerName: "Year", field: "year" },
  ];

  return (
    <div>
      <SearchBar
        onSubmitText={setSearchCountry}
        onSubmitCountry={setSearchCountry}
        onSubmitYear={setSearchYear}
        defaultYear={searchYear}
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
      <Chart />
    </div>
  );
}

export default CountryRankings;
