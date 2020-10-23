import React, { Component } from "react";
import AntiqueService from "../service/AntiqueService";
import AntiqueList from "../components/AntiqueList";
import AuthService from "../service/AuthService";
import Navigation from "../components/Navigation";
import Pagination from "react-js-pagination";
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      totalPages: null,
      totalItemsCount: null,
      itemsCountPerPage: null,
      activePage: 1,
      order: "ASC",
      string: "",
      isSearched: false
    };
  }

  async componentDidMount() {
    await this.fetchAntiques(1);
  }

  async fetchAntiques(pageNumber) {
     await AntiqueService.getAllAntique(pageNumber, this.state.order)
      .then(response => {
        this.setState({
          items: response.data.content,
          totalPages: response.data.totalPages,
          totalItemsCount: response.data.totalElements,
          itemsCountPerPage: response.data.size
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handlePageChange = async pageNumber => {
    this.setState({ activePage: pageNumber });
    await this.fetchAntiques(pageNumber);
  };

  handleOrderSelect = e => {
    this.setState({ order: e.target.value });
  };

  handleSearchBar = e => {
    this.setState({ string: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.searchAntique();
  };

  searchAntique = async (pageNumber = 1) => {
    this.setState({ activePage: pageNumber});
    await AntiqueService.searchAntique(
      pageNumber,
      this.state.order,
      this.state.string
    ).then(response => {
      this.setState({
        items: response.data.content,
        totalPages: response.data.totalPages,
        totalItemsCount: response.data.totalElements,
        itemsCountPerPage: response.data.size,
        isSearched: true
      });
    });
  };

  render() {
    return (
      <>
        <Navigation />
        <div className="row mt-5">
          <div className="col-md-3"></div>
          <div className="col-md-6 col-sm-12">
            <form
              onSubmit={this.handleSubmit}
              className="d-flex  flex-row justify-content-around align-items-center"
            >
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Antique"
                  onChange={this.handleSearchBar}
                />
                <div className="input-group-append">
                  <select
                    className="form-control"
                    if="sort"
                    style={{ width: "6rem" }}
                    value={this.state.order}
                    onChange={this.handleOrderSelect}
                  >
                    <option value="ASC">Asc</option>
                    <option value="DESC">Desc</option>
                  </select>
                  <button className="btn btn-primary" type="submit">
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
        <AntiqueList items={this.state.items} />
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="d-flex justify-content-center">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.itemsCountPerPage}
                totalItemsCount={this.state.totalItemsCount}
                pageRangeDisplayed={3}
                itemClass="page-item"
                linkClass="page-link"
                onChange={
                  this.state.isSearched
                    ? this.searchAntique
                    : this.handlePageChange
                }
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default HomeScreen;
