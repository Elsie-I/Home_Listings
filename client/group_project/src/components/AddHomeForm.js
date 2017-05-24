import React, { Component } from 'react';

class AddHomeForm extends Component {
  render() {
    return (
      <div className="addhomediv">
          <form
              onSubmit={this.props.handleHomesSubmit}
              >
          <input
            type="text"
            value={this.props.inputAddressValue}
            name='address'
            placeholder='Address'
            onChange={this.props.handleAddressChange}
        /><br/>
        <input
          type="text"
          value={this.props.inputZipcodeValue}
          name='zipcode'
          placeholder='ZipCode'
          onChange={this.props.handleZipcodeChange}
        /><br/>
        <input
          type="text"
          value={this.props.inputCityValue}
          name='city'
          placeholder='City'
          onChange={this.props.handleCityChange}
        /><br/>
        <input
          type="text"
          value={this.props.inputBedroomsValue}
          name='bedrooms'
          placeholder='Number of Bedrooms'
          onChange={this.props.handleBedroomsChange}
        /><br/>
        <input
          type="text"
          value={this.props.inputPriceValue}
          name='price'
          placeholder='Price'
          onChange={this.props.handlePriceChange}
        /><br/>
        <input
          type="text"
          value={this.props.inputAboutValue}
          name='about'
          placeholder='About'
          onChange={this.props.handleAboutChange}
        /><br/>
        <input
          type="text"
          value={this.props.inputImgValue}
          name='img_url'
          placeholder='Image URl'
          onChange={this.props.handleImgChange}
        /><br/>
        <input type="submit" value="Add Quote!" />

          </form>
      </div>
    )
  }
}
export default AddHomeForm;