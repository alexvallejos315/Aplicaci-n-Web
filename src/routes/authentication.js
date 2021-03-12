const express = require("express");
const passport = require("passport");

const router = express.Router();

//Signin
router.get("/signin", (req, res) => {
  res.render("../views/auth/signin.hbs");
});
router.post("/signin", (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true,
  })(req, res, next);
});

//Signup
router.get("/signup", (req, res) => {
  res.render("../views/auth/signup.hbs");
});
//Aquí en post se puede pasar como callback así como en la ruta /signin
router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

//Profile
router.get("/profile", (req, res) => {
  res.render("../views/profile.hbs");
});
//Exit
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/signin");
});

module.exports = router;
