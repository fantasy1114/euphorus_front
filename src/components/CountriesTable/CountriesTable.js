import React from "react";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import SearchBar from "../../components/SearchBar/SearchBar";

import useCountryData from "../../api";

function CountriesTable() {
  const [search, setSearch] = useState("");
  const { loading, rowData, error } = useCountryData(search);

  const columns = [
    { headerName: "Rank", field: "rank", sortable: true },
    { headerName: "Country", field: "country" },
    { headerName: "Score", field: "score" },
    { headerName: "Year", field: "year" },
  ];

  //   if (loading) {
  //     <h2 className="text-center m-5">Loading...</h2>;
  //   }
  //   if (error) {
  //     return (
  //       <h2 className="text-center m-5">Something went wrong: {error.message}</h2>
  //     );
  //   }

  return (
    <div>
      <SearchBar onSubmit={setSearch} />
      <div
        className="ag-theme-alpine mx-auto "
        style={{
          height: "800px",
        }}
      >
        {/* <p>
              <Badge color="secondary text-md">{rowData.length}</Badge> Countries
              ranked
            </p> */}
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination={true}
          paginationPageSize={40}
          defaultColDef={{ flex: 1, minWidth: 100 }}
          //   style={{ width: "100%" }}
          // onRowClicked={(row) =>
          //   history.push(`/book?title=${row.data.title}`)
          // }
        />
      </div>
    </div>
  );
}

export default CountriesTable;
