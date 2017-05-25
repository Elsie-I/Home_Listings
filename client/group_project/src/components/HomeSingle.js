import React, { Component } from 'react';


class HomeSingle extends Component {
  constructor(props) {
    super(props);
    // console.log('home ID' +  props.match.params.id )
    this.state = {
      homeId: props.match.params.id,
      home: null,
      homeDataReceived: false,
    }
 }

 componentWillMount() {
    fetch(`https://homelistings.herokuapp.com/api/homes/${this.state.homeId}`)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        // console.log('the data -> ', data)
        // console.log(data.data)
        // console.log(data.data.home.zipcode, 'only home')
        // console.log(data.data.home.address, 'only home')
        this.setState({
          home: data,
          homeDataReceived: true,
        })
        // .catch(err => console.log('err '+err))
      });
  }
 
 renderHome() {
  //  console.log('this shit',this.state)
    if (this.state.homeDataReceived) {
      console.log(this.state.home)
      // debugger
      return (
        <div className="my-home">
          <span className="address">{this.state.home.data.home.address}</span>
          <span className="zipcode">{this.state.home.data.home.zipcode}</span>
          <span className="city">{this.state.home.data.homecity}</span>
          <span className="bedrooms">{this.state.home.data.home.bedrooms}</span>
          <span className="about">{this.state.home.data.home.about}</span>
          <span className="img_url">{this.state.home.data.home.img_url}</span>
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
