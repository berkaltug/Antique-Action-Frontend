import React, { Component } from "react";

class PastBidList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table className="table table-striped table-dark w-100">
          <thead>
            <tr>
              <th scope="col">Antique</th>
              <th scope="col">Price</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
          {this.props.pastBids && this.props.pastBids.map((bid, index)=>{
            return (
              <tr key={index}>
              <td>{bid.antique}</td>
              <td>{bid.bid}</td>
              <td>{bid.time}</td>
              <td>{bid.status}</td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PastBidList;
