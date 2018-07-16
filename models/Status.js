const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const statusSchema = new Schema({
  status: ["Pending", "Accepted", "Done"]
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Status = mongoose.model('Status', statusSchema);
module.exports = Status;
