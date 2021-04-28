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
  const [searchYear, setSearchYear] = useState("");
  const { loading, rowData, error } = useCountryData(
    "factors",
    searchCountry,
    searchYear
  );

  return <div>CountryFactors</div>;
}

export default CountryFactors;
