const express = require('express');
const userRoutes  = express.Router();
const User = require("../models/User");

/* GET profile page */
userRoutes.get('/profile', (req, res, next) => {
  res.render('user/profile');
});

module.exports = userRoutes;
