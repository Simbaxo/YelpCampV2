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
router.post("/", isLoggedIn, function (req, res) {
  // get data from form and add to campgrounds array
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  let newCampground = { name: name, image: image, description: desc, author: author };
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
router.get("/new", isLoggedIn, function (req, res) {
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

// EDIT CAMPGROUND ROUTE - User can edit Campground
router.get("/:id/edit", function(req, res) {
  // is user logged in?
  if(req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, foundCampground) {
      if(err) {
        res.redirect("/campgrounds")
      } else {
        // does user own campground?
        if(foundCampground.author.id.equals(req.user._id)) {
          res.render("campgrounds/edit", {campground: foundCampground});
        } else {
          res.send("You Do Not Have Permission To Do That!");
        }
      }
    });
  } else {
    console.log("You need to be logged in to do that!");
    res.send("You need to be logged in to do that!");
  }
    // otherwise, redirect
  // if not redirect
});

// UPDATE CAMPGROUND ROUTE - User can update Campground
router.put("/:id", function (req, res) {
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
    if(err) {
      res.redirect("/campgrounds");
    } else {
      // redirect to show page
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// DESTROY CAMPGROUND ROUTE - User can delete Campground
router.delete("/:id", function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// Is User Logged In Logic (middleware)
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = router;