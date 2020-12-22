const mongoose = require('mongoose');

const typeSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        unique: 1,
        maxlength:100
    }
});

const Type = mongoose.model('Type',typeSchema);

module.exports = { Type }