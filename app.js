const express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require("mongoose"),
      flash          = require("connect-flash");
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      methodOverride = require("method-override");
      Campground     = require("./models/campground"),
      Comment        = require("./models/comment"),
      User           = require("./models/user"),
      seedDB         = require("./seeds");

// Requring Routes      
const commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes       = require("./routes/index");

// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://Simba:Mena@ds129469.mlab.com:29469/yelpcampv2");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); // Seed the Database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Lisa",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Current User Middleware
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// Starts server on Port: 3000
app.listen(3000, function() {
  console.log("The YelpCamp Server Has Started!");
});