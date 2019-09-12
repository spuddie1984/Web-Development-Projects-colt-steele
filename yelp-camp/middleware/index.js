const Comments = require('../models/comments'),
      Campgrounds = require('../models/campgrounds');

const middleOjb = {};

// middleware check if current user has ownership of comment or campground
middleOjb.checkCampgroundOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        Campgrounds.findById(req.params.id, (err, foundCampground) => {
            if(foundCampground.author.id.equals(req.user.id)){
                next();
            } else {
                console.log(err);
                res.redirect('back');
            }
        });
    } else {
        req.flash('error', 'You dont have permission to do that, Please login first !!!');
        res.redirect('/login');
    }
}

// middleware, check if user is logged in
middleOjb.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please login first !!');
    res.redirect('/login');
}

middleOjb.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        Comments.findById(req.params.comment_id, (err, foundCampground) => {
            if(foundCampground.author.id.equals(req.user.id)){
                next();
            } else {
                req.flash('error', 'Sorry you haven\'t created that comment !!');
                res.redirect('back');
            }
        });
    } else {
        req.flash('error', 'Please login to make a comment');
        res.redirect('/login');
    }
}

module.exports = middleOjb;