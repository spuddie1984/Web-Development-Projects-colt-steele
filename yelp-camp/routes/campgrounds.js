const express = require('express'),
      router = express.Router(),
      Campgrounds = require('../models/campgrounds'),
      Comment = require('../models/comments')
      middleware = require('../middleware');

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
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
})

// CREATE Route for newly created campgrounds 
router.post('/', middleware.isLoggedIn, (req, res) => {
    // put data inputted by user (from our form) into individual variables 
    
    // Add newly created campground to the DB
    console.log(req.user)
    const campground = {
        name: req.body.campground.name,
        image: req.body.campground.image,
        price: req.body.campground.price,
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
            req.flash('success', 'You\'ve added a new campground !!!');
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
            res.render("campgrounds/show", {campground:campground, currentUser: req.user});
        }
    });
});

// EDIT Show edit form for individual campgrounds
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campgrounds.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});        
        }
    });
});

// UPDATE Update a campground then redirect to updated campground show page
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campgrounds.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
    
});

// DELETE Delete a campground then redirect to the campgrounds page
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campgrounds.findByIdAndRemove(req.params.id, (err, deletedCampground) => {
        if(err) {
            console.log(err);
        } else {
            Comment.deleteMany( {_id: { $in: deletedCampground.comments } }, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    req.flash('success', `You successfully removed ${deletedCampground.name} campground from the database`);
                    res.redirect("/campgrounds");
                }
            });
        }
    });
});

module.exports = router;