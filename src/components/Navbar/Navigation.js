import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { ThemeContext } from "../../App";
import logo from "../../assets/logonew.PNG";
import Greeting from "../../components/Greeting/Greeting";
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
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  const toggle = () => setIsOpen(!isOpen);

  function logout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  useEffect(() => {
    if (token !== null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  return (
    <div className="my-1">
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
              <Link to="/">
                <Button color="link btn-rounded">Rankings</Button>
              </Link>
              <Link to="/factors">
                <Button color="link btn-rounded">Factors</Button>
              </Link>
              {loggedIn ? (
                <Button color="link btn-rounded" onClick={logout}>
                  Logout
                </Button>
              ) : null}

              <Link to="/login">
                <Button color="link btn-rounded mr-2">Login</Button>
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
