import React, { Component } from 'react';

class SaleList extends Component {

  render() {
    return (
      <div>
        <table className="table table-striped table-dark w-100">
          <thead>
            <tr>
              <th>Antique</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {this.props.sales && this.props.sales.map((sale,index)=>{
            return (
              <tr>
                <td>{sale.antique}</td>
                <td>{sale.price}</td>
                <td>{sale.date}</td>
              </tr>
            )
          })}</tbody>
        </table>
      </div>
    );
  }

}

export default SaleList;
