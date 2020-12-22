const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fundssheetSchema = mongoose.Schema({
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
    amounts:{
        required: true,
        type:String,
        maxlength:255
    },
    amountr:{
        required: true,
        type:String,
        maxlength:255
    },
    ogstaff:{
        required: true,
        type:String,
        maxlength:255
    },
    icstaff:{
        required: true,
        type:String,
        maxlength:255
    },
    dailyb:{
        required: true,
        type:String,
        maxlength:255
    },
    check:{
        required: true,
        type:String,
        maxlength:255
    },
    receipt:{
        required: true,
        type:String,
        maxlength:255
    },
    comment:{
        required: true,
        type:String,
        required: true,
    },
    clark:{
        type:String,
        required: true,
    },
    read:{
        type:Boolean,
        required: true,
        default: false
    },     
    deleted:{
        type:Boolean,
        required: true,
        default: false
    },
    staffsignimg:{
        required: true,
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },
},{timestamps:true});

const Fundssheet = mongoose.model('Fundssheet',fundssheetSchema);
module.exports = { Fundssheet }