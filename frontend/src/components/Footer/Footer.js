import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <nav>
            <ul className="footer-menu">
              <li>
                <a href="/admin/files">
                  Home
                </a>
              </li>
            </ul>
            <p className="copyright text-center">
              © {new Date().getFullYear()}{" "}
              <a href="https://linkedin.com/in/marufrahmanofficial" target="_blank">Maruf Rahman</a>
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
