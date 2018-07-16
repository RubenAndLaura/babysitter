const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const jobSchema = new Schema({
  user: Schema.Types.ObjectId,
  description: String,
  jobDate: Date,
  fee: String,
  status: { type: String, enum: ["Pending", "Accepted", "Done"], default: "Pending"}
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
