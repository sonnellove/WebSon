mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema({
    message: {
        type: String
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    socketId: {
        type: Schema.Types.ObjectId,
        type: String
    },
    roomId: {
        type: Schema.Types.ObjectId,
        type: String
    }
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);
module.exports = { Chat }