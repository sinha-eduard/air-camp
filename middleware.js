const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl; 
        req.flash("error", "You Must Be Signed In First")
        return res.redirect("/login")
      }
      next()
}

const storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports = {isLoggedIn, storeReturnTo};
