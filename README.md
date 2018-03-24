### YelpCamp V2

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
* Name 
* Image

### Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

### Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

### Style The Campgrounds Page
* Add a better header/title
* Make campgrounds display in a grid

### Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

### Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes!

### Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

### RESTFUL ROUTES EXAMPLE

| name   |  url       |  verb  |  desc.                           |
| ------ | :--------: | ------ | -------------------------------: |
| INDEX  |  /dogs     |  GET   |  Display a list of all dog       |
| NEW    |  /dogs/new |  GET   |  Displays form to make a new dog |
| CREATE |  /dogs     |  POST  |  Add new dog to DB               |
| SHOW   |  /dogs/:id |  GET   |  Shows info about one dog        |

### Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

### Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

### Add the Comment Model
* Make our errors go away!
* Display comments on campground show page

### Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

### Style Show Page
* Add sidebar to show page
* Display comments nicely

### Finish Styling Show Page
* Add public directory
* Add custom stylesheet
### Add User Model
* Install all packages needed for auth
* Define User model

### Auth - Register
* Configure Passport
* Add register routes
* Add register template

### Auth - Login
* Add login routes
* Add login template

### Auth - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly

### Auth - Show/Hide Links
* Show/hide auth links in navbar correctly

### Refactor The Routes
* Use Express router to reoragnize all routes

### Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

### Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username + id to newly created campground

### Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix $set problem

### Deleting Campgrounds
* Add Destroy Route
* Add Delete button

### Authorization
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

### Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

### Deleting Comments
* Add Destroy route for comments
* Add Delete button

### Authorization - Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/show edit and delete buttons
* Refactor Middleware

### Adding in Flash!
* Install and configure connect-flash
* Add bootstrap alerts to header

### Full Screen Background Image Slider
* Create a full screen background image slider that uses a crossfade effect to transition between images
* We'll use 5 images with 10 second intervals for a 50 second animation cycle

### Dynamic Price Feature
* Add price to campground model as a String datatype
* Add price to views/campgrounds/new.ejs and views/campgrounds/edit.ejs (new and edit forms)
* Add price to views/camprounds/show.ejs (campground show page)