import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import AuthService from "../service/AuthService";
import { Navbar, Nav } from "react-bootstrap";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  handleLogout = () => {
    localStorage.removeItem("auth");
    this.props.history.push("/");
  };

  render() {
    const user = AuthService.getCurrentUser();
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Antique Auction Market</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <li className="nav-item">
                <Link to={"/list"} className="nav-link">
                  Antique List
                </Link>
              </li>
              {user && user.username === "admin" && (
                <>
                  <li className="nav-item">
                    <Link to={"/add"} className="nav-link">
                      Add Antique
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/dashboard"} className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                </>
              )}
            </Nav>
            <Nav className="ml-auto">
              {user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={this.handleLogout}>
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        ;
      </>
    );
  }
}

export default withRouter(Navigation);
