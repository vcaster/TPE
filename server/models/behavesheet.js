const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const behavesheetSchema = mongoose.Schema({
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
    setting:{
        required: true,
        type:String,
        maxlength:255
    },
    timeb:{
        required: true,
        type:String,
        maxlength:50
    },
    timee:{
        required: true,
        type:String,
        maxlength:50
    },
    snacking:{
        required: true,
        type:String,
        maxlength:50
    },
    destruct:{
        required: true,
        type:String,
        maxlength:50
    },
    vocal:{
        required: true,
        type:String,
        maxlength:50
    },
    sib:{
        required: true,
        type:String,
        maxlength:50
    },
    elopment:{
        required: true,
        type:String,
        maxlength:50
    },
    rating:{
        required: true,
        type:String,
        maxlength:50
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

const Behavesheet = mongoose.model('Behavesheet',behavesheetSchema);
module.exports = { Behavesheet }