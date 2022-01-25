import React, { Component } from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';

import { fetchData } from './api';
import covidImg from './images/image.png';
export default class App extends Component {
  state = {
    data: {},
    country: '',
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    // fetch data
    const fetchedData = await fetchData(country);
    //setState
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={covidImg} alt="Covid Logo" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}
