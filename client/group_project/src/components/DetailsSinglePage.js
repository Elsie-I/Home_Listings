import React, { Component } from 'react';

class DetailsSinglePage extends Component {

  componentDidMount() {
    this.fetchSingleHome()
  }


  fetchSingleHome() {
    console.log(`${this.props.id}`)
    fetch(`https://homelistings.herokuapp.com/api/homes/${this.props.id}`)
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      console.log(responseJson)
      
      this.setState((prevState) => {
        return {
          homes: responseJson.id,
        }
      });
    });
  }
  render() {
    return (
      <div>
          
      </div>
    )
  }
}
export default DetailsSinglePage;