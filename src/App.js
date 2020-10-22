import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import AddScreen from "./screens/AddScreen";
import AntiqueScreen from "./screens/AntiqueScreen";
import AdminScreen from "./screens/AdminScreen";
import UpdateScreen from "./screens/UpdateScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen}/>
          <Route path="/list" component={HomeScreen} />
          <Route path="/add" component={AddScreen} />
          <Route path="/update/:id" component={UpdateScreen} />
          <Route path="/get/:id" component={AntiqueScreen} />
          <Route path="/dashboard" component={AdminScreen} />
          <Route path="/profile" component={ProfileScreen}/>
        </Switch>
      </div>
    );
  }
}
