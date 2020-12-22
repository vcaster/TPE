const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = mongoose.Schema({
    address:{
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
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
    input:{
        type:String,
        default:"0"
    },
    comment:{
        type:String,

    },
    deleted:{
        type: Boolean,
        default: false
    },

},{timestamps:true});

const Attendance = mongoose.model('Attendance',attendanceSchema);
module.exports = { Attendance }