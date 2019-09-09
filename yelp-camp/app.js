const express = require('express'),
      app = express();
      mongoose = require('mongoose'), 
      bodyParser = require('body-parser'),
      passport = require('passport'),
      localStrategy = require('passport-local'),
      session = require('express-session'),
      methodOverride = require('method-override'),
      User = require('./models/users'),
      seedDB = require('./seedDB'),
      indexRoutes = require('./routes/index'),
      campgroundRoutes = require('./routes/campgrounds'),
      commentRoutes = require('./routes/comments');

// =================================
///////////// SETTINGS /////////////
// =================================

/////// PASSPORT CONFIG ////////

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
// Intialize passport
app.use(passport.initialize());
// Initialize passport sessions
app.use(passport.session());
// Setup passport strategy to be local ie username password
passport.use(new localStrategy(User.authenticate()));
// For encryption and decryption of the password hash
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// For Environment Variables(to be stored in .env)
require('dotenv').config();
// set our local port
const PORT = process.env.LOCAL_PORT;

// set view engine template to ejs
app.set('view engine', 'ejs');
// body parser for POST requests
app.use(bodyParser.urlencoded({ extended: true }));
// setup static includes folder
app.use(express.static(__dirname + "/includes" ));
// setup method override override like this .... method="POST" action="/url/?_method=delete
app.use(methodOverride('_method'));
// middleware, pass local username into all template
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

/////// SETUP ROUTER /////////

app.use(indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comment',commentRoutes);

////////// DATABASE SETUP //////////

mongoose.connect('mongodb://localhost/yelpcamp',{ useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

// seedDB(); // Seed the DB

// Our server is listening for requests on the specified port
app.listen(PORT, () => console.log(`Listening ${PORT}!`))