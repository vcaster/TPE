const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainingSchema = mongoose.Schema({
    individual:{
        type: Schema.Types.ObjectId,
        ref: 'Individual',
        required: true
    },
    address:{
        required: true,
        type:String,
        maxlength:255
    },
    name:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    training:{
        required: true,
        type:String,
        maxlength:255
    },
    trainer:{
        required: true,
        type:String,
        maxlength:255
    },
    staffsignimg:{
        required: true,
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },
    trainersignimg:{
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },
    comment:{
        type:String,
    },
    deleted:{
        type:Boolean,
        required: true,
        default: false
    },
    read:{
        type:Boolean,
        required: true,
        default: false
    }
},{timestamps:true});

const Training = mongoose.model('Training',trainingSchema);
module.exports = { Training }