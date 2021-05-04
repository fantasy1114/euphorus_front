import { React, useState, useEffect } from "react";
import Select from "react-select";
import "./SearchBar.css";

function SearchBar(props) {
  const [selectedCountry, setSelectedCountry] = useState(
    `${props.currentCountry}`
  );
  const [selectedYear, setSelectedYear] = useState(`${props.currentYear}`);
  const [countryNames, setCountryNames] = useState([]);
  const [isClearableCountry, setIsClearableCountry] = useState(false);
  const [isClearableYear, setIsClearableYear] = useState(false);

  let yearsOptions = [
    { label: "2020", value: "2020" },
    { label: "2019", value: "2019" },
    { label: "2018", value: "2018" },
    { label: "2017", value: "2017" },
    { label: "2016", value: "2016" },
    { label: "2015", value: "2015" },
  ];

  // Fetch country names for dropdown
  useEffect(() => {
    const url = `http://131.181.190.87:3000/countries`;
    fetch(url)
      .then((res) => res.json())
      .then((countries) => {
        let countryOptions = countries.map(function (country) {
          return { label: country, value: country };
        });
        countryOptions.unshift({ label: "All", value: "All" });
        setCountryNames(countryOptions);
      });
  }, []);

  // Add 'All' years options only for rankings page
  if (props.showAllYears) {
    yearsOptions.unshift({ label: "All", value: "All" });
  }

  function toggleClearableCountry() {
    setIsClearableCountry(!isClearableCountry);
  }

  function toggleClearableYear() {
    setIsClearableYear(!isClearableYear);
  }

  return (
    <div className="search-bar">
      <div className="row my-4">
        <div className="col-12 col-md-7">
          <div className="d-flex mt-3 text=">
            <p class="my-2 mr-3">Country:</p>

            <Select
              options={countryNames}
              className="react-select-country"
              value={countryNames.filter(
                (option) => option.label === selectedCountry
              )}
              // defaultValue={countryNames.filter(
              //   (option) => option.label === selectedCountry
              // )}
              isClearable={isClearableCountry}
              onChange={(e) => {
                if (e !== null) {
                  if (e.value === "All") {
                    props.onSubmitCountry("");
                    setSelectedCountry("All");
                  } else {
                    props.onSubmitCountry(e.value);
                    setSelectedCountry(e.value);
                    toggleClearableCountry();
                  }
                } else {
                  props.onSubmitCountry("");
                  setSelectedCountry("All");
                  toggleClearableCountry();
                }
              }}
            />

            <p class="my-2 mx-3">Year:</p>

            <Select
              options={yearsOptions}
              className="react-select-year"
              value={yearsOptions.filter(
                (option) => option.label === selectedYear
              )}
              isClearable={isClearableYear}
              onChange={(e) => {
                if (e !== null) {
                  if (e.value === "All") {
                    props.onSubmitYear("");
                    setSelectedYear("All");
                    toggleClearableYear();
                  } else {
                    props.onSubmitYear(e.value);
                    setSelectedYear(e.value);
                    toggleClearableYear();
                  }
                } else {
                  props.onSubmitYear("2020");
                  setSelectedYear("2020");
                  toggleClearableYear();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
