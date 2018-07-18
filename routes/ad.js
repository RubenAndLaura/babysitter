const express = require('express');
const adRoutes  = express.Router();
const Ad = require("../models/Ad");
const {ensureLoggedIn} = require('../middlewares/isLoggedIn');


/* C(R)UD: Retrieve -> List all Ads */
adRoutes.get('/', ensureLoggedIn("/auth/login"), (req, res, next) => {
  Ad.find().populate("user").sort({updated_at:-1}).then( ads => {
    res.render('user/ads', {ads});
  })
});

/* (C)RUD: Add an Ad form */
adRoutes.get('/new', ensureLoggedIn("/auth/login"), (req, res, next) => {
  res.render('user/createad');
});

/* (C)RUD: Create the Ad in DB */
adRoutes.post('/new', ensureLoggedIn("/auth/login"), (req, res, next) => {
  const user = req.user._id;
  const { title, description, adDate, fee, status, address } = req.body;
  new Ad({ title, user, description, adDate, fee, status, address })
  .save().then( ads => {
    console.log("Ad sucessfully created!");
    res.redirect('/ad');
  });
});

/* CRU(D): Delete the Ad in DB */
adRoutes.get('/delete/:id',ensureLoggedIn("/auth/login"), (req,res) => {
  Ad.findByIdAndRemove(req.params.id, () => res.redirect('/ads'));
})

module.exports = adRoutes;