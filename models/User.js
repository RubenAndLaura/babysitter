const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  name: String,
  lastname: String,
  picture: String,
  address: {
    street: String,
    city: String,
    zip: String
  },
  phone: String,
  email: String,
  password: String,
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
