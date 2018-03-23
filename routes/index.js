const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// Shows The Landing(Root) Page
router.get("/", function (req, res) {
  res.render("landing")
});

// =================
// AUTH ROUTES
// =================

// Show Register Form
router.get("/register", function (req, res) {
  res.render("register");
});

// Handle Signup Logic
router.post("/register", function (req, res) {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/campgrounds");
    });
  });
});

// Show Login Form
router.get("/login", function (req, res) {
  res.render("login");
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

// Is User Logged In Logic(middleware)
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = router;