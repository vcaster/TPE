const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exampleSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: 1,
        maxlength:100
    },
    description:{
        required: true,
        type: String,
        maxlength:100000
    },
    price:{
        required: true,
        type: Number,
        maxlength: 255
    },
    type:{
        type: Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    },
    available:{
        required: true,
        type: Boolean
    },
    sold:{
        type: Number,
        maxlength: 100,
        default: 0
    },
    publish:{
        required: true,
        type: Boolean
    },
    images:{
        type: Array,
        default:[]
    }
},{timestamps:true});

const Example = mongoose.model('Example',exampleSchema);
module.exports = { Example }