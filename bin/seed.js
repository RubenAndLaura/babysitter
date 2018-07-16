require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");
const Job = require("../models/Job.js");
const Comment = require("../models/Comment");

const dbName = process.env.DBURL;
mongoose
  .connect(dbName)
  .then(() => {
    User.collection.drop();
    Comment.collection.drop();
    Job.collection.drop();

    User.create({
      name: "Laura",
      lastname: "Canosa",
      picture: "",
      isBabysitter: true,
      address: {
        street: "Paseo de la Chopera, 14",
        city: "Madrid",
        zip: "28045"
      },
      phone: "655 543 234",
      email: "lauracanosa@gamil.com",
      password: "112"
    })
      .then(user => {
        Comment.create({
          userFrom: user._id,
          userTo: user._id,
          comment: "Esta niñera es la mejor!"
        })
          .then(comments => {
            console.log(comments);
          })
          .catch(err => console.log(err));
        Job.create({
          user: user._id,
          description: "Busco niñera para hoy",
          jobDate: 2018 - 07 - 16,
          fee: "10",
          status: "Pending"
        })
          .then(jobs => {
            console.log(jobs);
          })
          .catch(err => console.log(err));
        //mongoose.disconnect();
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));

/* const UserSchema = new mongoose.Schema({
    name: "Laura",
    lastname: "Canosa",
    picture: "",
    isBabysitter: true,
    address: {
      street: "Paseo de la Chopera, 14",
      city: "Madrid",
      zip: "28045"
    },
    phone: "655 543 234",
    email: "lauracanosa@gamil.com",
    password: "111"
  }).then( user => {
      console.log(user._id)
      mongoose.disconnect();
  });  */
