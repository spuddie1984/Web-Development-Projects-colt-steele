const express = require('express'),
      mongoose = require('mongoose'), 
      bodyParser = require('body-parser'),
      passport = require('passport'),
      localStrategy = require('passport-local'),
      session = require('express-session'),
      Campgrounds = require('./models/campgrounds'),
      Comments = require('./models/comments'),
      User = require('./models/users'),
      seedDB = require('./seedDB'),
      app = express();

// =================================
///////////// SETTINGS /////////////
// =================================

/////// PASSPORT CONFIG ////////

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
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

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})
////////// DATABASE SETUP //////////

mongoose.connect('mongodb://localhost/yelpcamp',{ useNewUrlParser: true });

///////////// ROUTES //////////////

// Seed the DB
seedDB();

// Landing Page Route
app.get('/', (req, res) => {
    res.render("landing")
})

// INDEX CampGrounds Route
app.get('/campgrounds', (req, res) => {
    console.log(req.user);
    Campgrounds.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds : campgrounds});
        }
    });
});

// NEW Add new CampGround route
app.get('/campgrounds/new', (req, res) => {
    res.render("campgrounds/new")
})

// CREATE Route for newly created campgrounds 
app.post('/campgrounds/', (req, res) => {
    // put data inputted by user (from our form) into individual variables 
    
    // Add newly created campground to the DB
    Campgrounds.create(req.body.campground, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds');
        }
    });  
});

// SHOW Display individual campgrounds
app.get('/campgrounds/:id', (req, res) => {
    // render an individual campground
    const campgroundId = req.params.id;
    Campgrounds.findById(campgroundId).populate('comment').exec(function(err,campground){
        if(err){
            console.log(err)
        }else {
            res.render("campgrounds/show", {campground:campground});
        }
    });
});

// ===============
// COMMENT ROUTES
// ===============

// Comments NEW Route - a Form to enter a new comment
app.get('/campgrounds/:id/comment/new', isLoggedIn, (req, res) => {
    // Find the associated campground by id in DB then pass its data to the new comment form
    Campgrounds.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground});
        }
    });
});

// Comments CREATE Route - a form is posted to this route,
//  and this route adds it to the DB
//  then redirect to the show page
app.post('/campgrounds/:id/comment', isLoggedIn, (req, res) => {
    Campgrounds.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
            res.redirect('campgrounds');
        } else {
            Comments.create(req.body.comment, (err,newComment) => {
                if(err) {
                    console.log(err);
                } else {
                    foundCampground.comment.push(newComment);
                    foundCampground.save();
                    res.redirect(`/campgrounds/${req.params.id}`);
                }
            });
        }
    });
})

// ============
// AUTH ROUTES
// ============

// REGISTER ROUTE
app.get('/register', (req, res) => {
    res.render("users/register");
})

// on register form submission direct user to campgrounds route
app.post('/register', (req, res) => {
    const newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render('users/register')
        } else {
            passport.authenticate("local")(req,res, () => {
                res.redirect('/campgrounds');
            });   
        }
    })
});

// LOGIN ROUTE
app.get('/login', (req, res) => {
    res.render('users/login');
})

// handle login logic
app.post('/login', passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),(req, res) => {});

// LOGOUT ROUTE
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
}) 

// check if user is logged in middleware
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Our server is listening for requests on the specified port
app.listen(PORT, () => console.log(`Listening ${PORT}!`))