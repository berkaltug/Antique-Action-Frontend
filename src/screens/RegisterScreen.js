import React, { Component } from "react";
import { Link } from "react-router-dom";
class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: ""
    };
  }
  handleUsername = e => {
    this.setState({ username: e.target.value });
  };
  handleEmail = e => {
    this.setState({ email: e.target.value });
  };
  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div>
        <div className="container" style={{ height: "100vh" }}>
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-3"></div>
            <div className="col-md-6 d-flex">
              <form className="w-100" onSubmit={""}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    onChange={this.handleUsername}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    onChange={this.handleEmail}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    onChange={this.handlePassword}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
                <Link to={"/"} class="btn btn-danger w-100 mt-3">Back</Link>
              </form>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterScreen;
