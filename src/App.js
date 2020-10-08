import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route,Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HomeScreen/>
      </header>

      <Switch>
        
      </Switch>
    </div>
  );
}

export default App;
