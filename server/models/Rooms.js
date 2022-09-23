const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Can't be blank"]
    },
    status: {
        type: Boolean,
        default: 1
    }
}, {minimize: false});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room