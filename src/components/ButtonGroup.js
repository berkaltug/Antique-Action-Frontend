import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AntiqueService from "../service/AntiqueService";

class ButtonGroup extends Component {

  constructor(props) {
    super(props);
  }

  pressDelete=()=>{
    AntiqueService.deleteAntique(this.props.id).catch(error=>{
      this.handleCallback(true);
    })
  }

  handleCallback=(value)=>{
    this.props.callback(value);
  }

  render() {
    return (
      <>
      <div class="btn-group" role="group" aria-label="Basic example">
          <Link to={"/get/" +this.props.id} type="button" className="btn btn-primary">See</Link>
          <Link to={"/update/" + this.props.id} type="button" className="btn btn-success">Update</Link>
          <button type="button" class="btn btn-danger" onClick={this.pressDelete}>delete</button>
      </div>
      </>
    );
  }

}

export default ButtonGroup;
