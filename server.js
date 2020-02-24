// "fast, unopinionated, minimalist web framework for nodejs"
const express = require('express');
const app = express();
// "nedb is a lightweight embedded document DBMS written in JavaScript, it supports Node.js"
const Datastore = require('nedb');
// "a light-weight module that brings window.fetch to Node.js"
const fetch = require('node-fetch');
// "dotenv is a zero-dependency module that loads environment variables from a .env file into process.env"
require('dotenv').config();
const darksky_key = process.env.DARKSKY_KEY;
const locationiq_key = process.env.MYLOCATIONIQ_KEY;
// sets port 8080 to default or unless otherwise specified in the environment
const port = 8080;
app.listen(process.env.PORT || port, () => {
  console.log(`Starting server at ${port}`);
});

/* for the server to serve images, CSS files, and JavaScript files in a directory named client, 
only what is contained in the client is public, client cant access anything out of it */ 
app.use(express.static('client'));

// needed as a middleware for POST and PUT requests, method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());

// to store the files locally
const database = new Datastore('logs.db');
database.loadDatabase();

// to get everything that is in the log.db (currently not being used)
app.get('/api', (req, res) => {
  database.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    }
    res.json(data);
  });
});

// POST when a locality is added on the client table, the processed info it is stored on the database object body (for prove of concept)
app.post('/api', (req, res) => {
  const data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(Object.assign({'method' : 'POST', 'status' : 'success', 'rpath' : '/forecast/daily/:city', 'body': [data]}));
  res.json(data);
});

// uses the combination of geolocation and weather public API's to send the needed object.json
app.get('/forecast/daily/:city', async (req, res) => {
  const timestamp = Date.now();
  const city = req.params.city;
  try {
    // geolocation to get the lat and lon of the city
    const city_url = `https://eu1.locationiq.com/v1/search.php?key=${locationiq_key}&q=${req.params.city}&format=json`; 
    const city_response = await fetch(city_url);
    const city_data = await city_response.json();
    let city_name = city_data[0].display_name; 
    // make sure user input matches the locality name
    if (city_name.split(",", 1) == city) {
      let lat = city_data[0].lat;
      let lon = city_data[0].lon;
      // uses geolocation to get weather info
      const weather_url = `https://api.darksky.net/forecast/${darksky_key}/${lat},${lon}?lang=pt`;
      const weather_response = await fetch(weather_url);
      const weather_data = await weather_response.json();
      //object assing to concat cityname with info of that city, from both api... And latitude and longitude for future use
      res.json(Object.assign({city: city_name, latitude : lat, longitude : lon}, weather_data.daily.data[0]));
      // stores get info on logs
      database.insert(Object.assign( {'method' : 'GET', 'status' : 'SUCCESS', 'rpath' : '/forecast/daily/:city'}, timestamp));
    }else {
      res.status(400).json({status: 400, message: "Locality does not have related weather information!"});
      database.insert(Object.assign( {'method' : 'GET', 'status' : 'FAILURE', 'rpath' : '/forecast/daily/:city'}, timestamp));
    }
  } catch (err) {
    res.status(400).json({status: 400, message: "Locality does not exist!"});
    database.insert(Object.assign( {'method' : 'GET', 'status' : 'FAILURE', 'rpath' : '/forecast/daily/:city'}, timestamp));
  }
});

// to retrieve the locality forecast for the next 48 hours
app.get('/forecast/hourly/:lat/:lon', async (req, res) => {
  const timestamp = Date.now();
  try {
      const lat = req.params.lat;
      const lon = req.params.lon;
      const weather_url = `https://api.darksky.net/forecast/${darksky_key}/${lat},${lon}?lang=pt`;
      const weather_response = await fetch(weather_url);
      const weather_data = await weather_response.json();
      res.json((weather_data.hourly.data));
      database.insert(Object.assign( {'method' : 'GET', 'status' : 'SUCCESS', 'rpath' : '/forecast/hourly/:lat/:lon'}, timestamp));
  } catch (err) {
    console.log(err);
    res.status(400).json({status: 400, message: "Locality does not have related weather information!"});
    database.insert(Object.assign( {'method' : 'GET', 'status' : 'FAILURE', 'rpath' : '/forecast/hourly/:lat/:lon'}, timestamp));
  }
});