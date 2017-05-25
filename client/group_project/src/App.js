import React, { Component } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeList from './components/HomeList';
import Home from './components/Home';
import Searchedcomp from './components/Searchedcomp';
import HomeSingle from './components/HomeSingle';
import OwnerList from './components/OwnerList';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      <Router>
          <div className="App">
            <Header/>
            <nav className="navigation">
              <ul>
                <li className="mainlinks"><Link to="/propertieslist">Renter</Link></li>
                <li className="mainlinks"><Link to="/ownerpage">Owner</Link></li>
              </ul>
            </nav>
            <main>

            <Route exact path="/ownerpage" component={OwnerList} />
            <Route exact path="/propertieslist" component={HomeList} />
            <Route exact path="/propertieslist/:id" component={HomeSingle} />
            </main>
            {/*<HomeList
                homes={this.state.homes}/>*/}
            <Footer/>
          </div>
      </Router>
    );
  }
}

export default App;
