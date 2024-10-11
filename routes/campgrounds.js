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

router.get("/", catchAsync(index));

router.get("/new", isLoggedIn, newCampgroundForm);

router.post("/", isLoggedIn, validateCampground, catchAsync(postNewCampground));

router.get("/:id", catchAsync(showCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(editCampgroundForm));

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(editCampground)
);

router.delete("/:id", isLoggedIn, isAuthor, catchAsync(deleteCampground));

module.exports = router;
