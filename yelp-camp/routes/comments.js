const express = require('express'),
      router = express.Router({mergeParams:true}),
      Campgrounds = require('../models/campgrounds'),
      Comments = require('../models/comments');

// Comments NEW Route - a Form to enter a new comment
router.get('/new', isLoggedIn, (req, res) => {
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
router.post('/', isLoggedIn, (req, res) => {
    Campgrounds.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            console.log(err);
            res.redirect('campgrounds');
        } else {
            Comments.create(req.body.comment, (err,newComment) => {
                if(err) {
                    console.log(err);
                } else {
                    newComment.author.id = req.user.id;
                    newComment.author.username = req.user.username;
                    newComment.save();
                    foundCampground.comment.push(newComment);
                    foundCampground.save();
                    res.redirect(`/campgrounds/${req.params.id}`);
                }
            });
        }
    });
});

// EDIT Show edit form for a comment
router.get('/:comment_id/edit', checkOwnership, (req,res) => {
    Comments.findById(req.params.comment_id, (err, editComment) => {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/edit' ,{editComment: editComment, campgroundId: req.params.id} )
        }
    });
});

// UPDATE Update a comment then redirect to campground show page with updated comments
router.put('/:comment_id', checkOwnership, (req, res) => {
    Comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err) => {
        if(err) {
            res.redirect('back')
        } else {
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });    
});

// DELETE Delete a comment then redirect to the campground show page for that comment
router.delete('/:comment_id', checkOwnership, (req, res) => {
    Comments.findByIdAndRemove(req.params.comment_id, (err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('back');
        }
    });
});

module.exports = router;

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

// middleware, check if user is logged in
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}