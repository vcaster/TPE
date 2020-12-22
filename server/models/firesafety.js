const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const firesafetySchema = mongoose.Schema({
    individual:{
        type:String,
        required: true
    },
    staff:{
        type:String,
        required: true,
        maxlength: 255
    },
    address:{
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    locfire:{
        type:String,
        maxlength: 255
    },
    evactime:{
        type:String,
        required: true,
        maxlength: 255
    },
    exitdoor:{
        type:String,
        required: true,
        maxlength: 255
    },
    rallypoint:{
        type:String,
        required: true,
        maxlength: 255
    },
    stove:{
        type:String,
        required: true,
        maxlength: 255
    },
    light:{
        type:String,
        required: true,
        maxlength: 255
    },
    firstfloorf:{
        type:String,
        required: true,
        maxlength: 255
    },
    secondfloorf:{
        type:String,
        required: true,
        maxlength: 255
    },
    basementf:{
        type:String,
        required: true,
        maxlength: 255
    },
    firstfloors:{
        type:String,
        required: true,
        maxlength: 255
    },
    secondfloors:{
        type:String,
        required: true,
        maxlength: 255
    },
    basements:{
        type:String,
        required: true,
        maxlength: 255
    },
    firstaid:{
        type:String,
        required: true,
        maxlength: 255
    },
    tag:{
        type:String,
        required: true,
        maxlength: 255
    },
    comment:{
        type:String,
        required: true,
        maxlength: 255
    },
    staffreport:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    supervisorsignimg:{
        required: true,
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
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

const Firesafety = mongoose.model('Firesafety',firesafetySchema);
module.exports = { Firesafety }