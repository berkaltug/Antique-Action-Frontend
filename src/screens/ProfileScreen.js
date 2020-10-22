import React, { Component } from 'react';
import PastBidList from "../components/PastBidList";
import SaleList from "../components/SaleList";
import SaleService from "../service/SaleService";
import Navigation from "../components/Navigation";
class ProfileScreen extends Component {
constructor(props) {
  super(props);
  this.state = {
    pastBids:[],
    sales:[]
  };
}

async componentDidMount() {
  await SaleService.getUsersPastBids().then(response=>
    {
      this.setState({pastBids:response.data});
    }
  )
  await SaleService.getUserSales().then(response=>{
    this.setState({sales:response.data});
  })
}


  render() {
    return (
      <>
      <Navigation/>
      <div className="container">
        <div className="row">


        <div className="col-md-6">
        <h2 className="text-center">Your Past Bids</h2>
          <PastBidList pastBids={this.state.pastBids}/>
        </div>


        <div className="col-md-6">
        <h2 className="text-center">Your Awards</h2>
        <SaleList sales={this.state.sales}/>
        </div>


        </div>
      </div>
      </>
    );
  }

}

export default ProfileScreen;
