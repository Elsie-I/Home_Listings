import React, { Component } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeList from './components/HomeList';
import Home from './components/Home'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
  this.state={
    homes:[],
    }
  }
  
   componentDidMount() {
    this.fetchAllHomes()
  }


  fetchAllHomes() {
    fetch('https://homelistings.herokuapp.com/api/homes')
    .then((response) => {
      return response.json()
    })
    .then((responseJson) => {
      console.log(responseJson);
      this.setState((prevState) => {
        return {
          homes: responseJson.data.homes,
        }
      });
    });
  }


  
  
  render() {
    return (
      <div className="App">
      <Header/>
      <HomeList
          homes={this.state.homes}/>
      <Footer/>
      </div>
    );
  }
}

export default App;
