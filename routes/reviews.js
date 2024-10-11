const router = require("express").Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isReviewAuthor } = require("../middleware");
const { postNewReview, deleteReview } = require("../controllers/reviews");

router.post("/", isLoggedIn, catchAsync(postNewReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(deleteReview)
);

module.exports = router;
