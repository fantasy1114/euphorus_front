import { React, useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Form,
} from "reactstrap";
import Select from "react-select";
import "./SearchBar.css";

function SearchBar(props) {
  // const [innerSearch, setInnerSearch] = useState("");
  // const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  // const [yearsDropdownOpen, setYearsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    `${props.currentCountry}`
  );
  const [selectedYear, setSelectedYear] = useState(`${props.currentYear}`);
  const [countryNames, setCountryNames] = useState([]);

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
              onChange={(e) => {
                if (e.value === "All") {
                  props.onSubmitCountry("");
                  setSelectedCountry("All");
                } else {
                  props.onSubmitCountry(e.value);
                  setSelectedCountry(e.value);
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
              onChange={(e) => {
                if (e.value === "All") {
                  props.onSubmitYear("");
                  setSelectedYear("All");
                } else {
                  props.onSubmitYear(e.value);
                  setSelectedYear(e.value);
                }
              }}
            />
          </div>
        </div>
        {/* <div className="col-12 col-md-5 ">
          <Form
            className="mt-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (innerSearch === "") {
                setSelectedYear("2020");
                setSelectedCountry("All");
                props.onSubmitText(innerSearch);
                props.onSubmitYear("2020");
              } else {
                setSelectedYear(props.currentYear);
                setSelectedCountry(innerSearch);
                props.onSubmitText(innerSearch);
                props.onSubmitYear(props.currentYear);
              }
            }}
          >
            <InputGroup>
              <Input
                placeholder="Search country name..."
                id="search"
                value={innerSearch}
                onChange={(e) => setInnerSearch(e.target.value)}
                arialabelledby="search-button"
              />
              <InputGroupAddon addonType="append">
                <Button
                  id="search-button"
                  type="button"
                  onClick={() => {
                    if (innerSearch === "") {
                      setSelectedYear("2020");
                      setSelectedCountry("All");
                      props.onSubmitText(innerSearch);
                      props.onSubmitYear("2020");
                    } else {
                      setSelectedYear(props.currentYear);
                      setSelectedCountry(innerSearch);
                      props.onSubmitText(innerSearch);
                      props.onSubmitYear(props.currentYear);
                    }
                  }}
                >
                  Search
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </div> */}
      </div>
    </div>
  );
}

export default SearchBar;
