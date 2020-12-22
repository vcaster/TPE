const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema({
    message: {
        type:String,
    },
    name: {
        type: Schema.Types.ObjectId,
       ref: 'User'
    },
    namer: {
        type: Schema.Types.ObjectId,
       ref: 'User'
    },
    type : {
        type: String
    },
    read : {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = { Chat }