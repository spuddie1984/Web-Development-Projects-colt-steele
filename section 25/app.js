// Express Routing Assignment

// 1. Create a brand new Express app from scratch
// 2. Create a package.json using `npm init` and add express as a dependency
// 3. In your main app.js file, add 3 different routs:

// Visiting "/" Should print "Hi there, welcome to my assignment!"

// Visting "/speak/pig" Should print "The pig says 'Oink"
// Visiting "/speak/cow" Should print "The cow says 'Moo'"
// Visiting "/speak/dog" Should print "The dog says 'Woof Woof!'"

// Visiting "/repeat/hello/3" Should print "hello hello hello"
// Visiting "/repeat/hello/5" Should print "hello hello hello hello hello"
// Visiting "/repeat/blah/2" Should print "blah blah"

// If a user visits any other route print : "Sorry, page not found...What are you doing with your life?"

// initialize express
const express = require('express');
const app = express();
const port = 3000;

// app.get routes
app.get('/', (req, res) => {
    res.send(`<h1 style="text-align:center;">Hi there, welcome to my assignment</h1>`)
    console.log(`Hi there, welcome to my assignment`);
});

// simplify the process of animal voices, instead of using lots of if/else statements
const animals = {
    "dog" : "Woof Woof!",
    "cow" : "Moo",
    "pig" : "Oink"
}

// use the above object literal to fill in the template literal string that is to be sent to the client
app.get('/speak/:voice', (req,res) => {
    const params = req.params.voice;
    if(animals[params] === undefined){
        res.send(`<h2 style="text-align:center;">Sorry that animal's voice doesnt exist in our database</h2>`);
    }else{
        res.send(`<h2 style="text-align:center;">The ${params} says ${animals[params]}</h2>`);
    }
    console.log(`You just sent a response of ${params} to localHost:${port}`);
});

// use the number in the url string in a for loop, to repeat the sentence x amount of times
app.get('/repeat/:sentence/:times', (req,res) => {
    const urlStr = req.params;
    const theTimes = parseInt(req.params.times);
    let theSentence = ``;
    for(let num = 0; num < theTimes; num++){
        theSentence += `${urlStr.sentence} `;
    }
    res.send(`<h1 style="text-align:center;">${theSentence}</h1>`);
    console.log(theSentence);
});

// catch all route if the user enters something other then the above this will be sent
app.get('*', (req, res) => {
    res.send(`<h1 style="text-align:center;">404</h1>
    <p style="text-align:center;">Sorry that page doesn't exist</p>`);
});

// We have to listen for incoming requests
app.listen(port, () => console.log(`app listening on port ${port}!`));
