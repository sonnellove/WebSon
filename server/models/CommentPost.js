const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentPostSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }
}, { timestamps: true })


const CommentPost = mongoose.model('CommentPost', CommentPostSchema);
module.exports = { CommentPost }