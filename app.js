let express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Campground.create(
//   { 
//     name: "Granit Hill", 
//     image: "https://pixabay.com/get/e136b80728f31c2ad65a5854ee4d459fe270e7c818b4134195f4c47ea3e8_340.jpg",
//     description: "This is a huge granite hill, no bathrooms, no water, beautiful granite!" 
//   }, function(err, campground) {
//       if(err){
//         console.log(err);
//       } else {
//         console.log("NEWLY CREATED COMPGROUND: ");
//         console.log(campground);
//       }
//   });

// let campgrounds = [
//   { name: "Salmon Creek", image: "https://pixabay.com/get/e136b80728f31c2ad65a5854ee4d459fe270e7c818b410489df4c77da6ea_340.jpg" },
//   { name: "Granit Hill", image: "https://pixabay.com/get/ec31b90f2af61c2ad65a5854ee4d459fe270e7c818b410489df4c77da6ea_340.jpg" },
//   { name: "Moutain Goat's Rest", image: "https://pixabay.com/get/e83db7082af3043ed95c4518b7444795ea76e5d004b014409cf8c57fa3ecb2_340.jpg" }
// ]

// Shows The Landing Page
app.get("/", function(req, res) {
  res.render("landing")
});

// INDEX ROUTE - Shows All The Campgrounds
app.get("/campgrounds", function(req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function(err, allCampgrounds){
    if(err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  })
});

// CREATE ROUTE - Create a New Campground
app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let newCampground = {name: name, image: image, description: desc};
  // Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if(err) {
      console.log(err);
    } else {
      // Redirect to campgrounds
      res.redirect("/campgrounds");
    }
  })
});

// NEW ROUTE - Shows Form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("new");
});

// SHOW ROUTE - Shows more info about Campground
app.get("/campgrounds/:id", function(req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id, function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      // render show template with that campground
      res.render("show", {campground: foundCampground});
    }
  });
});

// Starts server on Port: 3000
app.listen(3000, function() {
  console.log("The YelpCamp Server Has Started!");
});