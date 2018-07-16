const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const jobSchema = new Schema({
  user: String,
  description: String,
  jobDate: Date,
  address: {
    street: String,
    city: String,
    zip: String
  },
  phone: String,
  fee: String
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
