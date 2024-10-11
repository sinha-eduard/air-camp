const router = require("express").Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { storeReturnTo } = require("../middleware");
const {
  registerForm,
  postNewRegister,
  getLogin,
  postLogin,
  getLogout,
  passportAuth
} = require("../controllers/users");

router.get("/register", registerForm);

router.post("/register", catchAsync(postNewRegister));

router.get("/login", getLogin);

router.post(
  "/login",
  storeReturnTo,
  passportAuth,
  postLogin
);

router.get("/logout", getLogout);

module.exports = router;
