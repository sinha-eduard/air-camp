const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const ExpressError = require("./utils/ExpressError");
const User = require("./models/user");
const helmet = require("helmet");
const MongoDBStore = require("connect-mongo")(session)

const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");

const uri = process.env.MONGODB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", "./public/views");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(helmet({contentSecurityPolicy:false}))

const store = new MongoDBStore({
  url:process.env.MONGODB_URI,
  secret: process.env.SECRET_STORE,
  touchAfter: 24 * 60 * 60
})

store.on("error", function(e){
  console.log("Session Store Error:", e)
})

const sessionConfig = {
  name: "session",
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  store,
  cookie: {
    httpOnly: true,
    //secure: true,
    expires: Date.now() + 604800000,
    maxAge: 604800000,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use("/", userRoutes)

app.get("/home", (req, res) =>{
  res.render("home")
})

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("PORT3000");
});

module.exports = app;