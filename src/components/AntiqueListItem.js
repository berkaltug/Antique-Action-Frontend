import React, { Component } from "react";
import Countdown , {zeroPad } from "react-countdown";
import { Link } from "react-router-dom";
export default class AntiqueListItem extends Component {
  constructor(props) {
    super(props);
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
      <div>
        <div className="card" style={{ width: "14rem" }}>
          <img
            src={
              this.props.image
                ? "http://localhost:8080/" + this.props.image
                : "https://via.placeholder.com/175"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{this.props.name}</h5>
            <p>{this.props.description}</p>
            <p style={{fontWeight:"bold"}}>Ending In : </p>
            <div className="count-box2">
            <Countdown date={this.props.deadline} renderer={renderer} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                alignSelf: "stretch"
              }}
            >
              <span style={{fontWeight:"bold"}}>{this.props.price} $</span>
              <Link to={"/get/" +this.props.id} type="button" className="btn btn-primary">
              Bid Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
