import React, { Component } from "react";
import AuthService from "../service/AuthService";

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

  handleLogin = (e) => {
    e.preventDefault();
    AuthService.login(this.state.username, this.state.password).then(result => {
      console.log("reeesuuult" + result);
      if (result) {
        this.props.history.push("/list");
      } else {
        this.setState({ wrongLogin: true });
      }
    });
  };
  handleAdminLogin = (e) => {
      e.preventDefault();
      AuthService.adminLogin(this.state.username,this.state.password).then(result => {
        if(result){
          this.props.history.push("/dashboard");
        }else{
          this.setState({ wrongLogin: true });
        }
      })
  }

  render() {
    return (
      <div className="container">
        {this.state.wrongLogin && (
          <div class="alert alert-danger" role="alert">
            Wrong username and password
          </div>
        )}
        <div className="login-layout row">
          <div className="col-md-6">
            <form onSubmit={this.handleLogin}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputEmail1"
                  onChange={this.handleUsername}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={this.handlePassword}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <form onSubmit={this.handleAdminLogin}>
              <div className="form-group">
                <label htmlFor="exampleInputUsername2">Admin Username</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputUsername2"
                  onChange={this.handleUsername}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword2">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  onChange={this.handlePassword}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
