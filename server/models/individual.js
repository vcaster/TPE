const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var AES = require("crypto-js/aes");
const bcrypt = require('bcrypt');
const SALT_I = 10;
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SALT_I = 10;
// require('dotenv').config();
// const Cryptr = require('cryptr');
// const cryptr = new Cryptr(process.env.SECRET);

const individualSchema = mongoose.Schema({
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
    address:{
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    telephone:{
        type:String,
        
        default: "None"
    },
    sex:{
        type:String,
        
        default: "None"
    },
    dob:{
        type:String,
        
        default: "None"
    },
    ssn:{
        type:String,        
        default: "None"
    },
    doa:{
        type:String,
        
        default: "None"
    },
    medicaid:{
        type:String,
        
        default: "None"
    },
    medicare:{
        type:String,
        
        default: "None"
    },
    lmgname:{
        type:String,
        
        default: "None"
    },
    lmgrelationship:{
        type:String,
        
        default: "None"
    },
    lmgaddress:{
        type:String,
        
        default: "None"
    },
    lmgtelephone:{
        type:String,
        
        default: "None"
    },
    emgcontact:{
        type:String,
        
        default: "None"
    },

    emgtelephone:{
        type:String,
        
        default: "None"
    },
    emgposition:{
        type:String,
        
        default: "None"
    },
    emgcompany:{
        type:String,
        
        default: "None"
    },
    fcname:{
        type:String,
        
        default: "None"
    },
    fcrelationship:{
        type:String,
        
        default: "None"
    },
    fcaddress:{
        type:String,
        
        default: "None"
    },
    fctelephone:{
        type:String,
        
        default: "None"
    },
    scname:{
        type:String,
        
        default: "None"
    },
    scaddress:{
        type:String,
        
        default: "None"
    },
    sctelephone:{
        type:String,
        
        default: "None"
    },
    scfax:{
        type:String,
        
        default: "None"
    },
    vcprogram:{
        type:String,
        
        default: "None"
    },
    vcaddress:{
        type:String,
        
        default: "None"
    },
    vctelephone:{
        type:String,
        
        default: "None"
    },
    vcfax:{
        type:String,
        
        default: "None"
    },
    martialstatus:{
        type:String,
        
        default: "None"
    },
    height:{
        type:String,
        
        default: "None"
    },
    weight:{
        type:String,
        
        default: "None"
    },
    race:{
        type:String,
        
        default: "None"
    },
    haircolor:{
        type:String,
        
        default: "None"
    },
    eyecolor:{
        type:String,
        
        default: "None"
    },
    verbal:{
        type:String,
        
        default: "None"
    },
    ambulatory:{
        type:String,
        
        default: "None"
    },
    adaptivedevices:{
        type:String,
        
        default: "None"
    },
    religion:{
        type:String,
        
        default: "None"
    },
    diet:{
        type:String,
        
        default: "None"
    },
    allergy:{
        type:String,
        
        default: "None"
    },
    medicaldiagnosis:{
        type:String,
        
        default: "None"
    },
    pcp:{
        type:String,
        
        default: "None"
    },
    dental:{
        type:String,
        
        default: "None"
    },
    vision:{
        type:String,
        
        default: "None"
    },
    hearing:{
        type:String,
        
        default: "None"
    },
    ent:{
        type:String,
        
        default: "None"
    },
    cardiologist:{
        type:String,
        
        default: "None"
    },
    psychiatrist:{
        type:String,
        
        default: "None"
    },
    therapist:{
        type:String,
        
        default: "None"
    },
    neorology:{
        type:String,
        
        default: "None"
    },
    gynecology:{
        type:String,
        
        default: "None"
    },
    urology:{
        type:String,
        
        default: "None"
    },
    groupsessions:{
        type:String,
        
        default: "None"
    },
    extra1:{
        type:String,
        
        default: "None"
    },
    extra2:{
        type:String,
        
        default: "None"
    },
    extra3:{
        type:String,
        
        default: "None"
    },
    extra4:{
        type:String,
        
        default: "None"
    },
    extra5:{
        type:String,
        
        default: "None"
    },
    extra6:{
        type:String,
        
        default: "None"
    },

    photo: {
        type:String,
        
        default: "https://via.placeholder.com/320x320?text=NO+IMAGE"
    },
    
    deleted:{
        type:String,
        default:"0"
    },
});

// userSchema.pre('save',function(next){
//     var user = this;

//     if(user.isModified('ssn')){        
    
//     const encryptedString = cryptr.encrypt(user.ssn);
//     user.password = encryptedString;
//     next();
//     }
// })

individualSchema.pre('save',function(next){
    var individual = this;

    if(individual.isModified('ssn')){
        // if(err) return next(err);
        var encrypted = AES.encrypt(individual.ssn, "CRD5513VINYLOLANGDA").toString();
        // console.log(individual.ssn)
        individual.ssn = encrypted;
        next();

        // bcrypt.genSalt(SALT_I,function(err,salt){
        //     if(err) return next(err);
    
        //     bcrypt.hash(individual.ssn,salt,function(err,hash){
        //         if(err) return next(err);
        //         individual.ssn = hash;
        //         next();
        //     });
        // })
    }
    if(individual.isModified('medicare')){
        // if(err) return next(err);
        var encrypted = AES.encrypt(individual.medicare, "CRD5513VINYLOLANGDA").toString();
        // console.log(individual.ssn)
        individual.medicare = encrypted;
        next();

        // bcrypt.genSalt(SALT_I,function(err,salt){
        //     if(err) return next(err);
    
        //     bcrypt.hash(individual.ssn,salt,function(err,hash){
        //         if(err) return next(err);
        //         individual.ssn = hash;
        //         next();
        //     });
        // })
    } 
    if(individual.isModified('medicaid')){
        // if(err) return next(err);
        var encrypted = AES.encrypt(individual.medicaid, "CRD5513VINYLOLANGDA").toString();
        // console.log(individual.ssn)
        individual.medicaid = encrypted;
        next();

        // bcrypt.genSalt(SALT_I,function(err,salt){
        //     if(err) return next(err);
    
        //     bcrypt.hash(individual.ssn,salt,function(err,hash){
        //         if(err) return next(err);
        //         individual.ssn = hash;
        //         next();
        //     });
        // })
    }
    else{
        next()
    }
})

const Individual = mongoose.model('Individual',individualSchema);

module.exports = { Individual }