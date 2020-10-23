import React, { Component } from "react";
import Countdown, { zeroPad } from "react-countdown";
import Navigation from "../components/Navigation";
import AntiqueService from "../service/AntiqueService";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import AuthService from "../service/AuthService";
import SaleService from "../service/SaleService";
var SockJS = require('sockjs-client');
var Stomp = require('stompjs');
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
      images:[],
      deadline: "",
      bid: null,
      bidSuccess: false,
      bidError: false,
      message: "",
      buyer:null,
      buyTime:null,
    };
  }

    async componentDidMount() {
     await this.getRequest();
     await this.connectToWsChannel();


  }
  connectToWsChannel= async () =>{
    let sockjs = new SockJS("http://localhost:8080/antique-app-ws");
    let stompClient = Stomp.over(sockjs);
    await stompClient.connect({},()=>{
      stompClient.subscribe(`/antique-topic/bid/${this.state.id}`,(data)=>{
        const dataBody=JSON.parse(data.body);
        this.setState({
          pastBids:[dataBody.bid,...this.state.pastBids],
          latestBid:dataBody.bid
        })
      })
    })
  }

  async getRequest() {
    await AntiqueService.getAntique(this.props.match.params.id).then(response => {
      const antique = response.data;
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

getResults = async () => {
  SaleService.getAntiqueSale(this.state.id)
    .then(response => {
      console.log(response.data);
      if (response.status === 200) {
        this.setState({
          latestBid: response.data.price,
          buyer: response.data.buyer,
          buyTime: response.data.date
        });
      }
    })
    .catch(error => {
      console.log(error.response);
    });
};


  handleInput = (e) => {
    this.setState({ bid: e.target.value });
  };

  makeBid = (e) => {
    e.preventDefault();
    console.log("here bid is " + this.state.bid);
    AntiqueService.makeBid(this.props.match.params.id, this.state.bid)
      .then(response => {
        this.setState({ bidSuccess: true, bidError: false });
      })
      .catch(error => {
        this.setState({
          bidSuccess: false,
          bidError: true,
          message: error.response.data
        });
      });
  };
  render() {
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {

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
              <Carousel dynamicHeight={true}>
                {this.state.images &&
                  this.state.images !== [] &&
                  this.state.images.map((path, index) => {
                    return (
                      <div key={index}>
                        <img src={`http://localhost:8080/${path}`} alt="..." />
                      </div>
                    );
                  })}
              </Carousel>
              { this.state.images.length===0 &&  (
                <>
                  <img
                    src="https://via.placeholder.com/400x350"
                    className="img-fluid"
                    alt="..."
                  />
                  </>
              )}
            </div>


            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center my-jumbotron">
              <h2 style={{ color: "#c62900" }}>{this.state.name}</h2>
              <p style={{ fontSize: "1.3rem" }}>{this.state.desc}</p>
              <p style={{ fontSize: "1.35rem" }}>
                Current Price:{" "}
                {this.state.latestBid ? this.state.latestBid : this.state.price}{" "}
                $
              </p>
              <div className="count-box">
                <p style={{ fontSize: "1.2rem" }}>Ending in:</p>
                <Countdown
                  date={new Date(this.state.deadline)}
                  renderer={renderer}
                  onComplete={this.getResults}
                />
              </div>
            </div>
          </div>

          <div className="row">


            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center my-jumbotron">
            <h4>Bid History</h4>
              <ul className="list-group">
                {this.state.pastBids &&
                  this.state.pastBids.sort(function(a, b) {
                    return b - a;
                  }) &&
                  this.state.pastBids.map((bid, index) => {
                    return <li className="list-group-item">{bid} $</li>;
                  })}
              </ul>
            </div>


            <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center">
              {AuthService.getCurrentUser().username==="admin" && (<h3>Admin can not make a bid</h3>)}
              {AuthService.getCurrentUser().username!=="admin" && (new Date() < new Date(this.state.deadline)) &&  (
                <>
                {this.state.bidSuccess && (
                  <div className="alert alert-success">Bid is successful</div>
                )}
                {this.state.bidError && (
                  <div className="alert alert-danger">{this.state.message}</div>
                )}
                <h5>Make Your Bid</h5>
                <form onSubmit={this.makeBid}>
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      onChange={this.handleInput}
                      required
                    />
                    <button type="submit" className="btn btn-primary mt-2">
                      Send
                    </button>
                  </div>
                </form>
                </>
              )}

              {this.state.buyer && this.state.buyTime && (
                <>
                <h2>And The Winner Is</h2>
                  <p style={{fontSize:"1.8rem"}}>{this.state.buyer}</p>
                  <p style={{fontSize:"1.5rem"}}>for {this.state.latestBid} $</p>
                  <p style={{fontSize:"1.5rem"}}>on {this.state.buyTime}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AntiqueScreen;
