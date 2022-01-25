import axios from 'axios';
const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changableUrl = url;

  if (country) {
    // condition to change api endpoint if user selected another option
    changableUrl = `${url}/countries/${country}`;
  }
  // if (country === 'global') {
  //   changableUrl = url;
  // }

  try {
    const {
      data: { confirmed, deaths, recovered, lastUpdate },
    } = await axios.get(changableUrl);

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (err) {
    console.log(err);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    return data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
  } catch (err) {
    console.log(err);
  }
};
export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => country.name);
  } catch (err) {
    console.log(err);
  }
};
