const express = require('express'),
      router = express.Router(),
      Campgrounds = require('../models/campgrounds');

// INDEX CampGrounds Route
router.get('/', (req, res) => {
    Campgrounds.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds : campgrounds});
        }
    });
});

// NEW Add new CampGround route
router.get('/new',isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
})

// CREATE Route for newly created campgrounds 
router.post('/',isLoggedIn, (req, res) => {
    // put data inputted by user (from our form) into individual variables 
    
    // Add newly created campground to the DB
    console.log(req.user)
    const campground = {
        name: req.body.campground.name,
        image: req.body.campground.image,
        description: req.body.campground.description,
        author: {
            id: req.user.id,
            username: req.user.username
        }
    }
    console.log(campground);
    Campgrounds.create(campground, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds');
        }
    });  
});

// SHOW Display individual campgrounds
router.get('/:id', (req, res) => {
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

// middleware, check if user is logged in
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;