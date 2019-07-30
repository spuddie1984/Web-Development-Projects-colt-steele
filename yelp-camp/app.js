
// For Environment Variables(to be stored in .env)
require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.LOCAL_PORT;

///////////// SETTINGS /////////////
app.set('view engine', 'ejs');
// body parser for POST requests
app.use(express.urlencoded({ extended: true }))
// setup static includes folder
app.use(express.static( "includes" ))

///////////// ROUTES //////////////

// Landing Page Route
app.get('/', (req, res) => {
    res.render("landing")
})

// array of campgrounds will use a database later (all fake just for demonstration)
campgrounds = [
    {"name": "Pine Hill","image":"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
    {"name":"Loggers Rest","image":"https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"},
    {"name":"Coopers Ledge","image":"https://images.unsplash.com/photo-1546811740-23e671faf31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"},
    {"name":"Loggers Rest","image":"https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"},
    {"name":"Loggers Rest","image":"https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"},
    {"name":"Loggers Rest","image":"https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"},
    {"name":"Loggers Rest","image":"https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"}
];

// CampGrounds Route
app.get('/campgrounds', (req, res) => {
    res.render("campgrounds", {campgrounds : campgrounds})
})

// Add new CampGround route
app.get('/campgrounds/new', (req, res) => {
    res.render("new-campground")
})

// Route for newly created campgrounds 
app.post('/campgrounds/', (req, res) => {
    campgrounds.push({"name":req.body["campground-name"],"image":req.body.image})
    res.redirect('campgrounds')
})

app.listen(PORT, () => console.log(`Listening ${PORT}!`))