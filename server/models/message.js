const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = mongoose.Schema({
    title:{
        required: true,
        type: String,
        maxlength:100
    },
    message:{
        required: true,
        type: String,
    },
    name:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    link:{
        type: String,
        default: '0'
    },
    photo:{
        type:String,
        maxlength:100,

    },
    extratype:{
        type: String,
        default: '0'
    },
    extra:{
        type: String,
        default: '0'
    },
    deleted:{
        type: Boolean,
        default: false
    },

},{timestamps:true});

const Message = mongoose.model('Message',messageSchema);
module.exports = { Message }