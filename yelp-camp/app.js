const express = require('express'),
      mongoose = require('mongoose'), 
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

/////// DB SCHEMA AND MODEL ///////

const Schema = mongoose.Schema;
// Define the campgroundSchema keys and key types
const campgroundSchema = new Schema({
   name: String,
   image: String,
   description: String,
});
// set the database model
const Campgrounds = mongoose.model('Campgrounds',campgroundSchema);

// Campgrounds.create(
//     {
//         name: "Pine Hill",
//         image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//         description: "This is a beauitful camp with lots of hills"
//     },function(err,campground){
//     if (err){
//         console.log(err)
//     }else{
//         console.log("Success");
//         console.log(campground);
//     }
// });
///////////// ROUTES //////////////

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
            console.log("sucess");
            res.render("campgrounds", {campgrounds : campgrounds});
        }
    });
});

// NEW Add new CampGround route
app.get('/campgrounds/new', (req, res) => {
    res.render("new-campground")
})

// CREATE Route for newly created campgrounds 
app.post('/campgrounds/', (req, res) => {
    // put data inputted by user (from our form) into individual variables 
    const name = req.body.name;
    const imageUrl = req.body.image;
    const description = req.body.description;
    // Add newly created campground to the DB
    Campgrounds.create({
        name: name,
        image: imageUrl,
        description: description
    }, function(err,newCampground){
        if(err){
            console.log(err);
        }else{
            res.redirect('campgrounds');
        }
    });  
});

// SHOW Display individual campgrounds
app.get('/campgrounds/:id', (req, res) => {
    // render an individual campground
    const campgroundId = req.params.id;
    Campgrounds.findById(campgroundId, function(err,campground){
        if(err){
            console.log(err)
        }else{
            res.render("campground", {campground:campground});
        }
    })
});

// Our server is listening for requests on the specified port
app.listen(PORT, () => console.log(`Listening ${PORT}!`))