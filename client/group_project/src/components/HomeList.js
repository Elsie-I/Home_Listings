import React, { Component } from 'react';
import Home from './Home';
import SearchResult from './SearchResult';

import { Route, Redirect } from 'react-router'

class HomeList extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      homes: [],
      results: '',
      submitForm: false,
      zipCodeValue: 'none',
      cityValue: 'none',
      priceMoreThan: 'none',
      priceLessThan: 'none',
    })
    this.handleZipCodeValueChange = this.handleZipCodeValueChange.bind(this);
    this.handleCityValueChange = this.handleCityValueChange.bind(this);
    this.handlePriceLessThanValueChange = this.handlePriceLessThanValueChange.bind(this);
    this.handlePriceMoreThanValueChange = this.handlePriceMoreThanValueChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
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
        // console.log(responseJson)
        this.setState({
          homes: responseJson.data.homes,
        });
      });
  }

  handleZipCodeValueChange(event) {
    if (event.target.value.replace(/\s/g, '') === '') {
      this.setState({ zipCodeValue: 'none' })
    } else {
      this.setState({ zipCodeValue: event.target.value.replace(/\s/g, '') });
    }
  };

  handleCityValueChange(event) {
    this.setState({ cityValue: event.target.value });
  };

  handlePriceMoreThanValueChange(event) {
    if (event.target.value.replace(/\s/g, '') === '') {
      this.setState({ priceMoreThan: 'none' })
    } else {
      this.setState({ priceMoreThan: event.target.value.replace(/\s/g, '') });
    }
  };

  handlePriceLessThanValueChange(event) {
    if (event.target.value.replace(/\s/g, '') === '') {
      this.setState({ priceLessThan: 'none' })
    } else {
      this.setState({ priceLessThan: event.target.value.replace(/\s/g, '') });
    }
  };


  handleSearchSubmit(event) {
    event.preventDefault();
    this.setState({
      submitForm: true,
    })
  }

  redirectToSearch(value) {
    if (this.state.submitForm) {
      return <Redirect to={{
        pathname: `/propertieslist/search/zipcode=${this.state.zipCodeValue}&city=${this.state.cityValue}&price=${this.state.priceMoreThan}and${this.state.priceLessThan}&end`,
      }} />
    }
  }
 
  render() {
    return ( 
      <div>
        {this.redirectToSearch(this.state.results)}

        <form 
          className="searchform"
          onSubmit={this.handleSearchSubmit}
        >
          <select name="cityValue" onChange={this.handleCityValueChange} >
            <option value="none">-- City --</option>
            <option value="queens">Queens</option>
            <option value="manhattan">Manhattan</option>
            <option value="brooklyn">Brooklyn</option>
          </select>
          <br />
          <br />

          Zip Code:
          <input type="text"
            value={this.searchValue}
            name='zipCode'
            placeholder='Zip Code'
            onChange={this.handleZipCodeValueChange}
          />
          <br />
          <br />

          Price:
          <input type="text"
            value={this.searchValue}
            name='priceMoreThan'
            placeholder=''
            onChange={this.handlePriceMoreThanValueChange}
          />
          <input type="text"
            value={this.searchValue}
            name='priceLessThan'
            placeholder=''
            onChange={this.handlePriceLessThanValueChange}
          />

          <input type="submit" value="Search Now" />
        </form>


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