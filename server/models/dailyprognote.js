const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailyprognoteSchema = mongoose.Schema({
    name:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    individual:{
        type: Schema.Types.ObjectId,
        ref: 'Individual',
        required: true
    },
    shift:{
        required: true,
        type:String
    },
    commactiv:{
        type:String
    },
    goal1:{
        type:String
    },
    goal2:{
        type:String
    },
    sp1:{
        type:String
    },
    behavgoals:{
        type:String
    },
    nursingcomm:{
        type:String
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

const Dailyprognote = mongoose.model('Dailyprognote',dailyprognoteSchema);
module.exports = { Dailyprognote }