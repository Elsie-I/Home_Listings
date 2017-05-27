import React, { Component } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeList from './components/HomeList';
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
          <Header />
          <p>What are you trying to do?</p>
          <nav className="navigation">
            <ul>
              <li className="renterlink"><Link to="/propertieslist"><button>RENT A PLACE</button></Link></li>
              <li className="ownerlink"><Link to="/ownerpage"><button>POST A PLACE</button></Link></li>
            </ul>
          </nav>
          <main>
            <Route exact path="/ownerpage" component={OwnerList} />
            <Route exact path="/propertieslist" component={HomeList} />
            <Route exact path="/propertieslist/:id" component={HomeSingle} />
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;