const Campground = require("../models/campground");

const index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

const newCampgroundForm = (req, res) => {
  res.render("campgrounds/new");
};

const postNewCampground = async (req, res, next) => {
  const camp = new Campground(req.body.campground);
  camp.author = req.user._id;
  await camp.save();
  req.flash("success", "Successfully Made a New Campground");
  res.redirect(`/campgrounds/${camp._id}`);
};

const showCampground = async (req, res, next) => {
  const campground = await Campground.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");
  if (!campground) {
    req.flash("error", "Could Not Find Campground");
    res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};

const editCampgroundForm = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground) {
    req.flash("error", "Could Not Find Campground");
    res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", { campground });
};

const editCampground = async (req, res) => {
  const camp = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  req.flash("success", "Successfully Updated Campground");
  res.redirect(`/campgrounds/${camp._id}`);
};

const deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully Deleted Campground");
  res.redirect(`/campgrounds`);
};

module.exports = {
  index,
  newCampgroundForm,
  postNewCampground,
  showCampground,
  editCampgroundForm,
  editCampground,
  deleteCampground,
};
