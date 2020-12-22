const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statementSchema = mongoose.Schema({
    name:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },   
    input:{
        required: true,
        type:String
    },  
    staffsignimg:{
        required: true,
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
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

const Statement = mongoose.model('Statement',statementSchema);
module.exports = { Statement }