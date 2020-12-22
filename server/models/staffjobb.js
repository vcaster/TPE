const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffjobbSchema = mongoose.Schema({
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
    staffratio:{
        required: true,
        type:String,
        maxlength:50
    },
    checklist:{
        required: true,
        type:String,
        maxlength:50
    },
    water:{
        required: true,
        type:String,
        maxlength:50
    },
    dinner:{
        required: true,
        type:String,
        maxlength:50
    },
    review:{
        required: true,
        type:String,
        maxlength:50
    },
    snack:{
        required: true,
        type:String,
        maxlength:50
    },
    bp:{
        required: true,
        type:String,
        maxlength:50
    },
    activities:{
        required: true,
        type:String,
        maxlength:50
    },
    note:{
        required: true,
        type:String,
        maxlength:50
    },
    activlogs:{
        required: true,
        type:String,
        maxlength:50
    },
    notesdaily:{
        required: true,
        type:String,
        maxlength:50
    },
    unit:{
        required: true,
        type:String,
        maxlength:50
    },
    trash:{
        required: true,
        type:String,
        maxlength:50
    },
    bathroom:{
        required: true,
        type:String,
        maxlength:50
    },
    mop:{
        required: true,
        type:String,
        maxlength:50
    },
    lunch:{
        required: true,
        type:String,
        maxlength:50
    },
    laundary:{
        required: true,
        type:String,
        maxlength:50
    },
    drill:{
        required: true,
        type:String,
        maxlength:50
    },
    issues:{
        required: true,
        type:String,
        maxlength:50
    },
    signs:{
        required: true,
        type:String,
        maxlength:50
    },
    agency:{
        required: true,
        type:String,
        maxlength:50
    },
    iron:{
        required: true,
        type:String,
        maxlength:50
    },
    duties:{
        required: true,
        type:String,
        maxlength:50
    },
    comment:{
        type:String,
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

const Staffjobb = mongoose.model('Staffjobb',staffjobbSchema);
module.exports = { Staffjobb }