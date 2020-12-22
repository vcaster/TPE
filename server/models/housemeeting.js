const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const housemeetingSchema = mongoose.Schema({
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
    meetingnotes:{
        required: true,
        type:String
    },
    indivsignimg1:{
        required: true,
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },  
    indivsignimg2:{
        required: true,
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },   
    indivsignimg3:{
        required: true,
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },     
    staffsignimg:{
        required: true,
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },
    supervisorsignimg:{
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },
    managersignimg:{
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    }, 
    supervisorsigndate:{
        type:String,
        maxlength: 255,
    },
    managersigndate:{
        type:String,
        maxlength: 255,
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

const Housemeeting = mongoose.model('Housemeeting',housemeetingSchema);
module.exports = { Housemeeting }