const express = require('express'),
      mongoose = require('mongoose'), 
      app = express();

// For Environment Variables(to be stored in .env)
require('dotenv').config();
// set our local port
const PORT = process.env.LOCAL_PORT;

///////////// SETTINGS /////////////
// set view engine template to ejs
app.set('view engine', 'ejs');
// body parser for POST requests
app.use(express.urlencoded({ extended: true }));
// setup static includes folder
app.use(express.static(__dirname + "/includes" ));

////////// DATABASE SETUP //////////
mongoose.connect('mongodb://localhost/restful-blog',{ useNewUrlParser: true });

/////// DB SCHEMA AND MODEL ///////

const Schema = mongoose.Schema;
// Define the campgroundSchema keys and key types
const campgroundSchema = new Schema({
   name: String,
   image: String,
   description: String,
});
// set the database model
const Campgrounds = mongoose.model('Campgrounds',campgroundSchema);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));