const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const adSchema = new Schema({
  user: Schema.Types.ObjectId,
  description: String,
  adDate: Date,
  fee: String,
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
