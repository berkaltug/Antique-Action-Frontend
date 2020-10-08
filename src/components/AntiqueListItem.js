import React, { Component } from 'react';

export default class AntiqueListItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <div className="card" style={{width:"10rem"}}>
        <img src={'http://localhost:8080' + this.props.image} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{this.props.name}</h5>
          <p>{this.props.description}</p>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
            <p className="card-text">{this.props.price}</p>
            <button className="btn btn-primary">Bid Now</button>
          </div>
        </div>
      </div>
      </div>
    );
  }

}
