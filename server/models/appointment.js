const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = mongoose.Schema({
    dated:{
        type:Date,
        required: true
    },
    daten:{
        type:Date,
        required: true
    },
    type:{
        type:String,
        required: true,
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
    doc:{
        type:String,
        required: true,
    },
    freq:{
        type:String,
        required: true,
    },
    title:{
        type:String,
        required: true,
        default: 'Individual\'s'
    },
    staff:{
        type:String,
        required: true,
        default: 'Unknown'
    },
    color:{
        type:String,
        required: true,
        default: '#378006'
    },
    phone:{
        type:String,
        required: true,
        default: '1'
    },
    send:{
        type:String,
        required: true,
    },
    comment:{
        type:String,
        required: true,
        default: ''
    },
    deleted:{
        type:String,
        required: true,
        default: '0'
    },
},{timestamps:true});


const Appointment = mongoose.model('Appointment',appointmentSchema);

module.exports = { Appointment }