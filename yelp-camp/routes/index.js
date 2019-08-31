const express = require('express'),
      router = express.Router(),
      User = require('../models/users'),
      passport = require('passport');


// Landing Page Route
router.get('/', (req, res) => {
    res.render("landing")
})

// REGISTER ROUTE
router.get('/register', (req, res) => {
    res.render("users/register");
})

// on register form submission direct user to campgrounds route
router.post('/register', (req, res) => {
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
router.get('/login', (req, res) => {
    res.render('users/login');
})

// handle login logic
router.post('/login', passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),(req, res) => {});

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
}) 

module.exports = router;

// middleware, check if user is logged in
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}