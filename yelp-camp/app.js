
// For Environment Variables(to be stored in .env)
require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.LOCAL_PORT;

// settings
app.set('view engine', 'ejs');

// Landing Page Route
app.get('/', (req, res) => {
    res.render("landing")
})

// array of campgrounds will use a database later (all fake just for demonstration)
campgrounds = [{"name": "Pine Hill","image":"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},{"name":"Loggers Rest","image":"https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"},{"name":"Coopers Ledge","image":"https://images.unsplash.com/photo-1546811740-23e671faf31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"}]

// CampGrounds Route
app.get('/campgrounds', (req, res) => {
    res.render("campgrounds", {campgrounds : campgrounds})
})

app.listen(PORT, () => console.log(`Listening ${PORT}!`))