import React, { Component } from "react";
import AntiqueService from "../service/AntiqueService";
import AntiqueList from "../components/AntiqueList";
import AuthService from "../service/AuthService";
import Navigation from "../components/Navigation";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    let response = AntiqueService.getAllAntique(0, "ASC")
      .then(response => {
        this.setState({ items: response.data.content });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handlePagination = () => {};
  render() {
    return (
      <>
        <Navigation />
        <div className="row mt-5">
          <div className="col-md-9">
          <form onSubmit={""} className="d-flex m-3 flex-row justify-content-center align-items-center">
          <input type="text" placeholder="Search Name" className="form-control"/>
          <button className="btn btn-primary">Search</button>
          </form>
          </div>
          <div className="col-md-3"></div>
        </div>
        <AntiqueList items={this.state.items} />
      </>
    );
  }
}
export default HomeScreen;
