const express = require('express');
const userRoutes  = express.Router();
const User = require("../models/User");

/* GET profile page */
userRoutes.get('/profile', (req, res, next) => {
  res.render('user/profile');
});

/* GET Edit the user in DB */
userRoutes.get('/profile/edit', (req, res, next) => {
    User.findById(req.params.id).then(user => {
      res.render('/edit',{user});;
    })
  });

/* POST Edit the user in DB */
userRoutes.post('/profile/edit/:id', (req,res) => {
    const { name, lastname, picture, isBabysitter, phone, email, password } = req.body;
    User.findByIdAndUpdate(req.params.id,{ name, lastname, picture, isBabysitter, phone, email, password })
        .then( user => {
          res.redirect('/profile/:id')
        })
    })
module.exports = userRoutes;
