const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incidentSchema = mongoose.Schema({
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
    address:{
        type: Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    location:{
        required: true,
        type:String,
    },
    before:{
        required: true,
        type:String,
    },
    during:{
        required: true,
        type:String,
    },
    after:{
        required: true,
        type:String
    },  
    staffsignimg:{
        required: true,
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },  
    witsignimg:{
        required: true,
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },  
    wittsignimg:{
        required: true,
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },  
    witttsignimg:{
        required: true,
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },
    coordinator:{
        required: true,
        type:String
    },
    nurse:{
        required: true,
        type:String
    }, 
    action:{
        required: true,
        type:String
    }, 
    injuryqa:{
        required: true,
        type:String
    }, 
    injury:{
        required: true,
        type:String
    },  
    iother:{
        required: true,
        type:String,
        default: "None"
    },  
    body:{
        required: true,
        type:String
    }, 
    bother:{
        required: true,
        type:String,
        default: "None"
    }, 
    notified:{
        required: true,
        type:String,
    },    
    follow:{
        required: true,
        type:String,
        default: "None"
    },
    hospital:{
        required: true,
        type:String,
    },
    hospitaly:{
        required: true,
        type:String,
        default: "None"
    },
    treatment:{
        required: true,
        type:String
    },
    pcoordinator:{
        required: true,
        type:String,
        default: "https://via.placeholder.com/320x180?text=NO+SIGNATURE"
    },
    pdirector:{
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

const Incident = mongoose.model('Incident',incidentSchema);
module.exports = { Incident }