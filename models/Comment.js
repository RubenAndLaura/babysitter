const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  userFrom: {type: Schema.Types.ObjectId, ref: 'User'},
  userTo:{type: Schema.Types.ObjectId, ref: 'User'},
  comment: String,
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
