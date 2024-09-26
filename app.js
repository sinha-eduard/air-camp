const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate)
app.set("view engine", "ejs");
app.set('views', "./public/views");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get("/", (req, res) => {
  res.redirect("/campgrounds");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
});

app.get("/campgrounds/new", async (req, res) => {
    res.render("campgrounds/new");
});

app.post("/campgrounds", async (req, res) => {
    const camp = new Campground(req.body.campground);
    await camp.save();
    res.redirect(`/campgrounds/${camp._id}`)
});

app.get("/campgrounds/:id", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/show", { campground });
});

app.get("/campgrounds/:id/edit", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
});

app.put("/campgrounds/:id", async (req, res) => {
  const {id} = req.params
  const camp = await Campground.findByIdAndUpdate(id,{...req.body.campground})
  res.redirect(`/campgrounds/${camp._id}`)
});

app.delete("/campgrounds/:id", async (req, res) => {
  const {id} = req.params
  await Campground.findByIdAndDelete(id)
  res.redirect(`/campgrounds`)
});



app.listen(3000, () => {
  console.log("PORT3000");
});
