import React, { Component } from "react";
import AntiqueService from "../service/AntiqueService";
import Navigation from "../components/Navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class AddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      price: "",
      file: null,
      deadline: new Date(),
      uploadSuccess: false,
      errorMessage: ""
    };
  }
  formatDate = date => {
    let dateStr = "";
    dateStr += date.getFullYear() + "-";
    dateStr += (date.getMonth() + 1).toString().padStart(2, 0) + "-";
    dateStr += date.getDate().toString().padStart(2, 0) + " ";
    dateStr += date.getHours().toString().padStart(2, 0) + ":";
    dateStr += date.getMinutes().toString().padStart(2, 0) + ":";
    dateStr += date.getSeconds().toString().padStart(2, 0);
    return dateStr;
  };

  handleDate = date => {
    console.log(date.toString());
    console.log(this.formatDate(date));
    this.setState({ deadline: date });
  };
  handleName = e => {
    this.setState({ name: e.target.value });
  };
  handleDesc = e => {
    this.setState({ desc: e.target.value });
  };
  handlePrice = e => {
    this.setState({ price: e.target.value });
  };
  handleFile = e => {
    this.setState({ file: e.target.files[0] });
  };
  addAntique = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("description", this.state.desc);
    formData.append("price", this.state.price);
    if(this.state.file){formData.append("image",this.state.file)}
    formData.append("deadline", this.formatDate(this.state.deadline));
    for(var pair of formData.entries()){
       console.log(pair[0], pair[1]);
   }

    AntiqueService.addAntique(formData).then(response => {
      this.setState({
        name: "",
        desc: "",
        price: "",
        file: null,
        deadline: new Date(),
        uploadSuccess: true,
        errorMessage: ""
      });
    }).catch((response)=>{
      console.log(JSON.stringify(response))
      this.setState({
        name: "",
        desc: "",
        price: "",
        file: null,
        deadline: new Date(),
        uploadSuccess: false,
        errorMessage: response.data
      });
    });
  };

  render() {
    return (
      <>
      <Navigation/>
      <div className="container">
        {this.state.uploadSuccess && (
          <div className="alert alert-success">Successfully Uploaded !</div>
        )}
        {this.state.errorMessage && (
          <div className="alert alert-danger">{this.state.errorMessage}</div>
        )}
        <form onSubmit={this.addAntique}>
          <div className="form-group">
            <label htmlFor="name">Antique Name</label>
            <input type="text" className="form-control" id="name" onChange={this.handleName} required/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Antique Description</label>
            <textarea
              rows="3"
              type="text"
              className="form-control"
              id="description"
              onChange={this.handleDesc}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Initial Price</label>
            <input type="number" className="form-control" onChange={this.handlePrice} required/>
          </div>
          <div className="form-group">
            <label htmlFor="image">Select Zip File With Images</label>
            <input
              type="file"
              className="form-control-file"
              accept=".zip"
              id="image"
              onChange={this.handleFile}
            />
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Pick Ending Date</label>
            <DatePicker
              selected={this.state.deadline}
              onChange={this.handleDate}
              showTimeSelect
              dateFormat="yy-MM-dd HH:mm"
              timeFormat="HH:mm"
              timeIntervals={30}
            />
          </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
        </form>
      </div>
      </>
    );
  }
}

export default AddScreen;
