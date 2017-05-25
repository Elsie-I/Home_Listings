import React, { Component } from 'react';

class DetailsSinglePage extends Component {
  constructor(props){
    super(props);
  this.state={
    homes:[],
    }
  }
  componentDidMount() {
    this.fetchSingleHome()
  }


  fetchSingleHome() {
    fetch(`https://homelistings.herokuapp.com/api/homes/${this.props.ids}`)
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      // console.log(responseJson)
      //debugger
      // this.setState((prevState) => {
      //   return {
      //     homes: responseJson.data.homes,
      //   }
      // });
    });
  }
  render() {
    return (
      <div>
        <p>this is page for id {this.props.ids}</p>
      </div>
    )
  }
}
export default DetailsSinglePage;