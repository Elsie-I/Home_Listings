import React, { Component } from 'react';
import Home from './Home'
class HomeList extends Component {
  render() {
    return (
      <ul className="homeslist">{this.props.homes.map((homes) => {
        return (
          <Home
            key={homes.id}
            homes={homes}
          />
        )
      })}
      </ul>
      );
  }
}
export default HomeList;