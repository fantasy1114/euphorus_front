import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../Helper/Context";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import logo from "../../assets/logonew.PNG";
import "./Navigation.css";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  const toggle = () => setIsOpen(!isOpen);

  function logout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

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
                <Button color="link btn-rounded shadow-none">Rankings</Button>
              </Link>
              <Link to="/factors">
                <Button color="link btn-rounded shadow-none">Factors</Button>
              </Link>
              {loggedIn ? (
                <Button
                  color="primary"
                  className="btn-rounded btn-primary w-100"
                  onClick={toggleModal}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/login">
                    <Button color="link btn-rounded mr-2 shadow-none">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      color="primary"
                      className="btn-rounded btn-primary w-100"
                    >
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </Nav>
          </Collapse>
        </Navbar>

        <Modal isOpen={modal} toggle={toggleModal} className="">
          <ModalHeader toggle={toggleModal}>Logout</ModalHeader>
          <ModalBody>Are you sure you want to logout?</ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                toggleModal();
                logout();
              }}
            >
              Logout
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );
}

export default Navigation;
