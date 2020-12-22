const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staffjobaSchema = mongoose.Schema({
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
    dressed:{
        required: true,
        type:String,
        maxlength:50
    },
    checkindiv:{
        required: true,
        type:String,
        maxlength:50
    },
    bedcheck:{
        required: true,
        type:String,
        maxlength:50
    },
    stove:{
        required: true,
        type:String,
        maxlength:50
    },
    cabinet:{
        required: true,
        type:String,
        maxlength:50
    },
    iron:{
        required: true,
        type:String,
        maxlength:50
    },
    room:{
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
    food:{
        required: true,
        type:String,
        maxlength:50
    },

    container:{
        required: true,
        type:String,
        maxlength:50
    },
    mop:{
        required: true,
        type:String,
        maxlength:50
    },
    breakfast:{
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
    mar:{
        required: true,
        type:String,
        maxlength:50
    },
    signs:{
        required: true,
        type:String,
        maxlength:255
    },
    agency:{
        required: true,
        type:String,
        maxlength:255
    },
    duties:{
        required: true,
        type:String,
        maxlength:255
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

const Staffjoba = mongoose.model('Staffjoba',staffjobaSchema);
module.exports = { Staffjoba }