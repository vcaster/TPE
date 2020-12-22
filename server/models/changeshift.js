const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const changeshiftSchema = mongoose.Schema({
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
    shift:{
        required: true,
        type:String,
        maxlength:50
    },
    allacc:{
        required: true,
        type:String,
        maxlength:50
    },
    cabinet:{
        required: true,
        type:String,
        maxlength:50
    },
    pmof:{
        required: true,
        type:String,
        maxlength:50
    },
    mar:{
        required: true,
        type:String,
        maxlength:50
    },
    pills:{
        required: true,
        type:String,
        maxlength:50
    },
    error:{
        required: true,
        type:String,
        maxlength:50
    },
    lock:{
        required: true,
        type:String,
        maxlength:50
    },
    count:{
        required: true,
        type:String,
        maxlength:50
    },
    prn:{
        required: true,
        type:String,
        maxlength:50
    },
    firstaid:{
        required: true,
        type:String,
        maxlength:50
    },
    keys:{
        required: true,
        type:String,
        maxlength:50
    },
    goal:{
        required: true,
        type:String,
        maxlength:50
    },
    intake:{
        required: true,
        type:String,
        maxlength:50
    },
    log:{
        required: true,
        type:String,
        maxlength:50
    },
    food:{
        required: true,
        type:String,
        maxlength:50
    },
    linen:{
        required: true,
        type:String,
        maxlength:50
    },
    cleaning:{
        required: true,
        type:String,
        maxlength:50
    },
    alu:{
        required: true,
        type:String,
        maxlength:50
    },
    neat:{
        required: true,
        type:String,
        maxlength:50
    },
    rooms:{
        required: true,
        type:String,
        maxlength:50
    },
    complete:{
        required: true,
        type:String,
        maxlength:50
    },
    above:{
        required: true,
        type:String,
        maxlength:50
    },
    chores:{
        required: true,
        type:String,
        maxlength:50
    },
    repairs:{
        required: true,
        type:String,
        maxlength:50
    },
    incident:{
        required: true,
        type:String,
        maxlength:50
    },
    damaged:{
        required: true,
        type:String,
        maxlength:50
    },
    mileage:{
        required: true,
        type:String,
        maxlength:50
    },
    parked:{
        required: true,
        type:String,
        maxlength:50
    },
    comment:{
        required: true,
        type:String
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
    read:{
        type:Boolean,
        required: true,
        default: false
    }
},{timestamps:true});

const Changeshift = mongoose.model('Changeshift',changeshiftSchema);
module.exports = { Changeshift }