import React, { Component } from "react";
import Countdown, { zeroPad } from "react-countdown";
import Navigation from "../components/Navigation";
import AntiqueService from "../service/AntiqueService";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
class AntiqueScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: "",
      desc: "",
      price: null,
      latestBid: null,
      pastBids: [],
      images: [],
      deadline: ""
    };
  }

  componentDidMount() {
    AntiqueService.getAntique(this.props.match.params.id).then(response => {
      const antique = response.data;
      console.log(antique);
      this.setState({
        id: antique.id,
        name: antique.name,
        desc: antique.description,
        price: antique.price,
        latestBid: antique.latestBid,
        pastBids: antique.pastBids,
        images: antique.imagePath,
        deadline: antique.deadline
      });
    });
  }

  render() {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a complete state
        return <span>Ended</span>;
      } else {
        // Render a countdown
        return (
          <span>
            {days}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
          </span>
        );
      }
    };
    return (
      <>
        <Navigation />
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                <Carousel dynamicHeight={false}>
                {
                  this.state.images && this.state.images.map((path,index)=>{
                    return (
                      <div key={index}>
                        <img src={`http://localhost:8080/${path}`} alt="..."/>
                      </div>
                    )
                  })
                }
                {
                  this.state.images===[] &&
                   
                    <div>
                      <img src={"https://via.placeholder.com/375"} alt="..."/>
                    </div>

                }
                </Carousel>
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
              <h4>{this.state.name}</h4>
              <p style={{fontSize:"1.3rem"}}>{this.state.desc}</p>
              <p>Ending in:</p>
              <Countdown date={new Date(this.state.deadline)} renderer={renderer}/>
            </div>
          </div>
          <h4>Bid History</h4>
          <div className="row">
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
              <ul className="list-group">
                {this.state.pastBids &&
                  this.state.pastBids.sort(function(a, b) {
                    return b - a;
                  }) &&
                  this.state.pastBids.map((bid, index) => {
                    return <li className="list-group-item">{bid}</li>;
                  })}
              </ul>
            </div>
            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center"></div>
          </div>
        </div>
      </>
    );
  }
}

export default AntiqueScreen;
