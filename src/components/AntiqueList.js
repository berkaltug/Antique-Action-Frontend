import React, { Component } from 'react';
import AntiqueListItem from "./AntiqueListItem";
class AntiqueList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="my-row">
      {this.props.items && this.props.items.map((item,index)=>{
        return(
          <AntiqueListItem name={item.name}
          description={item.description}
          image={item.displayImage}
          price={item.price}
          deadline={item.deadline}/>
        )
      })}
      </div>
    );
  }

}

export default AntiqueList;
