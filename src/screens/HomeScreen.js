import React, { Component } from 'react';
import AntiqueService from "../service/AntiqueService";
import AntiqueList from "../components/AntiqueList";
import AuthService from "../service/AuthService";

class HomeScreen extends Component {
constructor(props) {
  super(props);
  this.state = {
    items:[]
  };
}

  componentDidMount() {
    console.log(AuthService.login("user","user"));
    let response=AntiqueService.getAllAntique(0,'ASC').then(response=>{
      console.log(response.data)
        this.setState({items:response.data});
    })
    .catch(e=>{
      console.log(e);
      }
    )
  }

  render() {
    return (
      <>
        <AntiqueList items={this.state.items}/>
      </>
    );
  }

}
export default HomeScreen;
