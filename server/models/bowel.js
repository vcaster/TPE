const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bowelSchema = mongoose.Schema({
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
    shift:{
        required: true,
        type: String,
        default: '0'
    },
    amount:{
        required: true,
        type:String,
        default: '0'

    },
    consist:{
        required: true,
        type:String,
        default: '0'

    },
    staffinitial:{
        // required: true,
        type:String,
        default: '0'

    },
    deleted:{
        type: Boolean,
        default: false
    },

},{timestamps:true});

const Bowel = mongoose.model('Bowel',bowelSchema);
module.exports = { Bowel }