import React, { Component } from 'react';
import Home from './Home';
import NotFound from './NotFound';
import { Route, Redirect } from 'react-router'

class HomeList extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      homes: [],
      results: '',
      submitForm: false,
      zipCodeValue: 'NULL',
      cityValue: 'NULL',
      priceMoreThan: 'NULL',
      priceLessThan: 'NULL',
      bedrooms: 'NULL',
      searchFetchData: [],
    })
    this.handleZipCodeValueChange = this.handleZipCodeValueChange.bind(this);
    this.handleCityValueChange = this.handleCityValueChange.bind(this);
    this.handlePriceLessThanValueChange = this.handlePriceLessThanValueChange.bind(this);
    this.handlePriceMoreThanValueChange = this.handlePriceMoreThanValueChange.bind(this);
    this.handleBedroomsValueChange = this.handleBedroomsValueChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleDeleteHome = this.handleDeleteHome.bind(this);
    this.handleHomesEdit = this.handleHomesEdit.bind(this);
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
        this.setState({
          homes: responseJson.data.homes,
        });
      });
  }


  handleZipCodeValueChange(event) {
    if (event.target.value.replace(/\s/g, '') === '') {
      this.setState({ zipCodeValue: 'NULL' })
    } else {
      this.setState({ zipCodeValue: event.target.value.replace(/\s/g, '') });
    }
  };

  handleCityValueChange(event) {
    this.setState({ cityValue: event.target.value });
  };

  handlePriceMoreThanValueChange(event) {
    if (event.target.value.replace(/\s/g, '') === '') {
      this.setState({ priceMoreThan: 'NULL' })
    } else {
      this.setState({ priceMoreThan: event.target.value.replace(/\s/g, '') });
    }
  };

  handlePriceLessThanValueChange(event) {
    if (event.target.value.replace(/\s/g, '') === '') {
      this.setState({ priceLessThan: 'NULL' })
    } else {
      this.setState({ priceLessThan: event.target.value.replace(/\s/g, '') });
    }
  };
  handleBedroomsValueChange(event) {
    if (event.target.value.replace(/\s/g, '') === '') {
      this.setState({ bedrooms: 'NULL' })
    } else {
      this.setState({ bedrooms: event.target.value.replace(/\s/g, '') });
    }
  };

  handleSearchSubmit(event) {
    event.preventDefault();
    fetch(`http://homelistings.herokuapp.com/api/homes/results/zipcode=${this.state.zipCodeValue}&city=${this.state.cityValue}&pricemore=${this.state.priceMoreThan}&priceless=${this.state.priceLessThan}&bedrooms=${this.state.bedrooms}`)
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        this.setState({
          searchFetchData: responseJson.data.home,
          submitForm: true,
        })
      });
  }

  redirectToSearch(value) {
    // if (this.state.submitForm) {
    //   return <Redirect to={{
    //     pathname: `/propertieslist/search/zipcode=${this.state.zipCodeValue}&city=${this.state.cityValue}&price=${this.state.priceMoreThan}and${this.state.priceLessThan}&end`,
    //   }} />
    // }
  }

  handleHomesEdit(event) {
    event.preventDefault();
    fetch(`https://homelistings.herokuapp.com/api/homes/${event.target.id.value}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        address: event.target.address.value,
        zipcode: event.target.zipcode.value,
        city: event.target.city.value,
        bedrooms: event.target.bedrooms.value,
        price: event.target.price.value,
        about: event.target.about.value,
        img_url: event.target.img_url.value,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          this.fetchAllHomes();
        }
      })
  }

  handleDeleteHome(id) {
    fetch(`https://homelistings.herokuapp.com/api/homes/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          this.fetchAllHomes();
        }
      })
  }



  renderToPage() {
    if (this.state.submitForm == false) {
      return (
        <ul className="homeslist">{this.state.homes.map((elem) => {
          return (
            <Home
              key={elem.id}
              homes={elem}
              handleDeleteHome={this.handleDeleteHome}
              handleHomesEdit={this.handleHomesEdit}
            />
          )
        })}
        </ul>
      )
    }
    else {
      if (this.state.searchFetchData.length > 0) {
        console.log("this is console logging=>", this.state.searchFetchData)
        return (
          <ul className="homeslist">{this.state.searchFetchData.map((elem) => {
            return (
              <Home
                key={elem.id}
                homes={elem}
              />
            )
          })}
          </ul>
        )
      } else {
        return (
          <NotFound />
        )
      }
    }
  }


  render() {
    return (
      <div>
        <form
          className="searchform"
          onSubmit={this.handleSearchSubmit}
        >
          <select name="cityValue" onChange={this.handleCityValueChange} >
            <option value="NULL">-- City --</option>
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

          <br />
          <br />
          Bedrooms:
          <input type="text"
            value={this.searchValue}
            name='bedrooms'
            placeholder=''
            onChange={this.handleBedroomsValueChange}
          />

          <input type="submit" value="Search Now" />
        </form>

        {this.renderToPage()}
      </div>
    );
  }
}

export default HomeList;