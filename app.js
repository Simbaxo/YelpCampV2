let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let campgrounds = [
  { name: "Salmon Creek", image: "https://pixabay.com/get/e136b80728f31c2ad65a5854ee4d459fe270e7c818b410489df4c77da6ea_340.jpg" },
  { name: "Granit Hill", image: "https://pixabay.com/get/ec31b90f2af61c2ad65a5854ee4d459fe270e7c818b410489df4c77da6ea_340.jpg" },
  { name: "Moutain Goat's Rest", image: "https://pixabay.com/get/e83db7082af3043ed95c4518b7444795ea76e5d004b014409cf8c57fa3ecb2_340.jpg" }
]

// Shows The Landing Page
app.get("/", function(req, res) {
  res.render("landing")
});

// Shows All The Campgrounds
app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", {campgrounds: campgrounds}); // {name, data}
});

// Create a New Campground
app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  // redirect back to campgrounds page
  res.redirect("/campgrounds");
});

// Shows Form 
app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

// Starts server on Port: 3000
app.listen(3000, function() {
  console.log("The YelpCamp Server Has Started!");
});