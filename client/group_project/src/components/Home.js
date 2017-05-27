import React, { Component } from 'react';
import HomeSingle from './HomeSingle'
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';

import { Route, Redirect } from 'react-router'


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBeingEdited: false,
      inputAddressValue: this.props.homes.address,
      inputZipcodeValue: this.props.homes.zipcode,
      inputCityValue: this.props.homes.city,
      inputBedroomsValue: this.props.homes.bedrooms,
      inputPriceValue: this.props.homes.price,
      inputAboutValue: this.props.homes.about,
      inputImgValue: this.props.homes.img_url,
      seeMore: false,
    }
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleZipcodeChange = this.handleZipcodeChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleBedroomsChange = this.handleBedroomsChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleAboutChange = this.handleAboutChange.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.redirectToSingle = this.redirectToSingle.bind(this);
  }

  handleAddressChange(event) {
    this.setState({ inputAddressValue: event.target.value })
  }
  handleZipcodeChange(event) {
    this.setState({ inputZipcodeValue: event.target.value })
  }
  handleCityChange(event) {
    this.setState({ inputCityValue: event.target.value })
  }
  handleBedroomsChange(event) {
    this.setState({ inputBedroomsValue: event.target.value })
  }
  handlePriceChange(event) {
    this.setState({ inputPriceValue: event.target.value })
  }
  handleAboutChange(event) {
    this.setState({ inputAboutValue: event.target.value })
  }
  handleImgChange(event) {
    this.setState({ inputImgValue: event.target.value })
  }

  renderEditForm() {
    return (
      <form
        className="editform"
        onSubmit={(event) => {
          this.props.handleHomesEdit(event);
          this.setState({ isBeingEdited: false });
        }}>
        <input
          type="text"
          value={this.state.inputAddressValue}
          name='address'
          placeholder='Address'
          onChange={this.handleAddressChange}
        /><br />
        <input
          type="text"
          value={this.state.inputZipcodeValue}
          name='zipcode'
          placeholder='ZipCode'
          onChange={this.handleZipcodeChange}
        /><br />
        <input
          type="text"
          value={this.state.inputCityValue}
          name='city'
          placeholder='City'
          onChange={this.handleCityChange}
        /><br />
        <input
          type="text"
          value={this.state.inputBedroomsValue}
          name='bedrooms'
          placeholder='Number of Bedrooms'
          onChange={this.handleBedroomsChange}
        /><br />
        <input
          type="text"
          value={this.state.inputPriceValue}
          name='price'
          placeholder='Price'
          onChange={this.handlePriceChange}
        /><br />
        <input
          type="text"
          value={this.state.inputAboutValue}
          name='about'
          placeholder='About'
          onChange={this.handleAboutChange}
        /><br />
        <input
          type="text"
          value={this.state.inputImgValue}
          name='img_url'
          placeholder='Image URl'
          onChange={this.handleImgChange}
        /><br />
        <input
          style={{ visibility: 'hidden' }}
          readOnly
          name="id"
          value={this.props.homes.id} />
        <input type="submit" value="Edit Now!" />
      </form>
    )
  }

  renderItems() {
    if (this.state.isBeingEdited === false) {
      return this.renderInfo();
    } else {
      return this.renderEditForm();
    }
  }

  render() {
    return (
      <div>
        {this.renderItems()}
        {this.redirectToSingle()}
      </div>
    )
  }

  redirectToSingle() {   
    if (this.state.seeMore) {
      console.log('workign haaa', this.props.homes.id);
      return (
        <Redirect to={{
          pathname: `/propertieslist/${this.props.homes.id}`,
        }} />
      )

    }


  }

  renderInfo() {
    return (
      <Router>
        <div className="singleHome">
          <li><img src={this.props.homes.img_url} alt="" /></li>
          <li>About: {this.props.homes.about}</li>
          <li>Address: {this.props.homes.address}</li>
          <li>Zipcode: {this.props.homes.zipcode}</li>
          <li>City: {this.props.homes.city}</li>
          <li>Bedrooms: {this.props.homes.bedrooms}</li>
          <li>Price: {this.props.homes.price}</li>
          <button onClick={() => {
            this.setState({ seeMore: true, })
          }} >See More</button>
          <button onClick={() => { this.props.handleDeleteHome(this.props.homes.id) }}>
            Delete Home
              </button>
          <button onClick={() => {
            this.setState({ isBeingEdited: true })
          }}>
            Edit Listing</button>
          <Route path="/propertieslist/:id" component={HomeSingle} />
        </div>

      </Router>
    )
  }
}

export default Home;