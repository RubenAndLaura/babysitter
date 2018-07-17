const express = require('express');
const userRoutes  = express.Router();
const User = require("../models/User");
const {ensureLoggedIn} = require('../middlewares/isLoggedIn');

/* GET profile page del propio usuario logueado */
userRoutes.get('/profile', ensureLoggedIn("/auth/login"), (req, res, next) => {
  User.findById(req.user.id).then(user => {
    res.render('user/profile',{user});
  })
});

/* GET profile page de otro usuario */
userRoutes.get('/profile/:id', ensureLoggedIn("/auth/login"), (req, res, next) => {
  User.findById(req.params.id).then(user => {
    res.render('user/profile',{user});
  })
});

/* CR(U)D: GET Edit the User in DB */
userRoutes.get('/edit', ensureLoggedIn("/auth/login"), (req, res, next) => {
    User.findById(req.user.id).then(user => {
      res.render('user/edit',{user});
    })
  });

/* CR(U)D: POST Edit the User in DB */
userRoutes.post('/edit', ensureLoggedIn("/auth/login"), (req,res) => {
    const { name, lastname, picture, isBabysitter, phone, email, password } = req.body;
    User.findByIdAndUpdate(req.user.id,{ name, lastname, picture, isBabysitter, phone, email, password })
        .then( user => {
          res.redirect('/user/profile')
        })
    })

/* CRU(D): GET Delete the User in DB */
userRoutes.get('/edit',(req,res) => {
  User.findByIdAndRemove(req.params.id, () => res.redirect('/'));
})

module.exports = userRoutes;
