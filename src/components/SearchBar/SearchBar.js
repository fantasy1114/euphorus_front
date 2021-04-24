import { React, useState } from "react";
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
} from "reactstrap";

function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="search-bar">
      <div className="row my-4">
        <div className="col-7">
          <div className="d-flex">
            <Dropdown className="mr-2" isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle className="" caret>
                Country
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle className="" caret>
                Year
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Some Action</DropdownItem>
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="col-5">
          {/* <input
            className="p-2"
            type="text"
            id="search"
            name="search"
            value={innerSearch}
            onChange={(e) => setInnerSearch(e.target.value)}
            aria-labelledby="search-button"
          />
          <button
            className="btn btn-secondary p-2"
            id="search-button"
            type="button"
            onClick={() => props.onSubmit(innerSearch)}
          >
            Search
          </button> */}

          <InputGroup>
            <Input placeholder="Search" />
            <InputGroupAddon addonType="append">
              <Button>Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
