// things to consider 
// - refactor so that you can choose a country
// - when a request is submitted return not found if the entered city doesn't exist or
//   have a dynamic list of available cities for the choosen country

const express = require('express')
const request = require('request');
require('dotenv').config()
const app = express()

// app settings
app.set( 'view engine', 'ejs' );
const port = process.env.PORT;
// setup static js files for the home route(to be used by the search form)
app.use( express.static( "public" ) );

// lets request some data from our api 
// We will use a form to enter a city then the api will 
// return the corresponding weather data for that city

// home route or search route(contains a form for searching for data)
app.get( '/', ( req,res ) => {  
    res.render( 'search' );
});

// results route
app.get( '/results', (req, res) => {
    // grab city and units format to add to the request url string
    const city = req.query.city;
    const units = req.query.unitsFormat; // metric or imperial
    // check query string for what measure of units(degrees) will be used
    // so that we can display the correct unit later -> "F" or "C"
    const degreesType = {degreesUnit: units};
    // for now we will stick to towns and cities within Australia
    const countryCode = `au`;
    // url string and api key
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=${units}&APPID=`;
    const apiKey = process.env.API_KEY; 
    request(url + apiKey ,function(error,response,body){
        if( !error && response.statusCode === 200 ){
            // convert whatever data is in the returned body into JSON 
            const data = JSON.parse(body);
            // render and pass the data to the results.ejs page
            res.render( 'results', { data:data, degreesType:degreesType } );
        }
    });   
});

// Server is listening for incoming calls
app.listen(port, () => console.log(`Example app listening on port ${port}!`))