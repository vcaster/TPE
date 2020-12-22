const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SALT_I = 10;
require('dotenv').config();

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type:String,
        required: true,
        minlength: 5
    },
    name:{
        type:String,
        required: true,
        maxlength:100
    },
    lastname:{
        type:String,
        required: true,
        maxlength:100
    },

    intpatogen:{
        type:String,
        maxlength:50
    },

    patogen:{
        type:String,
        maxlength:50
    },

    cpr:{
        type:String,
        maxlength:50
    },

    firstaid:{
        type:String,
        maxlength:50
    },

    comminte:{
        type:String,
        maxlength:50
    },

    idoop:{
        type:String,
        maxlength:50
    },

    chara:{
        type:String,
        maxlength:50
    },

    funda:{
        type:String,
        maxlength:50
    },

    commdis:{
        type:String,
        maxlength:50
    },

    support:{
        type:String,
        maxlength:50
    },

    commskill:{
        type:String,
        maxlength:50
    },

    cmt:{
        type:String,
        maxlength:50
    },

    mandt:{
        type:String,
        maxlength:50
    },

    check:{
        type:String,
        maxlength:50
    },

    phone:{
        type:String,
        maxlength:50
    },

    
    drivrec:{
        type:String,
        maxlength:50
    },

    app:{
        type:String,
        maxlength:50
    },

    drivlic:{
        type:String,
        maxlength:50
    },

    extra:{
        type:String,
        maxlength:50
    },
    eligib:{
        type:String,
        maxlength:50
    },

    hire:{
        type:String,
        maxlength:50
    },
    obser:{
        type:String,
        maxlength:50
    },
    aging:{
        type:String,
        maxlength:50
    },
    
    incident:{
        type:String,
        maxlength:50
    },

    seizure:{
        type:String,
        maxlength:50
    },

    autism:{
        type:String,
        maxlength:50
    },

    social:{
        type:String,
        maxlength:50
    },

    phy:{
        type:String,
        maxlength:50
    },

    tb:{
        type:String,
        maxlength:50
    },

    edu:{
        type:String,
        maxlength:50
    },

    emginfo:{
        type:String,
        maxlength:50
    },

    overtime:{
        type:String,
        maxlength:50
    },

    fininfo:{
        type:String,
        maxlength:50
    },

    empeligib:{
        type:String,
        maxlength:50
    },

    warn:{
        type:String,
        maxlength:50
    },
    role:{
        type:Number,
        default:0
    },
    suspend:{
        type:String,
        default:0
    },
    deleted:{
        type:String,
        default:"0"
    },
    extra0:{
        type:String,
        default:0
    },
    extra1:{
        type:String,
        default:0
    },
    extra2:{
        type:String,
        default:0
    },
    suspend:{
        type:String,
        default:0
    },
    photo:{
        type:String,
        maxlength:100,
        default: "https://via.placeholder.com/320x320?text=NO+IMAGE"

    },
    email1:{
        type:String,
        maxlength:50
    },
    token:{
        type:String
    },
    address:{
        type: Array,
        default:[]
    },
    individual:{
        type: Array,
        default:[]
    },
    title:{
        type:Number,
        default:1
    }
});

userSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            });
        })
    } else{
        next()
    }
})

userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch)
    })
}


userSchema.methods.generateToken = function(cb){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),process.env.SECRET)

    user.token = token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}

userSchema.statics.findByToken = function(token,cb){
    var user = this;

    jwt.verify(token,process.env.SECRET,function(err,decode){
        user.findOne({"_id":decode,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
}



const User = mongoose.model('User',userSchema);

module.exports = { User }