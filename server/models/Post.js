const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title:{
        type:String,
    },
    description:{
        type:String,
        maxlenth:50
    },
    images: {
        type: Array,
        default: []
    },
    videos : {
        type: String,
    },
    privacy:{
        default: 0,
    },
    content: {
        type: String
    }
}, { timestamps: true })


postSchema.index({ 
    title:'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    }
})

const Post = mongoose.model('Post', postSchema);

module.exports = { Post }