import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import Select from "react-select";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from "reactstrap";
import SearchBar from "../SearchBar/SearchBar";
import Chart from "../Chart/Chart";
import { ClipLoader } from "react-spinners";
import useCountryData from "../../api";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./CountryFactors.css";

function CountryFactors() {
  document.title = "Euphorus | Happiness Factors";
  const history = useHistory();
  const [searchCountry, setSearchCountry] = useState("");
  const [searchYear, setSearchYear] = useState("2020");
  const [defaultLimitOptions, setDefaultLimitOptions] = useState([]);

  // Default search limit is 200 incase more countries to API later
  const [searchLimit, setSearchLimit] = useState(200);
  const { loading, rowData, error } = useCountryData(
    "factors",
    searchCountry,
    searchYear,
    searchLimit
  );
  const [resultMessage, setResultMessage] = useState("");
  const [selectedFactor, setSelectedFactor] = useState("Economy");
  const [selectedFactorData, setSelectedFactorData] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  // For the factors dropdown
  let factorOptions = [
    { label: "Economy", value: "Economy" },
    { label: "Family", value: "Family" },
    { label: "Health", value: "Health" },
    { label: "Freedom", value: "Freedom" },
    { label: "Generosity", value: "Generosity" },
    { label: "Trust", value: "Trust" },
  ];

  // Chart data for each factor
  let topCountryNames = [];
  let economyScores = [];
  let familyScores = [];
  let healthScores = [];
  let freedomScores = [];
  let generosityScores = [];
  let trustScores = [];

  if (rowData.length >= 15 && searchLimit >= 15) {
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

  // Table column names
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

  // Set limit options dropown initially after request finshes loading
  useEffect(() => {
    if (loading === false) {
      setSelectedFactorData(economyScores);
      let nums = Array.from({ length: rowData.length }, (_, i) => i + 1);
      nums.reverse();
      let limitOptions = nums.map(function (num) {
        return { label: num, value: num };
      });
      limitOptions.unshift({ label: "All", value: "All" });
      setDefaultLimitOptions(limitOptions);
    }
  }, [loading]);

  // Show error modal if no results come back
  useEffect(() => {
    if (rowData.length === 0 && loading === false) {
      setModal(true);
    }
  }, [loading, rowData]);

  // Set result message
  useEffect(() => {
    if (searchCountry === "") {
      setResultMessage(`Results for countries in ${searchYear}`);
    } else {
      setResultMessage(`Result for ${searchCountry} in ${searchYear}`);
    }
  }, [rowData]);

  return (
    <div>
      <SearchBar
        onSubmitCountry={setSearchCountry}
        onSubmitYear={setSearchYear}
        onSubmitLimit={setSearchLimit}
        currentYear={searchYear}
        currentCountry="All"
        showAllYears={false}
        rowData={rowData}
        showLimit={true}
        defaultLimitOptions={defaultLimitOptions}
      />
      {error === null ? (
        <>
          <p>
            <Badge className="bg-secondary-blue">{rowData.length}</Badge>{" "}
            {resultMessage}
          </p>

          {loading ? (
            <div className="w-100 d-flex align-items-center justify-content-center my-4">
              <ClipLoader color="#F96D5C" />
            </div>
          ) : (
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
                    yAxis={topCountryNames}
                    xAxis={selectedFactorData}
                    label={searchYear}
                  />
                  <Modal isOpen={modal} toggle={toggleModal} className="">
                    <ModalHeader toggle={toggleModal}>Error</ModalHeader>
                    <ModalBody>
                      Could not find data for '{searchCountry}' in year '
                      {searchYear}'
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onClick={() => {
                          toggleModal();
                        }}
                      >
                        Ok
                      </Button>{" "}
                    </ModalFooter>
                  </Modal>
                </>
              ) : null}
            </>
          )}
        </>
      ) : (
        // Redirect to Server error page
        history.push("/503error")
      )}
    </div>
  );
}

export default CountryFactors;
