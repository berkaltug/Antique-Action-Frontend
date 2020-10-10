import React, { Component } from "react";
import Navigation from "../components/Navigation";
import ButtonGroup from "../components/ButtonGroup";
import AntiqueService from "../service/AntiqueService";
class AdminScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isError: false,
      demo: false
    };
  }
  setError = value => {
    if (value) {
      AntiqueService.getAllAntique(0, "ASC").then(response => {
        console.log("updated")
        this.setState({ list: response.data.content });
      });
    } else {
      this.setState({ isError: value });
    }

  };

  componentDidMount() {
    AntiqueService.getAllAntique(0, "ASC").then(response => {
      this.setState({ list: response.data.content });
    });
  }

  render() {
    return (
      <>
        <Navigation />
        {this.state.isError && (
          <div className="alert alert-danger">
            An error occured while deleting ! Try Again.
          </div>
        )}
        <div className="container mt-5">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.list &&
                this.state.list !== [] &&
                this.state.list.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td className="tr-desc">{item.description}</td>
                      <td>{item.price}</td>
                      <td>
                        <ButtonGroup id={item.id} callback={this.setError} />
                      </td>
                    </tr>
                  );
                })}
              {this.state.list === [] && (
                <tr>
                  <td>There is no any antique</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default AdminScreen;
