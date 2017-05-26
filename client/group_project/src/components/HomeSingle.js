import React, { Component } from 'react';


class HomeSingle extends Component {
  constructor(props) {
    super(props);
    // console.log('home ID' +  props.match.params.id )
    this.state = {
      homeId: props.match.params.id,
      home: null,
      homeDataReceived: false,
      zomatoDataReceived: false,
      zomatodata: null,
    }
 }

 componentDidMount() {
    fetch(`https://homelistings.herokuapp.com/api/homes/${this.state.homeId}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // console.log('the data -> ', data)
        // console.log(data.data)
        // console.log(data.data.home.zipcode, 'only home')
        // console.log(data.data.home.cityname, 'only home')
        this.setState({
          home: data,
          homeDataReceived: true,
        })
      })
      this.fetchZomato()
  }

  fetchZomato() {
     if (this.state.homeDataReceived===true) {
      console.log(this.state.home.data.home.city, 'city city')
      
  fetch(`https://developers.zomato.com/api/v2.1/search?q=${this.state.home.data.home.city}`, {
      method: 'post',
      headers: {
      "user-key": "1259e86a2176b246f97529b9c0ca6139",
      "Accept": "application/json"    
      }})
    .then((response)=>{
    return response.json();
        }).then((zomatoData)=>{
          console.log(zomatoData.restaurants)
          debugger
          this.setState({
            zomatoDataReceived: true,
            zomatodata: zomatoData.restaurants,
          })
    })
  }
  }

//  fetchZomato() {
//     console.log(this.state.home, 'zomatoERWER')
//       fetch(`https://developers.zomato.com/api/v2.1/search?q=elmhurst`, {
//       method: 'post',
//       headers: {
//       "user-key": "1259e86a2176b246f97529b9c0ca6139",
//       "Accept": "application/json"    
//       }})
//     .then((response)=>{
//     return response.json();
//         }).then((zomatoData)=>{
//           console.log(zomatoData)
//           this.setState({
//             zomatoDataReceived: true,
//             zomatodata: zomatoData,
//           })
//     })
//  }


 renderHome() {
  //  console.log('this shit',this.state)
    if (this.state.homeDataReceived) {
      console.log(this.state.home.data.home.city, 'city city')
      // debugger
      return (
        <div className="my-home">
          <p className="address">{this.state.home.data.home.address}</p>
          <p className="zipcode">{this.state.home.data.home.zipcode}</p>
          <p className="city">{this.state.home.data.home.city}</p>
          <p className="bedrooms">{this.state.home.data.home.bedrooms}</p>
          <p className="about">{this.state.home.data.home.about}</p>
          <img src={this.state.home.data.home.img_url} className="singleImg" alt=""/>
      </div>
      );
    }
  }


 render() {
    return (
      <div className="single-home">
        {this.renderHome()}
      </div>
    );
  };
}

export default HomeSingle;
