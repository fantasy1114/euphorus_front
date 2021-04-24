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
  Form,
} from "reactstrap";

function SearchBar(props) {
  const [innerSearch, setInnerSearch] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
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
                <DropdownItem onClick={() => console.log("Clicked")}>
                  Some Action
                </DropdownItem>
                <DropdownItem>Foo Action</DropdownItem>
                <DropdownItem>Bar Action</DropdownItem>
                <DropdownItem>Quo Action</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="col-5">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              props.onSubmit(innerSearch);
            }}
          >
            <InputGroup>
              <Input
                placeholder="Search"
                id="search"
                value={innerSearch}
                onChange={(e) => setInnerSearch(e.target.value)}
                arialabelledby="search-button"
              />
              <InputGroupAddon addonType="append">
                <Button
                  id="search-button"
                  type="button"
                  onClick={() => props.onSubmit(innerSearch)}
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
