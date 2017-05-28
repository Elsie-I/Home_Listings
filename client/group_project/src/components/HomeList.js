import React, { Component } from 'react';
import Home from './Home';
import NotFound from './NotFound';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle {...restProps} />
    </Tooltip>
  );
};

const wrapperStyle = { width: 300, margin: 50 };

class HomeList extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      homes: [],
      submitForm: false,
      searchFetchData: [],
      minPrice: 200,
      maxPrice: 2000,
    })
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleDeleteHome = this.handleDeleteHome.bind(this);
    this.handleHomesEdit = this.handleHomesEdit.bind(this);
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
        this.setState({
          homes: responseJson.data.homes,
        });
      });
  }

  removeSpacesAndCheckNull(e) {
    if ((e.value.split(' ').join('') === '') || (isNaN(e.value.split(' ').join('')))) {
      return 'NULL'
    } else {
      return e.value.split(' ').join('');
    }
  }

  handleSearchSubmit(event) {
    fetch(`http://homelistings.herokuapp.com/api/homes/results/zipcode=${this.removeSpacesAndCheckNull(document.forms["checkForm"].zipCode)}&city=${document.forms["checkForm"].cityValue.value}&pricemore=${this.state.minPrice}&priceless=${this.state.maxPrice}&bedrooms=${this.removeSpacesAndCheckNull(document.forms["checkForm"].bedrooms)}`)
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        this.setState({
          searchFetchData: responseJson.data.home,
          submitForm: true,
        })
      });
  }

  handleHomesEdit(event) {
    event.preventDefault();
    fetch(`https://homelistings.herokuapp.com/api/homes/${event.target.id.value}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
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
      .then((response) => {
        if (response.status === 200) {
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

  renderToPage() {
    if (this.state.submitForm === false) {
      return (
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
      )
    }
    else {
      if (this.state.searchFetchData.length > 0) {
        return (
          <ul className="homeslist">{this.state.searchFetchData.map((elem) => {
            return (
              <Home
                key={elem.id}
                homes={elem}
              />
            )
          })}
          </ul>
        )
      } else {
        return (
          <NotFound />
        )
      }
    }
  }

  handlePriceValue(e) {
    this.setState({
      minPrice: e[0],
      maxPrice: e[1],
    });
    this.handleSearchSubmit();
  }

  render() {
    return (
      <div>
        <form
          name='checkForm'
          className="searchform"
        >
          <select name="cityValue" onChange={this.handleSearchSubmit} >
            <option value="NULL">-- City --</option>
            <option value="queens">Queens</option>
            <option value="manhattan">Manhattan</option>
            <option value="brooklyn">Brooklyn</option>
          </select>
          <br />
          <br />

          Zip Code:
          <input type="text"
            value={this.searchValue}
            name='zipCode'
            placeholder='Zip Code'
            onChange={this.handleSearchSubmit}
          />
          <br />
          <br />

          Bedrooms:
          <input type="text"
            value={this.searchValue}
            name='bedrooms'
            placeholder=''
            onChange={this.handleSearchSubmit}
          />
          <br />
          <br />

          Price:
          <div>
            <div style={wrapperStyle}>
              <p>Range with custom handle</p>
              <Range min={0} max={2800} step={50} defaultValue={[200, 2000]} handle={handle} tipFormatter={value => `$ ${value}`} pushable onChange={(e) => { this.handlePriceValue(e) }} />
            </div>
          </div>
        </form>

        {this.renderToPage()}
      </div>
    );
  }
}

export default HomeList;