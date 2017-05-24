import React, { Component } from 'react';
import DetailsSinglePage from './DetailsSinglePage';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state={
      homes:[],
    }
  }
  render() {
    return (
      <Router>
        <div className="singleHome">
          <li>Pictures: {this.props.homes.img_url}</li>
          <li>About: {this.props.homes.about}</li>
          <li>Address: {this.props.homes.address}</li>
          <li>Zipcode: {this.props.homes.zipcode}</li>
          <li>City: {this.props.homes.city}</li>
          <li>Bedrooms: {this.props.homes.bedrooms}</li>
          <li>Price: {this.props.homes.price}</li>
          <a href={`/propertieslist/${this.props.homes.id}`}>See more</a>
          
          
          
          {/*
            <li className="kajsdf"><Link to={`/propertieslist/${this.props.homes.id}`} >See More</Link></li>
        <Route exact path="/propertieslist/:id" component={FetchedSinglePage} />*/}
          <DetailsSinglePage
              ids={this.props.homes.id}/>
          <Route exact path={`/propertieslist/:${this.state.homes.id}`} component={DetailsSinglePage} />
        </div>
      </Router>
    )
  }
}
export default Home;