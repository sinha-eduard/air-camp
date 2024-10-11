const Users = require("../models/user");
const passport = require("passport");

const registerForm = (req, res) => {
  res.render("users/register");
};

const postNewRegister = async (req, res) => {
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
};

const getLogin = (req, res) => {
  res.render("users/login");
};

const postLogin = (req, res) => {
  req.flash("success", "Logged In");
  const redirectUrl = res.locals.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

const getLogout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged Out");
    res.redirect("/campgrounds");
  });
};

const passportAuth = passport.authenticate("local", {
  failureFlash: true,
  failureRedirect: "/login",
});

module.exports = {
  registerForm,
  postNewRegister,
  getLogin,
  postLogin,
  getLogout,
  passportAuth,
};
