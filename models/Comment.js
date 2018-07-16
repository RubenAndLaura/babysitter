const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const statusSchema = new Schema({
  userFrom: Schema.Types.ObjectId,
  userTo: Schema.Types.ObjectId,
  comment: String,
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Status = mongoose.model('Status', statusSchema);
module.exports = Status;
