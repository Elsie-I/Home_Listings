import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="singleHome">
        <li>Pictures: {this.props.homes.img_url}</li>
        <li>About: {this.props.homes.about}</li>
        <li>Address: {this.props.homes.address}</li>
        <li>Zipcode: {this.props.homes.zipcode}</li>
        <li>City: {this.props.homes.city}</li>
        <li>Bedrooms: {this.props.homes.bedrooms}</li>
        <li>Price: {this.props.homes.price}</li>
      </div>
    )
  }
}
export default Home;