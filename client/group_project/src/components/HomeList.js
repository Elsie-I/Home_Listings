import React, { Component } from 'react';
import Home from './Home';

class HomeList extends Component {
    constructor(props){
    super(props);
  this.state={
    homes:[],
  }

  this.handleDeleteHome = this.handleDeleteHome.bind(this);
  this.handleHomesEdit=this.handleHomesEdit.bind(this);
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
        // console.log(responseJson)
        this.setState({
          homes: responseJson.data.homes,
        });
      });
  }
  //   fetchAllHomes() {
  //   fetch('https://homelistings.herokuapp.com/api/homes')
  //   .then((response) => {
  //     return response.json()
  //   })
  //   .then((responseJson) => {
  //     console.log(responseJson)
  //     this.setState((prevState) => {
  //       return {
  //         homes: responseJson.data.homes,
  //       }
  //     });
  //   });
  // }

  

   handleHomesEdit(event) {
   event.preventDefault();
   fetch(`https://homelistings.herokuapp.com/api/homes/${event.target.id.value}`,{
     method: 'PUT',
     headers: {'Content-type': 'application/json'},
     body: JSON.stringify({
            address: event.target.address.value,
            zipcode: event.target.zipcode.value,
            city: event.target.city.value,
            bedrooms: event.target.bedrooms.value,
            price: event.target.price.value,
            about: event.target.about.value,
            img_url: event.target.img_url.value,
     }),
   })
   .then((response)=>{
     if(response.status===200){
     this.fetchAllHomes();
     }
   })
 }

  handleDeleteHome(id) {
    fetch(`https://homelistings.herokuapp.com/api/homes/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          this.fetchAllHomes();
        }
      })
}
  render() {
    return (
      <div>
      {console.log(this.state.homes)}
        <ul className="homeslist">{this.state.homes.map((elem) => {
          return (
            <Home
              key={elem.id}
              homes={elem}
              handleDeleteHome={this.handleDeleteHome}
              handleHomesEdit={this.handleHomesEdit}
            />
          )
        })}
        </ul>
        
        {/*<Searchedcomp newSearched={this.state.newSearched}/>*/}
      </div>
      );
  }
}
export default HomeList;