const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5001;
// Use Pug as the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// REST Countries URL
const url = 'https://restcountries.com/v3.1/all';

app.get('/', (req, res) => {
  // render pug template for the index.html file

  res.render('index', {
    heading: 'Countries of the World',
    main: 'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world',
  });
});

app.get('/capitals', (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array
  const map = new Map();
  let countries = [];
  axios.get(url).then((response) => {
    for (let i = 0; i < response.data.length; i += 1) {
      capital = response.data[i].capital;
      map.set(response.data[i].name.common, capital);
    }
    let mapAsc = new Map([...map.entries()].sort());
    for (const [key, value] of mapAsc) {
      countries.push(` ${key} - ${value} `);
    }
    res.render('page', {
      heading: 'Countries and Capitals',
      results: countries,
    });
  });
});

app.get('/populous', (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population
  let nf = new Intl.NumberFormat('en-US');
  let str = [];
  const map = new Map();
  let pop = 0;
  axios.get(url).then((response) => {
    for (let i = 0; i < response.data.length; i += 1) {
      pop = response.data[i].population;
      if (parseInt(pop) >= 50000000) {
        map.set(response.data[i].name.common, pop);
      }
    }
    let mapAsc = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
    let count = 1;
    for (const [key, value] of mapAsc) {
      str.push(`${key} - ${nf.format(value)} `);
    }
    res.render('page', {
      heading: 'Most Populous Countries',
      results: str,
    });
  });
});

app.get('/regions', (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array
  let regions = [];
  const map = new Map();
  axios.get(url).then((response) => {
    for (let i = 0; i < response.data.length; i += 1) {
      if (!map.has(response.data[i].region)) {
        map.set(response.data[i].region, 1);
      } else {
        map.set(response.data[i].region, map.get(response.data[i].region) + 1);
      }
    }
    console.log(map);
    let mapAsc = new Map([...map.entries()].sort());
    for (const [key, value] of mapAsc) {
      regions.push(`${key} - ${parseInt(value)} `);
    }
    res.render('page', {
      heading: 'Regions of the World',
      results: regions,
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
