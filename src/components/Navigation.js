import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import AuthService from "../service/AuthService";

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
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <span className="navbar-brand">Antique Auction Bazaar</span>
        <div className="navbar-nav mr-auto">
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
        </div>
        <div className="navbar-nav ml-auto">
          {user && (
            <>
              <li clasName="nav-item">
                <a className="nav-link" onClick={this.handleLogout}>
                  Logout
                </a>
              </li>
            </>
          )}
        </div>
      </nav>
    );
  }
}

export default withRouter(Navigation);
