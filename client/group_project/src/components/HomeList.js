import React, { Component } from 'react';
import Home from './Home'
class HomeList extends Component {
  render() {
    return (
      <ul className="homeslist">{this.props.homes.map((elem) => {
        return (
          <Home
            key={elem.id}
            homes={elem}
          />
        )
      })}
      </ul>
      );
  }
}
export default HomeList;