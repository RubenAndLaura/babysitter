const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const adSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  description: String,
  adDate: Date,
  fee: Number,
  address: String,
  status: { type: String, enum: ["Pending", "Accepted", "Done"], default: "Pending"}
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Ad = mongoose.model('Ad', adSchema);
module.exports = Ad;
