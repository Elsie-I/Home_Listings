import React, { Component } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeList from './components/HomeList';
import Home from './components/Home';
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
          <Header />
          <nav className="navigation">
            <ul>
              <li className="mainlinks">
                <Link to="/propertieslist">Renter</Link>
              </li>
              <li className="mainlinks">
                <Link to="/ownerpage">Owner</Link>
              </li>
            </ul>
          </nav>
          <main>
            <Route exact path="/propertieslist" component={HomeList} />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;