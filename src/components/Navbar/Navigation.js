import { React, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logonew.PNG";
import "./Navigation.css";

import {
  Container,
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Container>
        <Navbar light expand="md">
          <NavbarBrand>
            <Link to="/">
              <img className="logo" src={logo} alt="Euphorus Logo"></img>
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="text-center ml-md-auto" navbar>
              <Link to="/login">
                <Button color="link btn-rounded">Login</Button>
              </Link>

              <Link to="/register">
                <Button
                  color="primary"
                  className="btn-rounded btn-primary w-100"
                >
                  Register
                </Button>
              </Link>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

export default Navigation;
