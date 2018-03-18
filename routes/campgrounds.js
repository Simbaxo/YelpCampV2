const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// INDEX ROUTE - Shows All The Campgrounds
router.get("/", function (req, res) {
  // Get all campgrounds from DB
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  })
});

// CREATE ROUTE - Create a New Campground
router.post("/", function (req, res) {
  // get data from form and add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let newCampground = { name: name, image: image, description: desc };
  // Create a new campground and save to DB
  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      // Redirect to campgrounds
      res.redirect("/campgrounds");
    }
  })
});

// NEW ROUTE - Shows Form to create new campground
router.get("/new", function (req, res) {
  res.render("campgrounds/new");
});

// SHOW ROUTE - Shows more info about Campground
router.get("/:id", function (req, res) {
  // find the campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      // render show template with that campground
      res.render("campgrounds/show", { campground: foundCampground });
    }
  });
});

module.exports = router;