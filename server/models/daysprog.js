const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const daysprogSchema = mongoose.Schema({
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
    address:{
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    meetingdate:{
        required: true,
        type:String,
        maxlength: 255,
    },
    period:{
        required: true,
        type:String,
        maxlength: 255,
    },
    longterm:{
        required: true,
        type:String,
    },
    outcome:{
        required: true,
        type:String
    },
    interventions:{
        required: true,
        type:String
    },
    reinforcement:{
        required: true,
        type:String
    }, 
    collect:{
        required: true,
        type:String
    }, 
    summarys:{
        required: true,
        type:String
    },  
    summaryc:{
        required: true,
        type:String
    },  
    behaviour:{
        required: true,
        type:String
    }, 
    reports:{
        required: true,
        type:String
    }, 
    medication:{
        required: true,
        type:String,
        maxlength: 255,
    },    
    revision:{
        required: true,
        type:String
    },  
    staffsignimg:{
        required: true,
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },
    staffposition:{
            required: true,
            type:String,
            maxlength: 255,
            default: "Residential Councelor"
    },
    director:{
        required: true,
        type:String,
        maxlength: 255
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

const Daysprog = mongoose.model('Daysprog',daysprogSchema);
module.exports = { Daysprog }