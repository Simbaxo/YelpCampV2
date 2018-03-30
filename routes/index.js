const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const Campground = require("../models/campground");

// Shows The Landing(Root) Page
router.get("/", function (req, res) {
  res.render("landing")
});

// =================
// AUTH ROUTES
// =================

// Show Register Form
router.get("/register", function (req, res) {
  res.render("register", {page: 'register'});
});

// Handle Signup Logic
router.post("/register", function (req, res) {
  let newUser = new User({ 
    username: req.body.username, 
    firstName: req.body.firstName, 
    lastName: req.body.lastName, 
    email: req.body.email, 
    avatar: req.body.avatar 
  });
  if(req.body.adminCode === 'secretcode123') {
    newUser.isAdmin = true;
  }
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.render("register", {error: err.message});
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Successfully Signed Up! Nice to meet you " + user.username);
      res.redirect("/campgrounds");
    });
  });
});

// Show Login Form
router.get("/login", function (req, res) {
  res.render("login", {page: 'login'});
});

// Handling Login Logic
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function (req, res) {
  });

// Logout Logic Route
router.get("/logout", function (req, res) {
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/campgrounds");
});

// User Profiles
router.get("/users/:id", function(req,res) {
  User.findById(req.params.id, function(err, foundUser) {
    if(err) {
      req.flash("error", "Something went wrong.");
      return res.redirect("/");
    }
    Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds) {
      if (err) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
      }
      res.render("users/show", {user: foundUser, campgrounds: campgrounds});
    });
  });
});

module.exports = router;