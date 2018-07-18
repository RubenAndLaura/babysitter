require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/User");
const Ad = require("../models/Ad.js");
const Comment = require("../models/Comment");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const dbName = process.env.DBURL;
mongoose
  .connect(dbName)
  .then(() => {
    User.collection.drop();
    Comment.collection.drop();
    Ad.collection.drop();

const salt = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync('1', salt);

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
      password: hashPass,
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
        Ad.create({
          user: user._id,
          description: "Busco niñera para hoy",
          adDate: 2018 - 07 - 16,
          fee: "10",
          status: "Pending"
        })
          .then(ads => {
            console.log(ads);
          })
          .catch(err => console.log(err));
        //mongoose.disconnect();
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
