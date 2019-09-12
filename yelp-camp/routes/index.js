const express = require('express'),
      router = express.Router(),
      User = require('../models/users'),
      passport = require('passport'),
      middleware = require('../middleware');


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
            req.flash('error', err.message);
            return res.render('users/register')
        } else {
            passport.authenticate("local")(req,res, () => {
                req.flash('success', 'You are logged in!!!');
                res.redirect('/campgrounds');
            });   
        }
    });
});

// LOGIN ROUTE
router.get('/login', (req, res) => { 
    res.render('users/login');
});

// handle login logic
router.post('/login', passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    successFlash:'you are logged in!!!',
    failureFlash: true
    })
);

// LOGOUT ROUTE
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You successfully logged out !!')
    res.redirect("/campgrounds");
}) 

module.exports = router;