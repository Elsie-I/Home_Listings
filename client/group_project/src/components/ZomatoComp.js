import React, { Component } from 'react';
class ZomatoComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zomatodata: null,
    }
  }
  componentDidMount() {

    fetch(`https://developers.zomato.com/api/v2.1/search?q=${this.prop.propcity}`, {
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
        //debugger
        this.setState({
          zomatoDataReceived: true,
          zomatodata: zomatoData,
          homeDataReceived: false,
        })
      })


  };

  render() {
    return (
      <div>
        {console.log(this.props.zomatostuff.restaurants[3])}
        <ul>{this.props.zomatostuff.restaurants.map((elem) => {
          <li>elem.restaurant.currency</li>
        })}
        </ul>
      </div>
    )
  }
}
export default ZomatoComp;

