import React from "react";
import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { useHistory } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import SearchBar from "../SearchBar/SearchBar";
import Chart from "../Chart/Chart";
import useCountryData from "../../api";

function CountryRankings() {
  const history = useHistory();
  const [searchCountry, setSearchCountry] = useState("");
  const [searchYear, setSearchYear] = useState("2020");
  const { loading, rowData, error } = useCountryData(
    "rankings",
    searchCountry,
    searchYear
  );

  document.title = "Euphorus | Happiness Rankings";

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const columns = [
    { headerName: "Rank", field: "rank", sortable: true },
    { headerName: "Country", field: "country" },
    { headerName: "Score", field: "score" },
    { headerName: "Year", field: "year" },
  ];
  let topCountryNames = [];
  let topHappinessScores = [];

  if (rowData.length > 15) {
    if (searchYear === "") {
      // Clear chart data if no year is selected
      topCountryNames = [];
      topHappinessScores = [];
    } else {
      for (let i = 0; i < 15; i++) {
        console.log(searchYear, searchCountry);
        console.log(rowData);
        topCountryNames.push(rowData[i].country);
        topHappinessScores.push(parseFloat(rowData[i].score));
      }
    }
  }

  // Show error message in modal if no search results are found
  useEffect(() => {
    if (rowData.length === 0 && loading === false) {
      setModal(true);
    }
  }, [loading, rowData]);

  console.log("Num of results: " + rowData.length);

  return (
    <div>
      <SearchBar
        onSubmitText={setSearchCountry}
        onSubmitCountry={setSearchCountry}
        onSubmitYear={setSearchYear}
        currentYear={searchYear}
        currentCountry="All"
        showAllYears={true}
        rowData={rowData}
        showLimit={false}
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
                Top 15 Happiest Countries {searchYear}
              </h3>

              <Chart
                category="Happiness Index"
                countryNames={topCountryNames}
                scores={topHappinessScores}
                year={searchYear}
              />
            </>
          ) : null}

          <Modal isOpen={modal} toggle={toggleModal} className="">
            <ModalHeader toggle={toggleModal}>Error</ModalHeader>
            <ModalBody>
              Could not find a country matching '{searchCountry}'
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
      ) : (
        // Redirect to Server error page
        history.push("/503error")
      )}
    </div>
  );
}

export default CountryRankings;
