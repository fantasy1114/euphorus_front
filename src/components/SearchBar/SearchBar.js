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
import "./SearchBar.css";

function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [yearsDropdownOpen, setYearsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(
    `${props.currentCountry}`
  );
  const [selectedYear, setSelectedYear] = useState(`${props.currentYear}`);
  const [countryNames, setCountryNames] = useState([]);
  const years = [2020, 2019, 2018, 2017, 2016, 2015];

  const toggleCountryDrop = () =>
    setCountryDropdownOpen((prevState) => !prevState);
  const toggleYearsDrop = () => setYearsDropdownOpen((prevState) => !prevState);

  // Fetch country names for dropdown
  useEffect(() => {
    const url = `http://131.181.190.87:3000/countries`;
    fetch(url)
      .then((res) => res.json())
      .then((countries) => setCountryNames(countries));
  }, []);

  return (
    <div className="search-bar">
      <div className="row my-4">
        <div className="col-12 col-md-7">
          <div className="d-flex mt-3 text=">
            <p class="my-2 mr-3">Country:</p>
            <Dropdown
              className="mr-2"
              isOpen={countryDropdownOpen}
              toggle={toggleCountryDrop}
            >
              <DropdownToggle className="" caret>
                {selectedCountry}
              </DropdownToggle>
              <DropdownMenu id="test">
                <DropdownItem
                  value="SHOW ALL"
                  onClick={() => {
                    props.onSubmitCountry("");
                    setSelectedCountry("All");
                  }}
                >
                  (Show all)
                </DropdownItem>
                {countryNames.map((country) => (
                  <DropdownItem
                    value={country}
                    onClick={(e) => {
                      props.onSubmitCountry(e.target.value);
                      setSelectedCountry(e.target.value);
                    }}
                  >
                    {country}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <p class="my-2 mx-3">Year:</p>

            <Dropdown
              className="mr-2"
              isOpen={yearsDropdownOpen}
              toggle={toggleYearsDrop}
            >
              <DropdownToggle className="" caret>
                {selectedYear}
              </DropdownToggle>
              <DropdownMenu>
                {props.showAllYearsOption ? (
                  <DropdownItem
                    value="SHOW ALL"
                    onClick={() => {
                      props.onSubmitYear("");
                      setSelectedYear("All");
                    }}
                  >
                    (Show all)
                  </DropdownItem>
                ) : null}

                {years.map((year) => (
                  <DropdownItem
                    value={year}
                    onClick={(e) => {
                      props.onSubmitYear(e.target.value);
                      setSelectedYear(e.target.value);
                    }}
                  >
                    {year}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="col-12 col-md-5 ">
          <Form
            className="mt-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSelectedYear(props.currentYear);
              setSelectedCountry("Country");
              props.onSubmitText(innerSearch);
              props.onSubmitYear(props.currentYear);
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
                    setSelectedYear(props.currentYear);
                    setSelectedCountry("Country");

                    props.onSubmitText(innerSearch);
                    props.onSubmitYear(props.currentYear);
                  }}
                >
                  Search
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
