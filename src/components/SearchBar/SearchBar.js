import { React, useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Form,
} from "reactstrap";
import "./SearchBar.css";

function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [yearsDropdownOpen, setYearsDropdownOpen] = useState(false);
  const [countryNames, setCountryNames] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [selectedYear, setSelectedYear] = useState(
    "Year (" + props.defaultYear + ")"
  );
  const years = [2020, 2019, 2018, 2017, 2016, 2015];
  const toggleCountryDrop = () =>
    setCountryDropdownOpen((prevState) => !prevState);
  const toggleYearsDrop = () => setYearsDropdownOpen((prevState) => !prevState);

  // Retrive country names for dropdown
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
            <Dropdown
              className="mr-2"
              isOpen={countryDropdownOpen}
              toggle={toggleCountryDrop}
            >
              <DropdownToggle className="" caret>
                {selectedCountry}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  value="SHOW ALL"
                  onClick={() => {
                    props.onSubmitCountry("");
                    setSelectedCountry("Country (All)");
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

            <Dropdown
              className="mr-2"
              isOpen={yearsDropdownOpen}
              toggle={toggleYearsDrop}
            >
              <DropdownToggle className="" caret>
                {selectedYear}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  value="SHOW ALL"
                  onClick={() => {
                    props.onSubmitYear("");
                    setSelectedYear("Year (All)");
                  }}
                >
                  (Show all)
                </DropdownItem>
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
              setSelectedYear("Year");
              setSelectedCountry("Country");
              props.onSubmitText(innerSearch);
              props.onSubmitYear("");
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
                    setSelectedYear("Year");
                    setSelectedCountry("Country");
                    props.onSubmitText(innerSearch);
                    props.onSubmitYear("");
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
