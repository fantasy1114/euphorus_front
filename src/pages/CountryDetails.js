import React, { useState } from "react";
import { Button } from "reactstrap";
import { useHistory, useLocation } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import Chart from "../components/Chart/Chart";
import useCountryData from "../api";

function CountryDetails(props) {
  const history = useHistory();
  const params = new URLSearchParams(useLocation().search);
  const countryName = params.get("country");

  // Empty string as third parameter retrieves all years
  const { loading, rowData, error } = useCountryData(
    "rankings",
    countryName,
    ""
  );

  const columns = [
    { headerName: "Rank", field: "rank", sortable: true },
    { headerName: "Country", field: "country" },
    { headerName: "Score", field: "score" },
    { headerName: "Year", field: "year" },
  ];

  let years = [2020, 2019, 2018, 2017, 2016, 2015];
  let happinessScores = [];

  for (let i = 0; i < rowData.length; i++) {
    happinessScores.push(parseFloat(rowData[i].score));
  }

  return (
    <div className="container my-5">
      <h2>{countryName}</h2>

      <div className="row mt-5 mb-3">
        {loading === false ? (
          <>
            <div className="col-12 col-lg-6">
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
            </div>

            <div className="col-12 col-lg-6">
              <Chart
                category="Happiness Index"
                yAxis={years}
                xAxis={happinessScores}
                label={countryName}
              />
            </div>
          </>
        ) : (
          <h3 className="mx-auto">Loading...</h3>
        )}
      </div>

      <Button
        color="btn btn-rounded btn-secondary"
        size="sm"
        className="mt-3"
        onClick={() => history.goBack()}
      >
        Back
      </Button>
    </div>
  );
}

export default CountryDetails;
