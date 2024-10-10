const router = require("express").Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const Users = require("../models/user");
const passport = require("passport");
const { storeReturnTo } = require('../middleware');

router.get("/register", (req, res) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new Users({ email, username });
      const registeredUser = await Users.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", `Welcome to airCamp, ${username}`);
        res.redirect("/campgrounds");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login", storeReturnTo,

  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "Logged In");
    const redirectUrl = res.locals.returnTo || '/campgrounds'; 
    delete req.session.returnTo
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged Out");
    res.redirect("/campgrounds");
  });
});

module.exports = router;
