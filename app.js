let express = require("express");
let app = express();

app.set("view engine", "ejs");

// Landing Page Render
app.get("/", function(req, res) {
  res.render("landing")
});

app.get("/campgrounds", function(req, res) {
  let campgrounds = [
    { name: "Salmon Creek", image: "https://pixabay.com/get/e136b80728f31c2ad65a5854ee4d459fe270e7c818b410489df4c77da6ea_340.jpg"},
    {name: "Granit Hill", image: "https://pixabay.com/get/ec31b90f2af61c2ad65a5854ee4d459fe270e7c818b410489df4c77da6ea_340.jpg"},
    {name: "Moutain Goat's Rest", image: "https://pixabay.com/get/e83db7082af3043ed95c4518b7444795ea76e5d004b014409cf8c57fa3ecb2_340.jpg"}
  ]

  res.render("campgrounds", {campgrounds: campgrounds}); // {name, data}
});

// Starts server on Port: 3000
app.listen(3000, function() {
  console.log("The YelpCamp Server Has Started!");
});