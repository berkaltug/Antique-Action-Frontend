import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import AddScreen from "./screens/AddScreen";
import AntiqueScreen from "./screens/AntiqueScreen";
import AdminScreen from "./screens/AdminScreen";
import UpdateScreen from "./screens/UpdateScreen";


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
          <Route path="/list" component={HomeScreen} />
          <Route path="/add" component={AddScreen} />
          <Route path="/update" component={UpdateScreen} />
          <Route path="/get" component={AntiqueScreen} />
          <Route path="/dashboard" component={AdminScreen} />
        </Switch>
      </div>
    );
  }
}
