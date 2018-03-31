const Campground = require("../models/campground");
const Comment = require("../models/comment");
// All the Middleware goes here
const middlewareObj = {};

// Does User Own Campground (middleware)
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function (err, foundCampground) {
      if (err || !foundCampground) {
        req.flash("error", "Campground not found");
        res.redirect("back");
      } else {
        // does user own campground or is user an admin?
        if (foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that!")
    res.redirect("back");
  }
}

// Does User Own Comment (middleware)
middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
      if (err || !foundComment) {
        req.flash("error", "Comment not found");
        res.redirect("back");
      } else {
        // does user own comment?
        if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that!");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("back");
  }
}

// Is User Logged In Logic (middleware)
middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that!");
  res.redirect("/login");
};

// Is Image Safe Logic
middlewareObj.isSafe = function(req, res, next) {
  if (req.body.image.match(/^https:\/\/images\.unsplash\.com\/.*/)) {
    next();
  } else {
    req.flash("error", "Only images from images.unsplash.com allowed.\nSee https://youtu.be/Bn3weNRQRDE for how to copy image urls from unsplash.");
    res.redirect("back");
  }
};

// Is Admin Logic
middlewareObj.isAdmin = function (req, res, next) {
  if (req.user.isAdmin) {
    next();
  } else {
    req.flash("error", "This site is now read only thanks to spam and trolls.");
    res.redirect("back");
  }
};

module.exports = middlewareObj;