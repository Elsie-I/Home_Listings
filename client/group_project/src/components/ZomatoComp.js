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
        console.log(zomatoData)
        //console.log("this iw working =>", zomatoData.restaurants[3].restaurant.name)
      })
  };


  dudley() {
    if (this.state.zomatoDataReceived) {
      return (
        <div>
          {/*<p>it has loaded</p>*/}
          <h3>Here are some popular restaurants and bars nearby</h3>
          <ul className="restaurantlist">{this.state.zomatodata.map((elem, index)=>{
            return ( 
              <div className="eachrestaurant"> 
                <li>{elem.restaurant.name}</li>
                <li>Cuisine Type: {elem.restaurant.cuisines}</li>
                <li>{elem.restaurant.location.address}</li>
                <img src={elem.restaurant.featured_image} height="150" width="150"/>
                <li>Average Rating: {elem.restaurant.user_rating.aggregate_rating}</li>      
              </div>
            )}
          )}</ul>
        </div>
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

