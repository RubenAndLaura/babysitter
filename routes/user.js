const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Comment = require("../models/Comment");
const { ensureLoggedIn } = require("../middlewares/isLoggedIn");
const uploadCloud = require("../config/cloudinary.js");

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
    Comment.find({ userTo: req.params.id }).sort({updated_at:-1}).populate("userTo").populate("userFrom").then(comment => {
      res.render("user/comment", {
        comment,
        userTo: req.params.id,
        userFrom: req.user.id
      });
    });
  }
);

router.post(
  "/profile/comment",
  ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    const { userFrom, userTo, comment } = req.body;
    new Comment({ userFrom, userTo, comment }).save().then(comment => {
      res.redirect(`/user/profile/comment/${userTo}`);
    });
  }
);

router.post(
  "/profile/comment/delete",
  ensureLoggedIn("/auth/login"),
  (req, res, next) => {
    //console.log(req.body)
    //console.log("siguiente")
    //console.log(res)
    const { commentId} = req.body
    //5b509b7fb14f0324faa65bbd
    
    let aux=Comment.findByIdAndRemove(commentId)
    Promise.all([aux]).then(values=>{
      console.log(values[0])
      res.redirect(`/user/profile/comment/${values[0].userFrom}`)
    })
    // Comment.findByIdAndRemove(commentId).then( () =>{
    //   console.log(userTo)
    //   res.redirect(`/user/profile/comment/${userTo._id}`)
    // });
  }
);

/* GET Edit the user in DB */
router.get("/profile/edit", ensureLoggedIn("/auth/login"), (req, res, next) => {
  User.findById(req.user.id).then(user => {
    res.render("user/edit", { user });
  });
});

/* POST Edit the user in DB */
router.post("/profile/edit", [ensureLoggedIn("/auth/login"), uploadCloud.single("photo")], (req, res, next) => {
  const {
    name,
    lastname,
    picture,
    isBabysitter,
    phone,
    email,
    password,
  } = req.body;
  const photopath = req.file.url;
  const photooriginalName = req.file.photo;
  User.findByIdAndUpdate(req.user.id, {
    name,
    lastname,
    picture,
    isBabysitter,
    phone,
    email,
    password,
    photopath,
    photooriginalName
  }).then(user => {
    res.redirect("/user/profile");
  });
});

router.get("/profile/:id", ensureLoggedIn("/auth/login"), (req, res, next) => {
  User.findById(req.params.id).then(user => {
    res.render("user/profile", { user });
  });
});

module.exports = router;
