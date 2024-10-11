const router = require("express").Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { storeReturnTo } = require("../middleware");
const {
  registerForm,
  postNewRegister,
  getLogin,
  postLogin,
  getLogout,
  passportAuth,
} = require("../controllers/users");

router.route("/register").get(registerForm).post(catchAsync(postNewRegister));

router
  .route("/login")
  .get(getLogin)
  .post(storeReturnTo, passportAuth, postLogin);

router.get("/logout", getLogout);

module.exports = router;
