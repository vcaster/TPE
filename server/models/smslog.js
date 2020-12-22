const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const smsSchema = mongoose.Schema({
    individual:{
        type: Schema.Types.ObjectId,
        ref: 'Individual',
        required: true
    },
    name:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content:{
        type:String,
        required: true,
        default: ""
    },
    number:{
        type:String,
        required: true,
        default: ""
    },
    type:{
        type:String,
        required: true,
        default: ""
    },
    deleted:{
        type:String,
        required: true,
        default: '0'
    },
},{timestamps:true});


const Sms = mongoose.model('Sms',smsSchema);

module.exports = { Sms }