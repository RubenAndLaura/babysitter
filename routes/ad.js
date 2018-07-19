const express = require('express');
const adRoutes  = express.Router();
const Ad = require("../models/Ad");
const {ensureLoggedIn} = require('../middlewares/isLoggedIn');


/* C(R)UD: Retrieve -> List all Ads */
adRoutes.get('/', ensureLoggedIn("/auth/login"), (req, res, next) => {
  Ad.find().populate("user").sort({updated_at:-1}).then( ads => {
    console.log(ads)
   //let ad= dateConverter(ads)
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

/* CR(U)D: Update Status Ad in DB */
adRoutes.get('/accepted/:id',ensureLoggedIn("/auth/login"), (req, res, next) => {
  const status="Accepted"
  Ad.findByIdAndUpdate(req.params.id,{status: "Accepted"})
  .then(()=>{
    res.redirect('/ad');
  })
})

/* CRU(D): Delete the Ad in DB */
adRoutes.get('/delete/:id',ensureLoggedIn("/auth/login"), (req, res, next) => {
  const id = req.params.id
  Ad.findByIdAndRemove(id).then( () => 
  res.redirect('/ad'));
})

/*function dateConverter(arr){
  let aux=[]
  aux=arr.forEach(e => {
    e.adDate.slice(0,9)
  });
return aux
}*/

module.exports = adRoutes;