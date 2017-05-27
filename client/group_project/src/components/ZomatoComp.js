import React, { Component } from 'react';
class ZomatoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zomatodata: null,
      zomatoDataReceived: false,
    }
  }
  componentDidMount() {
    fetch(`https://developers.zomato.com/api/v2.1/search?q=${this.props.propcity}`, {
      method: 'post',
      headers: {
        "user-key": "1259e86a2176b246f97529b9c0ca6139",
        "Accept": "application/json"
      }
    })
      .then((response) => {
        return response.json();
      }).then((zomatoData) => {

        // console.log(zomatoData.restaurants)

        this.setState({
          zomatodata: zomatoData.restaurants,
          zomatoDataReceived: true,
        })
        console.log("this iw working =>", zomatoData)
      })
  };


  dudley() {
    if (this.state.zomatoDataReceived) {
      return (
        <p>it has loaded</p>
      )
    } else {
      return (
        <p>loading</p>
      )
    }
  }

  render() {
    return (
      <div>
        {this.dudley()}
      </div>
    )
  }
}
export default ZomatoComp;

