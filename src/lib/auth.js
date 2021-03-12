module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next;
    }
    return res.redirect("/signin");
  },
  isNotLoggerIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/profile");
  },
};
