import React, { Component } from 'react';
import Home from './Home'
class HomeList extends Component {
    constructor(props){
    super(props);
  this.state={
    homes:[],
  }
  }
  componentDidMount() {
    this.fetchAllHomes()
  }

  fetchAllHomes() {
    fetch('https://homelistings.herokuapp.com/api/homes')
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      console.log(responseJson)
      this.setState((prevState) => {
        return {
          homes: responseJson.data.homes,
        }
      });
    });
  }

  render() {
    return (
      <div>
        <ul className="homeslist">{this.state.homes.map((elem) => {
          return (
            <Home
              key={elem.id}
              homes={elem}
            />
          )
        })}
        </ul>
      </div>
      );
  }
}
export default HomeList;