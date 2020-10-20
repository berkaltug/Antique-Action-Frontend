import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../service/AuthService";
import axios from "axios";

class RegisterScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      errorMessage:"",
      successMessage:""
    };
  }

  handleUsername = e => {
    this.setState({ username: e.target.value });
    console.log(this.state.username)
  };

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  formSubmit = e =>{
    e.preventDefault();
    const username=this.state.username;
    const email=this.state.email;
    const password=this.state.password;
    axios.post('http://localhost:8080/user/register',
        {
          username:username,
          email:email,
          password:password
        }).then(response=>{
          this.setState({successMessage:response.data,errorMessage:""})
        }).catch(error=>{
          this.setState({errorMessage:error.response.data,successMessage:""})
        })
  }

  render() {
    return (
      <div>
        <div className="container" style={{ height: "100vh" }}>
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-md-3"></div>
            <div className="col-md-6 d-flex">

              <form className="w-100" onSubmit={this.formSubmit}>
              {this.state.errorMessage !== "" && (
                <div className="form-group"><div className="alert alert-danger">{this.state.errorMessage}</div></div>

              )}
              {this.state.successMessage !== "" && (
                    <div className="form-group"><div className="alert alert-success">{this.state.successMessage}</div></div>
              )}
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
