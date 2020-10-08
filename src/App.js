import React from 'react';
import { Switch, Route,Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import AddScreen from "./screens/AddScreen";
import AntiqueScreen from "./screens/AntiqueScreen";
import AdminScreen from "./screens/AdminScreen";
import UpdateScreen from "./screens/UpdateScreen";
import AuthService from "./service/AuthService";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
    <nav className="navbar navbar-expand navbar-dark bg-dark">
       <span  className="navbar-brand">
         Antique Auction Bazaar
       </span>
       <div className="navbar-nav mr-auto">
         <li className="nav-item">
           <Link to={"/list"} className="nav-link">
             Antique List
           </Link>
         </li>
         {
           AuthService.getCurrentUser().username=="admin" &&
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
         }
       </div>
     </nav>

      <Switch>
        <Route exact path="/" component={LoginScreen}/>
        <Route  path="/list" component={HomeScreen}/>
        <Route  path="/add" component={AddScreen}/>
        <Route  path="/update" component={UpdateScreen}/>
        <Route  path="/get" component={AntiqueScreen}/>
        <Route path="/dashboard" component={AdminScreen}/>
      </Switch>
    </div>
  );
}

export default App;
