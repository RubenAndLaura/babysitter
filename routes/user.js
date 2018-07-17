const express = require('express');
const userRoutes  = express.Router();
const User = require("../models/User");
const {ensureLoggedIn} = require('../middlewares/isLoggedIn');

/* GET profile page */
userRoutes.get('/profile', ensureLoggedIn("/auth/login"), (req, res, next) => {
  User.findById(req.user.id).then(user => {
    res.render('user/profile',{user});
  })
});

userRoutes.get('/profile/:id', ensureLoggedIn("/auth/login"), (req, res, next) => {
  User.findById(req.params.id).then(user => {
    res.render('user/profile',{user});
  })
});

/* GET Edit the user in DB */
userRoutes.get('/profile/edit', ensureLoggedIn("/auth/login"), (req, res, next) => {
    User.findById(req.user.id).then(user => {
      res.render('/edit',{user});
    })
  });

/* POST Edit the user in DB */
userRoutes.post('/profile/edit', ensureLoggedIn("/auth/login"), (req,res) => {
    const { name, lastname, picture, isBabysitter, phone, email, password } = req.body;
    User.findByIdAndUpdate(req.user.id,{ name, lastname, picture, isBabysitter, phone, email, password })
        .then( user => {
          res.redirect('/profile/:id')
        })
    })
module.exports = userRoutes;
