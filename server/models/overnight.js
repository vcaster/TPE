const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const overnightSchema = mongoose.Schema({
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
    time:{
        required: true,
        type: String,
        default: '0'
    },
    input:{
        required: true,
        type:String,
        default: '0'

    },
    deleted:{
        type: Boolean,
        default: false
    },

},{timestamps:true});

const Overnight = mongoose.model('Overnight',overnightSchema);
module.exports = { Overnight }