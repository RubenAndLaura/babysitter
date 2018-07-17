const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Comment = require("../models/Comment");
const { ensureLoggedIn } = require("../middlewares/isLoggedIn");

/* GET profile page */
router.get("/profile", ensureLoggedIn("/auth/login"), (req, res, next) => {
  User.findById(req.user.id).then(user => {
    res.render("user/profile", { user });
  });
});

/* GET comment page */
router.get(
  "/profile/comment/:id",
  ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    Comment.find({ userTo: req.params.id }).then(comment => {
      res.render("user/comment", {
        comment,
        userTo: req.params.id,
        userFrom: req.user.id
      });
    });
  }
);

+

router.post(
  "/profile/comment",
  ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    const { userFrom, userTo, comment } = req.body;
    new Comment({ userFrom, userTo, comment }).save().then(comment => {
      res.redirect("/");
    });
  }
);

router.get("/profile/comment/:id", ensureLoggedIn("/auth/login"), (req, res, next) => {
  Comment.findByIdAndRemove(req.params.id, () => res.redirect('/'));
})

/* GET Edit the user in DB */
router.get("/profile/edit", ensureLoggedIn("/auth/login"), (req, res, next) => {
  User.findById(req.user.id).then(user => {
    res.render("/edit", { user });
  });
});

/* POST Edit the user in DB */
router.post("/profile/edit", ensureLoggedIn("/auth/login"), (req, res) => {
  const {
    name,
    lastname,
    picture,
    isBabysitter,
    phone,
    email,
    password
  } = req.body;
  User.findByIdAndUpdate(req.user.id, {
    name,
    lastname,
    picture,
    isBabysitter,
    phone,
    email,
    password
  }).then(user => {
    res.redirect("/profile/:id");
  });
});

router.get("/profile/:id", ensureLoggedIn("/auth/login"), (req, res, next) => {
  User.findById(req.params.id).then(user => {
    res.render("user/profile", { user });
  });
});

module.exports = router;
