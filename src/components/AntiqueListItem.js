import React, { Component } from "react";
import Countdown , {zeroPad } from "react-countdown";
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
            <p>Ending In : </p>
            <Countdown date={this.props.deadline} renderer={renderer} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                alignSelf: "stretch"
              }}
            >
              <span className="card-text">{this.props.price}</span>
              <button className="btn btn-primary">Bid Now</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
