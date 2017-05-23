import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div className="singleHome">
        <li>{this.props.homes.data.homes}</li>
      </div>
    )
  }
}
export default Home;