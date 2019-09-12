# Web-Development-Projects
A collection of Web Development Projects based on the Web Developer Bootcamp by Colt Steele
https://www.udemy.com/the-web-developer-bootcamp/

## Notes
### 7 RESTful Routes

| name    |     url         |  verb  |                   Decription                      |
|---------|-----------------|--------|---------------------------------------------------|
| INDEX   | /items          |  GET   | Displays a list of all items                      |
| NEW     | /items/new      |  GET   | Displays a form to add new items                  |
| CREATE  | /items          |  POST  | Add a new item to the DB                          |
| SHOW    | /items/:id      |  GET   | Show info about one item only                     |
| EDIT    | /items/:id/edit |  GET   | Show edit form for one item                       |
| UPDATE  | /items/:id      |  PUT   | Update a particular item, then redirect somewhere |
| DESTROY | /items/:id      | DELETE | Delete a particular item, then redirect somewhere|
 
## Yelp Camp Application

### Basics

##### 1st Commit
setup basic express structure initialize with npm init and add github details. 
##### 2nd Commit
Add CampGround Route (*lists all campgrounds*) and landing page route. make an array of objects (*camps*) that include the image of the campground and the name. Test to see if the routes work!
Setup views folder structure and partials like header and footer,add a env file for environment variables.
##### 3rd Commit
###### Routes
- Add *campgrounds/new* route 
This route is a form so that the user can add a new campground (*2 inputs one for name of the campground 1 for the image url for that campground*-**More features will be added later**). This form will be sent to the *campgrounds* post route for processing.
- Add *campgrounds* post route
This Route will process the form data and add that data to the campgrounds array(*The array will be converted into a database later*).  After processing it will redirect to the get *campgrounds* route
###### Styling Etc
- Add Basic Styling using bootstrap (*add bootstrap via cdn or downloaded*).
- setup header and footer partials. Add them to all the templates.
- Add link to form on campgrounds template 
- Setup includes file with folder structure for js and css files
- Add a basic bootstrap nav menu
- add an external style sheet to be used app wide (using app.use(express.static()))

### Database Intergration, styling and restful routing updates

#### 4th Commit
##### Database 
- Setup and Install mongoose 
- Setup Campground model/schema
- Use campground model inside our routes
##### Styling
- Improve campgrounds grid layout...add spacing use bootstrap cards for each campground
##### Restful Routing and whatever else i forgot
- Add comments to each route showing the restful routing name 
- Add a show route template
- Add a description field to the form and update routing to reflect that (including our campgrounds model)
- Add a link button to each campground that routes to the show page (individual campgrounds)

#### 5th Commit
##### Database Refactor
- Add a seed file and reseed every server restart
- Create a DB modules directory and put all DB models there
- use module.exports and require models into other files

##### Comments Model 
- Add Comment Model text, Author
- display comments on campground show page
- Add nested comment routes
- add new and create comment routes 
- add new comment form

##### Styling 
- Add sidebar to show page
- update styling on show page 

### Authentication

#### 6th Commit
##### User Model
- Add user model (username, password)
- install passport 

##### Add Authentication routes
- Add register routes 
- Add template
- Configure Passport
- Add login routes
- Add Login Template
- Add Logout Route

##### Add auth middleware and navbar logic for user login/out etc...
- Prevent user from adding a comment if not signed in
- Add links to navbar
- Show / hide auth links correctly

### Refactor Routes and Associations

#### 7th Commit
##### Add Router
- Use Express router to reorganise all routes

##### Associations for User and Comment Models
- Associate Users and Comments

##### Refactor Routes 
- Save Authors name (person signed in) to comments automatically
- Prevent an unauthorized user from creating campgrounds
- Save username + id along with newly created campground
- on show page display who created the campground

### Full CRUD + more Authorizations

#### 8th Commit

##### CRUD Delete + Edit

- Add Method-Override module
- Add Edit route for campgrounds
- Add link to edit page
- Add Update Route
- Add Detroy Route
- Delete associated comments
- Add delete button
- Add edit route for comments
- Add Edit button for comments
- Add Update comment route
- Add destroy comment route
- Add delete comment button

##### Authorization/Permissions for Edit + Delete campgrounds
 Use mongoose equals() method to compare user currently logged in (if there is a user logged in) with the user who created the campground or comment
- Users can only edit their own campground/s and comments (use middleware function)
- Users can only delete their own campground/s and comments (use middleware function)
- Hide/Show edit and delete buttons depending on if user owns that campground or not same applies for comments (if statement in show template)

#### 9th Commit

##### Flash Messages

- Add + Install flash-messages Module
- Add flash messages to routes (edit, delete, login logout)
- Add bootstrap to flash message 
- Add if statements so that error messages show bootstrap red error and green for successful
- Add meaningful error and success messages 
- Add comment stars and campground price
- Add days since comment created

##### Landing Page Refactor

- Add Image Slider to landing page



