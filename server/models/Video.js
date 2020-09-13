const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = mongoose.Schema({
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


VideoSchema.index({ 
    title:'text',
    description: 'text',
}, {
    weights: {
        name: 5,
        description: 1,
    }
})

const Video = mongoose.model('Video', VideoSchema);

module.exports = { Video }