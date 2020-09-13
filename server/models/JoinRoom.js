mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JoinRoomSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    room: {
        type: Schema.Types.ObjectId,
        type: String
    }
}, { timestamps: true });

const JoinRoom = mongoose.model('JoinRoom', JoinRoomSchema);
module.exports = { JoinRoom }