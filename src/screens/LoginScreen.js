import React, { Component } from "react";
import AuthService from "../service/AuthService";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      wrongLogin:false
    };
  }

handleUsername=(e)=>{
  this.setState({username:e.target.value});
}

handlePassword=(e)=>{
  this.setState({password:e.target.value});
}

handleLogin=(e)=>{
  e.preventDefault();
  AuthService.login(this.state.username,this.state.password).then(result=>{
    console.log("reeesuuult" + result);
    if(result){
      this.props.history.push("/list");
    }else{
      this.setState({wrongLogin:true})
    }
  });


}
  render() {
    return (
      <div className="container">
      {this.state.wrongLogin && <div>Wrong Username and Password !</div>}
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
            <form>
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
            <p>{this.state.username}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
