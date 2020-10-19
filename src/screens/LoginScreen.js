import React, { Component } from "react";
import AuthService from "../service/AuthService";
import {  Link } from "react-router-dom";
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      wrongLogin: false
    };
  }

  handleUsername = e => {
    this.setState({ username: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handleLogin = e => {
    e.preventDefault();
    AuthService.login(this.state.username, this.state.password).then(result => {
      if (result) {
        this.props.history.push("/list");
      } else {
        this.setState({ wrongLogin: true });
      }
    });
  };
  handleAdminLogin = e => {
    e.preventDefault();
    AuthService.adminLogin(this.state.username, this.state.password).then(
      result => {
        if (result) {
          this.props.history.push("/dashboard");
        } else {
          this.setState({ wrongLogin: true });
        }
      }
    );
  };

  render() {
    return (
      <div className="container" style={{height:"100vh"}}>
        {this.state.wrongLogin && (
          <div className="alert alert-danger" role="alert">
            Wrong username and password
          </div>
        )}

        <div className="row h-100">
          <div className="col-12 align-self-center">


          <div className="row">
            <div className="col-md-6">
            <form className="box h-100" onSubmit={this.handleLogin}>
              <h1>Login</h1>
              <p className="text-muted">
                Please enter your username and password!
              </p>
              <input type="text" name="" placeholder="Username" onChange={this.handleUsername} />
              <input type="password" name="" placeholder="Password" onChange={this.handlePassword}/>
              <input type="submit" name="" value="Login" />
            </form>
            </div>
            <div className="col-md-6">
                <form className="box h-100" onSubmit={this.handleAdminLogin}>
                  <h1>Admin Login</h1>
                  <p className="text-muted">
                    Please enter your admin username and password!
                  </p>
                  <input type="text" name="" placeholder="Username" onChange={this.handleUsername} />
                  <input type="password" name="" placeholder="Password" onChange={this.handlePassword}/>
                  <input type="submit" name="" value="Login" />
                </form>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-md-6 offset-md-3">
                <Link to={"/register"} className="btn btn-primary h-100 w-100">
                  Register
                </Link>
            </div>
          </div>

          </div>
        </div>

      </div>
    );
  }
}

export default LoginScreen;
