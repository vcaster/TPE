const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = mongoose.Schema({
    name:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action:{
        required: true,
        type: String,
    },
    data:{
        type: Object,
    },
    link:{
        type: String,
        maxlength: 100,
    },
    id:{
        type: String,
        maxlength: 100,
    },
    extratype:{
        type: String,
        default: '0'
    },
    extra:{
        type: String,
        default: '0'
    },
    deleted:{
        type: Boolean,
        default: false
    },
},{timestamps:true});

const Log = mongoose.model('Log',logSchema);
module.exports = { Log }