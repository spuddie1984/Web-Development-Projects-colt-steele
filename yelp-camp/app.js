const express = require('express'),
      mongoose = require('mongoose'), 
      Campgrounds = require('./models/campgrounds'),
      Comments = require('./models/comments'),
      seedDB = require('./seedDB'),
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
        }else{
            console.log(campground.comment);
            res.render("campgrounds/show", {campground:campground});
        }
    });
});

// Comments NEW Route - a Form to enter a new comment
app.get('/campgrounds/:id/comment/new', (req, res) => {
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
app.post('/campgrounds/:id/comment', (req, res) => {
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

// Our server is listening for requests on the specified port
app.listen(PORT, () => console.log(`Listening ${PORT}!`))