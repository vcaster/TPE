const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitylogSchema = mongoose.Schema({
    individual:{
        type: Schema.Types.ObjectId,
        ref: 'Individual',
        required: true
    },
    address:{
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    name:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activity:{
        required: true,
        type:String,
        maxlength:255
    },
    location:{
        required: true,
        type:String,
        maxlength:255
    },
    time:{
        required: true,
        type:String,
        maxlength:255
    },
    stafIntals:{
        required: true,
        type:String,
        maxlength:255
    },
    completed:{
        required: true,
        type:String,
        maxlength:255
    },
    comment:{
        required: true,
        type:String,
        maxlength:255
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

const Activitylog = mongoose.model('Activitylog',activitylogSchema);
module.exports = { Activitylog }