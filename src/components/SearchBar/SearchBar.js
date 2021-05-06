import { React, useState, useEffect } from "react";
import Select from "react-select";
import "./SearchBar.css";

function SearchBar(props) {
  const [selectedCountry, setSelectedCountry] = useState(
    `${props.currentCountry}`
  );
  const [selectedYear, setSelectedYear] = useState(`${props.currentYear}`);
  const [selectedLimit, setSelectedLimit] = useState("All");
  const [countryNames, setCountryNames] = useState([]);
  const [isClearableCountry, setIsClearableCountry] = useState(false);
  const [isClearableYear, setIsClearableYear] = useState(false);
  const [isClearableLimit, setIsClearableLimit] = useState(false);
  const [limitOptions, setLimitOptions] = useState([]);

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

  // Populate limit once initally
  useEffect(() => {
    let nums = Array.from({ length: props.rowData.length }, (_, i) => i + 1);
    nums.reverse();
    let limitOptions = nums.map(function (num) {
      return { label: num, value: num };
    });
    limitOptions.unshift({ label: "All", value: "All" });
    setLimitOptions(limitOptions);
  }, [props.rowData]);

  function toggleClearableCountry() {
    setIsClearableCountry(!isClearableCountry);
  }

  function toggleClearableYear() {
    setIsClearableYear(!isClearableYear);
  }

  function toggleClearableLimit() {
    setIsClearableLimit(!isClearableLimit);
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
              isClearable={isClearableCountry}
              onChange={(e) => {
                if (e !== null) {
                  if (e.value === "All") {
                    props.onSubmitCountry("");
                    setSelectedCountry("All");
                    if (isClearableCountry) {
                      toggleClearableCountry();
                    }
                  } else {
                    props.onSubmitCountry(e.value);
                    setSelectedCountry(e.value);
                    if (!isClearableCountry) {
                      toggleClearableCountry();
                    }
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
              className="react-select-small"
              value={yearsOptions.filter(
                (option) => option.label === selectedYear
              )}
              isClearable={isClearableYear}
              onChange={(e) => {
                if (e !== null) {
                  if (e.value === "All") {
                    props.onSubmitYear("");
                    setSelectedYear("All");
                    console.log("here");
                    if (!isClearableYear) {
                      toggleClearableYear();
                    }
                  } else {
                    props.onSubmitYear(e.value);
                    setSelectedYear(e.value);
                    if (!isClearableYear) {
                      toggleClearableYear();
                    }
                  }
                } else {
                  if (selectedCountry === "All") {
                    props.onSubmitCountry("");
                    props.onSubmitYear("2020");
                  } else {
                    props.onSubmitCountry(selectedCountry);
                    props.onSubmitYear("2020");
                  }
                  setSelectedYear("2020");
                  toggleClearableYear();
                }
              }}
            />

            {props.showLimit ? (
              <>
                <p class="my-2 mx-3">Limit: </p>

                <Select
                  options={limitOptions}
                  className="react-select-small"
                  value={limitOptions.filter(
                    (option) => option.label === selectedLimit
                  )}
                  isClearable={isClearableLimit}
                  onChange={(e) => {
                    if (e !== null) {
                      if (e.value === "All") {
                        console.log("Clicked All");
                        props.onSubmitLimit("200");
                        setSelectedLimit("All");
                        if (isClearableLimit) {
                          toggleClearableLimit();
                        }
                      } else {
                        props.onSubmitLimit(e.value);
                        setSelectedLimit(e.value);
                        if (!isClearableLimit) {
                          toggleClearableLimit();
                        }
                      }
                    } else {
                      props.onSubmitLimit("200");
                      setSelectedLimit("All");
                      toggleClearableLimit();
                    }
                  }}
                />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
