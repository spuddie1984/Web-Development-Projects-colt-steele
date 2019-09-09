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
            console.log(req.user);
            res.render("campgrounds/show", {campground:campground, currentUser: req.user});
        }
    });
});

// EDIT Show edit form for individual campgrounds
router.get('/:id/edit', checkOwnership, (req, res) => {
    Campgrounds.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});        
        }
    });
});

// UPDATE Update a campground then redirect to updated campground show page
router.put('/:id', checkOwnership, (req, res) => {
    Campgrounds.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    })
    
});

// DELETE Delete a campground then redirect to the campgrounds page
router.delete('/:id', checkOwnership, (req, res) => {
    Campgrounds.findByIdAndRemove(req.params.id, (err, deletedCampground) => {
        if(err) {
            console.log(err);
        } else {
            Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/campgrounds");
                }
            });
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

// middleware check if current user has ownership of comment or campground
function checkOwnership(req,res,next){
    if(req.isAuthenticated()){
        Campgrounds.findById(req.params.id, (err, foundCampground) => {
            if(foundCampground.author.id.equals(req.user.id)){
                next();
            } else {
                res.redirect('back');
            }
        });
    } else {
        res.redirect('/login');
    }
}

module.exports = router;