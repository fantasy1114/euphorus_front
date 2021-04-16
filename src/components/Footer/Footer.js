import React from "react";
import logo from "../../assets/logonewwhite.png";
import { Button } from "reactstrap";
import "./Footer.css";

function Footer() {
  return (
    <footer className="mt-5 py-4">
      <div className="footer-main container text-center text-md-left">
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <img class="logo" src={logo} alt="logo" />
          </div>
          <div className="col-md-2 col-sm-12">
            <ul className="list-unstyled">
              <li className="my-3">
                <a className="text-white" href="#">
                  About Us
                </a>
              </li>
              <li className="my-3">
                <a className="text-white" href="#">
                  Contact
                </a>
              </li>
              <li className="my-3">
                <a className="text-white" href="#">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2 col-sm-12">
            <ul className="list-unstyled">
              <li className="my-3">
                <a className="text-white" href="#">
                  API
                </a>
              </li>
              <li className="my-3">
                <a className="text-white" href="#">
                  FAQ
                </a>
              </li>
              <li className="my-2">
                <a className="text-white" href="#">
                  Use Cases
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="d-flex flex-column align-items-end">
              <div class="btn-container">
                <Button className="btn btn-secondary my-3">View API</Button>
              </div>

              <p className="text-white mt-2">© Euphorus. All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
