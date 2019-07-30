# Web-Development-Projects
A collection of Web Development Projects based on the Web Developer Bootcamp by Colt Steele
https://www.udemy.com/the-web-developer-bootcamp/


## Yelp Camp Application

###Basics
#####1st Commit
setup basic express structure initialize with npm init and add github details, 
#####2nd Commit
Add CampGround Route (*lists all campgrounds*) and landing page route. make an array of objects (*camps*) that include the image of the campground and the name. Test to see if the routes work!
Setup views folder structure and partials like header and footer,add a env file for environment variables.
#####3rd Commit
######Routes
- Add *campgrounds/new* route 
This route is a form so that the user can add a new campground (*2 inputs one for name of the campground 1 for the image url for that campground*-**More features will be added later**). This form will be sent to the *campgrounds* post route for processing.

- Add *campgrounds* post route
This Route will process the form data and add that data to the campgrounds array(*The array will be converted into a database later*).  After processing it will redirect to the get *campgrounds* route
######Styling Etc
- Add Basic Styling using bootstrap (*add bootstrap via cdn or downloaded*).
- setup header and footer partials. Add them to all the templates.
- Add link to form on campgrounds template 
- Setup includes file with folder structure for js and css files
- add an external style sheet to be used app wide (using app.use(express.static()))
