import React, { Component } from 'react';
import Home from './Home';
import Searchedcomp from './Searchedcomp';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
class HomeList extends Component {
    constructor(props){
    super(props);
  this.state={
    homes:[],
    searchValue: "",
  }
  this.handleSearchChange=this.handleSearchChange.bind(this);
  this.handleSearchSubmit=this.handleSearchSubmit.bind(this);
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

  handleSearchChange(event) {
    console.log('cjasdkfj');
    this.setState({searchValue: event.target.value})
  };

  handleSearchSubmit(event) {
    //event.preventDefault();
      fetch('https://homelistings.herokuapp.com/api/homes')
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      responseJson.data.homes.map((elem)=>{
        if (elem.city===this.state.searchValue) {
          console.log(elem.address);
          const newSearched = {
            homes: elem,
          }
          console.log(elem);
        }
      })
      this.setState((prevState) => {
        return {
          newSearched: responseJson.data.homes.elem,
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
        <form 
              className="searchform"
              onSubmit={this.handleSearchSubmit}
                      >
          <input type="text"
                 value={this.searchValue}
                 name='city'
                 placeholder='Search City'
                 onChange={this.handleSearchChange}
                 />
            <input type="submit" value="Search Now"/>
            <li className="mainlinks"><Link to="/propertieslist?city=">Search stuff</Link></li>
        </form>
        {/*<Searchedcomp newSearched={this.state.newSearched}/>*/}
      </div>
      );
  }
}
export default HomeList;