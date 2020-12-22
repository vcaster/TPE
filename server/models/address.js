const mongoose = require('mongoose');


const addressSchema = mongoose.Schema({
    address:{
        type:String,
        required: true,
        maxlength:100
    },
    name:{
        type:String,
        required: true,
        maxlength:100
    },
    deleted:{
        type:Boolean,
        required: true,
        default: false
    },
});


const Address = mongoose.model('Address',addressSchema);

module.exports = { Address }