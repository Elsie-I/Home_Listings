import React, { Component } from 'react';

class OwnerSingle extends Component {
  render() {
    return (
     <div className="ownersingle">
     <h1>Here is your Listing</h1>
        <p>{this.props.singlehome.address}</p>
        <p>{this.props.singlehome.zipcode}</p>
        <p>{this.props.singlehome.city}</p>
        <p>{this.props.singlehome.bedrooms}</p>
        <p>{this.props.singlehome.price}</p>
        <p>{this.props.singlehome.about}</p>
        <p>{this.props.singlehome.img_url}</p>
     </div>

    )
  }
}
export default OwnerSingle;
