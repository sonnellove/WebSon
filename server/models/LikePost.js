const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   commentId: {
       type: Schema.Types.ObjectId,
       ref: 'Comment'
   },
   postId: {
       type: Schema.Types.ObjectId,
       ref: 'Post'
   }

}, { timestamps: true })

const LikePost = mongoose.model('LikePost', likeSchema);

module.exports = { LikePost }
