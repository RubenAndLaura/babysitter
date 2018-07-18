const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/user/profile",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const lastname = req.body.lastname;
  const street = req.body.street;
  const city = req.body.city;
  const zip = req.body.zip;
  const phone = req.body.phone;
  const isBabysitter = Boolean(req.body.isBabysitter);

  if (email === "" || password === "") {
    res.render("auth/signup", { message: "Indicate email and password" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      password: hashPass,
      name,
      lastname,
      address: {
        street,
        city,
        zip,
      },
      phone,
      isBabysitter,
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/user/profile");
      }
    });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
