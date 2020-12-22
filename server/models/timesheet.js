const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timesheetSchema = mongoose.Schema({
    name:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address:{
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    sun1d:{
        type:String,
        maxlength: 50,
    },
    sun1di:{
        type:String,
        maxlength: 50,
    },
    sun1do:{
        type:String,
        maxlength: 50,
    },
    sun1dt:{
        type:Number,
    },
    mon1d:{
        type:String,
        maxlength: 50,
    },
    mon1di:{
        type:String,
        maxlength: 50,
    },
    mon1do:{
        type:String,
        maxlength: 50,
    },
    mon1dt:{
        type:Number,
    },
    tue1d:{
        type:String,
        maxlength: 50,
    },
    tue1di:{
        type:String,
        maxlength: 50,
    },
    tue1do:{
        type:String,
        maxlength: 50,
    },
    tue1dt:{
        type:Number,
    },
    wed1d:{
        type:String,
        maxlength: 50,
    },
    wed1di:{
        type:String,
        maxlength: 50,
    },
    wed1do:{
        type:String,
        maxlength: 50,
    },
    wed1dt:{
        type:Number,
    },
    thu1d:{
        type:String,
        maxlength: 50,
    },
    thu1di:{
        type:String,
        maxlength: 50,
    },
    thu1do:{
        type:String,
        maxlength: 50,
    },
    thu1dt:{
        type:Number,
    },
    fri1d:{
        type:String,
        maxlength: 50,
    },
    fri1di:{
        type:String,
        maxlength: 50,
    },
    fri1do:{
        type:String,
        maxlength: 50,
    },
    fri1dt:{
        type:Number,
    },
    sat1d:{
        type:String,
        maxlength: 50,
    },
    sat1di:{
        type:String,
        maxlength: 50,
    },
    sat1do:{
        type:String,
        maxlength: 50,
    },
    sat1dt:{
        type:Number,
    },
    sun2d:{
        type:String,
        maxlength: 50,
    },
    sun2di:{
        type:String,
        maxlength: 50,
    },
    sun2do:{
        type:String,
        maxlength: 50,
    },
    sun2dt:{
        type:Number,
    },
    mon2d:{
        type:String,
        maxlength: 50,
    },
    mon2di:{
        type:String,
        maxlength: 50,
    },
    mon2do:{
        type:String,
        maxlength: 50,
    },
    mon2dt:{
        type:Number,
    },
    tue2d:{
        type:String,
        maxlength: 50,
    },
    tue2di:{
        type:String,
        maxlength: 50,
    },
    tue2do:{
        type:String,
        maxlength: 50,
    },
    tue2dt:{
        type: Number,
    },
    wed2d:{
        type:String,
        maxlength: 50,
    },
    wed2di:{
        type:String,
        maxlength: 50,
    },
    wed2do:{
        type:String,
        maxlength: 50,
    },
    wed2dt:{
        type: Number,
    },
    thu2d:{
        type:String,
        maxlength: 50,
    },
    thu2di:{
        type:String,
        maxlength: 50,
    },
    thu2do:{
        type:String,
        maxlength: 50,
    },
    thu2dt:{
        type: Number,
    },
    fri2d:{
        type:String,
        maxlength: 50,
    },
    fri2di:{
        type:String,
        maxlength: 50,
    },
    fri2do:{
        type:String,
        maxlength: 50,
    },
    fri2dt:{
        type: Number,
    },
    sat2d:{
        type:String,
        maxlength: 50,
    },
    sat2di:{
        type:String,
        maxlength: 50,
    },
    sat2do:{
        type:String,
        maxlength: 50,
    },
    sat2dt:{
        type: Number,
    },
    totalhrs:{
        type: Number,
    },
    staffsignimg:{
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },
    supervisor:{
        type:String,
        maxlength: 50
    },
    deleted:{
        type:Boolean,
        required: true,
        default: false
    },
    submitted:{
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

const Timesheet = mongoose.model('Timesheet',timesheetSchema);
module.exports = { Timesheet }