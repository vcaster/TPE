const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const safetyinspecSchema = mongoose.Schema({
    name:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    individual:{
        type:String,
        required: true
    },
    address:{
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    shift:{
        required: true,
        type:String,
        maxlength: 255
    },
    marks:{
        type:String,
        maxlength: 255
    },
    complaints:{
        type:String,
        maxlength: 255
    },
    comments:{
        type:String,
        maxlength: 255
    },
    items:{
        type:String,
        maxlength: 255
    },
    clutter:{
        type:String,
        maxlength: 255
    },
    lint:{
        type:String,
        maxlength: 255
    },
    appliances:{
        type:String,
        maxlength: 255
    },
    food:{
        type:String,
        maxlength: 255
    },
    refrigerator:{
        type:String,
        maxlength: 255
    },
    freezer:{
        type:String,
        maxlength: 255
    },
    rodent:{
        type:String,
        maxlength: 255
    },
    dishware:{
        type:String,
        maxlength: 255
    },
    soap:{
        type:String,
        maxlength: 255
    },
    sanitary:{
        type:String,
        maxlength: 255
    },
    trash:{
        type:String,
        maxlength: 255
    },
    clothes:{
        type:String,
        maxlength: 255
    },
    bedroom:{
        type:String,
        maxlength: 255
    },
    hotwater:{
        type:String,
        maxlength: 255
    },
    firstaid:{
        type:String,
        maxlength: 255
    },
    detector:{
        type:String,
        maxlength: 255
    },
    generalcomment:{
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

const Safetyinspec = mongoose.model('Safetyinspec',safetyinspecSchema);
module.exports = { Safetyinspec }