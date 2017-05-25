import React, { Component } from 'react';

class DetailsSinglePage extends Component {

  componentDidMount() {
    this.fetchSingleHome()
  }


  fetchSingleHome() {
    fetch(`https://homelistings.herokuapp.com/api/homes/${this.props.ids}`)
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      console.log(responseJson)
      
      this.setState((prevState) => {
        return {
          homes: responseJson.ids,
        }
      });
    });
  }
  render() {
    return (
      <div>
              <p>Property Id {this.props.ids}</p>
      </div>
    )
  }
}
export default DetailsSinglePage;