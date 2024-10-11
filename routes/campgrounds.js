const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const {
  index,
  newCampgroundForm,
  postNewCampground,
  showCampground,
  editCampgroundForm,
  editCampground,
  deleteCampground,
} = require("../controllers/campgrounds");

router
  .route("/")
  .get(catchAsync(index))
  .post(isLoggedIn, validateCampground, catchAsync(postNewCampground));

router.get("/new", isLoggedIn, newCampgroundForm);

router
  .route("/:id")
  .get(catchAsync(showCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(deleteCampground))
  .put(isLoggedIn, isAuthor, validateCampground, catchAsync(editCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(editCampgroundForm));

module.exports = router;
