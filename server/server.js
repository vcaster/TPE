const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); 
const pdf = require('html-pdf');
const cors = require('cors');
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);
// app.use(enforce.HTTPS({ trustProtoHeader: true }));
const mongoose = require('mongoose');
const path = require('path');
const pdfTemplate_DailyProgNote = require('./documents/daily_progress_note_files');
const pdfTemplate_SafetyInspec = require('./documents/safety_inspection_checklist_files');
const pdfTemplate_HouseMeeting = require('./documents/house_meeting_files');
const pdfTemplate_FireSafety = require('./documents/fire_safety_files')
const pdfTemplate_DaysProg = require('./documents/days_prog_files')
const pdfTemplate_ActivityLog = require('./documents/activity_log_files')
const pdfTemplate_TimeSheet = require('./documents/time_sheet_files')
const pdfTemplate_Training = require('./documents/training_files')

var options = {
    width: '210mm',
    height: '297mm'
  }
var messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY);

require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)

app.use(cors()); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'))
const moment = require('moment'); 

//ssl Redirect


// Models
const { User } = require('./models/user');
const { Type } = require('./models/type');
const { Individual } = require('./models/individual');
const { Address } = require('./models/address');
const { Dailyprognote } = require('./models/dailyprognote');
const { Safetyinspec } = require('./models/safteyinspection');
const {Housemeeting} = require('./models/housemeeting');
const {Firesafety} = require('./models/firesafety');
const {Daysprog} = require('./models/daysprog');
const {Activitylog} = require('./models/activitylog');
const {Timesheet} = require('./models/timesheet');
const {Log} = require('./models/log');
const {Message} = require('./models/message');
const {Staffjoba} = require('./models/staffjoba');
const {Staffjobb} = require('./models/staffjobb')
const {Changeshift} = require('./models/changeshift');
const {Behavesheet} = require('./models/behavesheet')
const {Fundssheet} = require('./models/fundssheet');
const {Training} = require('./models/training');
const {Attendance} = require('./models/attendance');
const {Overnight} = require('./models/overnight');
const {Bowel} = require('./models/bowel');
const {Incident} = require('./models/incident');
const {Statement} = require('./models/statement');
const {Chat} = require('./models/chat');
const {Appointment} = require('./models/appointment');
const {Sms} = require('./models/smslog')




// Middlewares
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

//=================================
//       Appointment
//=================================

app.post('/api/forms/appointment',auth,admin,(req,res)=>{
    const appointment = new Appointment(req.body);
    console.log(req.body)

    appointment.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            appointment: doc
        })
    })
})

app.post('/api/forms/appointment_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log (findArgs)

    findArgs['deleted'] = false

    Appointment.
    find(findArgs).
    populate('individual name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
}) 

app.get("/api/forms/appointment_to_view",auth,(req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "dated";
    let limit = req.query.limit ? parseInt(req.query.limit) : 1000;
    let findArgs = {};

    findArgs['deleted'] = false
    console.log(new Date(new Date(req.query.startDate).setHours(00, 00, 00)))

    // {dated: {
    //     $gte: new Date(new Date(req.query.startDate).setHours(00, 00, 00)),
    //     $lt: new Date(new Date(req.query.endDate).setHours(23, 59, 59))
    //         }  
    // }

    Appointment.aggregate([
        {$match: {deleted: "0"}},
        {
            $group : {
             _id:{_id:"$_id"},
              date: {$first: "$dated"},
              color: {$first: "$color"},
              type : {$first : "$type"},
              tit: {$first : "$title"},
              stf: {$first : "$staff"},
              id: {$first : "$_id"},
              doc: {$first : "$doc"},
                      
            }
        },
        {
        $addFields:{
          title: {$concat: [ "$tit", " - ", "$type"," - ", "$doc", " - ", "$stf"] }
        }
       }
    ]).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        // let simp = {}
        // articles.map((row,i) => {
        //     simp = {
        //         title: articles[i].type
        //     }
        // })
        
        res.status(200).send({
            size: articles.length,
            articles
            
        })
    })
})


app.get("/api/forms/getTracking",auth,(req, res) => {
    let items = mongoose.Types.ObjectId(req.query.filters);
    console.log(req.body)
    let order = req.body.order ? req.body.order : "asc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "createdAt";
    let findArgs = [];

    Appointment.aggregate([

        {$match: {individual: items ,deleted: "0"}},
 
        {$group : { _id:{type:"$type"},
                    daten: {$last : { "$cond": [
                        { "$lt": [ "$dated", Date() ] },
                        "$dated",
                        "$daten",
                    ]}},
                    type:{$last: "$type"},
                    freq: {$last: "$freq"}
            }},    
        {$sort: { createdAt: 1, type: 1  }},
    ])
        // .populate("name namer")
        .exec((err, articles) => {
            console.log(articles)
            if(err) return res.status(400).send(err);
            Appointment.aggregate([
                {$match: {individual: items, deleted: "0", color: "blue" }},
                
                {$group : { _id:{type:"$type"},
                    type:{$last: "$type"},
                    dated: { $last : "$dated" },
                    individual: { $last : "$individual" }
                    }}, 
                
                {$sort: { createdAt: 1, type: 1  } },            
                
            ])
            .exec((err, articles2) => {
                console.log(articles2)
                const final = articles.map((item, i) => {
                    // if(articles[i].type == item[i].type) {
                    //     articles[i].push({dated: item.dated})
                    // }
                    return item
                });
                // console.log(final[0])

                articles2.map((item, i) => {
                    // if(final[i].type == item[i].type) {
                        final[i].dated = item.dated
                        // final[i].push({dated: item.dated})
                    // }
                    // console.log(final[i])
                });
                // console.log(final);
                
                res.status(200).send({
                    size: articles.length,
                    // indiv:  articles2.details.individual.name +' '+articles2.details[0].individual.lastname,
                    indiv: "Null",
                    addr: "Null",
                    final

                })
            })
        })
})


app.post('/api/forms/appointment_update',auth,(req,res)=>{
    Appointment.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

/// Get single or more by ID

app.get('/api/forms/appointment_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Appointment.
    find({'_id':{$in:items}}).
    populate('individual name').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

// Process an incoming booking
app.post('/api/forms/sendsms', function(req, res) {
    console.log(req.body)

    if(req.body.send === "0"){
        return res.status(200).send({success:true, message:'Success!'})
    }
    
    // Check if date/time is correct and at least 3:05 hours in the future
    var earliestPossibleDT = moment().add({hours:0, minutes:2});
    var appointmentDT = moment(new Date(req.body.dated));
    if (appointmentDT.isBefore(earliestPossibleDT)) {
        // If not, show an error
        return res.status(200).send({success:false, message:'Error! insufficient time.'})
    }

    // Check if phone number is valid
    messagebird.lookup.read(req.body.phone, process.env.COUNTRY_CODE, function (err, response) {
        console.log(err);
        console.log(response);

        if (err && err.errors[0].code == 21) {
            // This error code indicates that the phone number has an unknown format
            return res.status(200).send({success:false, message:'Error! the phone number has an unknown format.'})
        } else
        if (err) {
            // Some other error occurred Something went wrong while checking your phone number!
            return res.status(200).send({success:false, message:'Error! Something went wrong while checking your phone number!'})

        }
        //  else
        // if (response.type != "mobile" || response.type != "fixed line or mobile") {
        //     // The number lookup was successful but it is not a mobile number
        //     return res.status(200).send({success:false, message:'Error! The number lookup was successful but it is not a mobile number.'})
        // } 
        else {
            // Everything OK

            // Schedule reminder 3 hours prior to the treatment
            var reminderDT = appointmentDT.clone().subtract({hours: 0, minutes:2});

            // Send scheduled message with MessageBird API
            messagebird.messages.create({
                originator : "Ezeki",
                recipients : [ response.phoneNumber ], // normalized phone number from lookup request
                scheduledDatetime : reminderDT.format(),
                body : req.body.staff + ", here's a reminder that "+ req.body.title+ " has "+req.body.type+" appointment with " + req.body.doc + " scheduled for " + appointmentDT.format('HH:mm') + ". Don't be late!. Call the office at 4108002502 for enquires."
            }, function (err, response) {
                if (err) {
                    // Request has failed
                    console.log(err);
                    // res.send("Error occured while sending message!");
                    return res.status(200).send({success:false, message:'Error occured while sending message!'})
                } else {
                    // Request was successful
                    console.log(response);
                    var ctent = req.body.staff + ", here's a reminder that "+ req.body.title+ " has a/an "+req.body.type+" appointment with " + req.body.doc + " scheduled for " + appointmentDT.format('HH:mm') + ". Don't be late! // Reminded : "+ reminderDT.format('Y-MM-DD HH:mm')
                    // Create and persist appointment object
                    var appointment = {
                        individual : req.body.individual,
                        name: req.body.name,
                        content: ctent,
                        number: req.body.phone,
                        type: "Appointment"
                    }
                    const sms = new Sms(appointment);
                    sms.save((err,doc)=>{
                        if(err) return res.json({success:false,err});
                        res.status(200).json({
                            success:true,
                            appointment: doc,
                            message: "Sms reminder scheduled!"
                        })
                    })
                    // res.status(200).send({
                    //     success:true,
                    //     response
                    // })
                    
                    // AppointmentDatabase.push(appointment);
                }
            });
        }     
      });
});





//=====================================================
//              Socket IO Integration
//=====================================================

io.on("connection", socket => {
    // let chatbot  
    // console.log("New socket connection") 
    // socket.emit('Output Chat Message', 'Welcome To COMPANY Direct Chat')
    // socket.broadcast.emit('Output Chat Message', 'User joined the chat')

    // this.socket.on("joinRoom", ({username, id}) => { 
    //     this.socket.join(socket.id,username, id)
    //     socket.join()
    //  })

    socket.on("join", function (data) {		
		socket.join(data.send);
	});

    socket.on("Input Chat Message", msg => {

        
            
            let chat = new Chat({ message: msg.chatMessage, name:msg.userID, type: msg.type, namer: msg.receid })
  
            chat.save((err, doc) => {
              if(err) return res.json({ success: false, err })
            
              Chat.find({ "_id": doc._id })
              .populate("name namer")
              .exec((err, doc)=> {
  
                  io.sockets.in(msg.receid).emit('Output Chat Message', doc);
              })
            })

     })

    //  socket.on('disconnect', () => {
    //      io.emit('Output Chat Message', 'User left the chat')
    //  })
  
  })


// app.get("/api/forms/getChats",auth,(req, res) => {
//     Chat.find()
//         .populate("name")
//         .exec((err, chats) => {
//             // console.log(chats)
//             if(err) return res.status(400).send(err);
//             res.status(200).send(chats)
//         })
// });

app.get("/api/forms/getChats",auth,(req, res) => {
    // let items = req.query.id;
    let ids = req.query.id.split(',');
    items = [];
    items = ids.map(item=>{
        return mongoose.Types.ObjectId(item)
    })
    let order = req.body.order ? req.body.order : "asc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "createdAt";
    Chat.find({
        name: {
            $in: items
        },
        namer: {
            $in: items
        }
    })
        .populate("name namer")
        .sort([[sortBy,order]])
        .exec((err, chats) => {
            // console.log(chats)
            if(err) return res.status(400).send(err);
            res.status(200).send(chats)
        })
});


app.get("/api/forms/getChatLog",auth,(req, res) => {
    let items = mongoose.Types.ObjectId(req.query.id);
    let order = req.body.order ? req.body.order : "asc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "createdAt";
    Chat.aggregate([
        {$match:{ $or : [{name: items}, {namer: items}]}},
        {$group : { _id:{name:"$name"}, name:{$last:"$name"}, namer:{$last:"$namer"}, message: {$last: "$message"}, read: {$last: "$read"}, createdAt: {$last: "$createdAt"}}},
        {
            $lookup:
              {
                from: "users",
                localField: "name",
                foreignField: "_id",
                as: "details"
              }
         },
         {$sort: { createdAt: 1 } },
    ])
        // .populate("name namer")
        .exec((err, chats) => {
            // console.log(chats)
            if(err) return res.status(400).send(err);
            res.status(200).send(chats)
        })
});


//=================================
//              COUNTS
//=================================

app.post('/api/users/individual_count',auth,admin,(req,res)=>{
    let findArgs = {};
    findArgs['deleted'] = '0';
    Individual.count(findArgs).
    exec((err,count)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            count
        })
    })
})

app.post('/api/users/user_count',(req,res)=>{
    let findArgs = {};
    findArgs['deleted'] = '0';
    User.count(findArgs).
    exec((err,count)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            count
        })
    })
})

app.post('/api/users/address_count',(req,res)=>{
    let findArgs = {};
    findArgs['deleted'] = '0';
    Address.count(findArgs).
    exec((err,count)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            count
        })
    })
})

//=================================
//              Message
//=================================

app.post('/api/users/message',auth,admin,(req,res)=>{
    // console.log(req.body)
    const message = new Message(req.body);

    message.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            message: doc
        })
    })
})


app.post('/api/users/messages_to_form',auth,(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "createdAt";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(findArgs)

    findArgs['deleted'] = false

    Message.
    find(findArgs).
    populate('name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  


app.get('/api/users/message_by_id',auth,(req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Message.
    find({'_id':{$in:items}}).
    populate('name').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

app.post('/api/users/message_update',auth,(req,res)=>{
    Message.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})


//=================================
//              log
//=================================

app.post('/api/users/log',auth,(req,res)=>{
    findArgs = {};
    findArgs['name'] = req.body.name
    findArgs['action'] = req.body.action
    findArgs['data'] = req.body.data
    findArgs['link'] = req.body.link
    findArgs['id'] = req.body.id
    findArgs['extra'] = req.body.extra
    // console.log(findArgs)
    const log = new Log(findArgs);

    log.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            log: doc
        })
    })
})

app.post('/api/users/logs_to_form',auth,(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "createdAt";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    findArgs['deleted'] = false

    Log.
    find(findArgs).
    populate('name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

app.post('/api/users/logs_to_form_id',auth,(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "createdAt";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    findArgs['deleted'] = false;
    findArgs['name'] = req.body.id;

    Log.
    find(findArgs).
    populate('name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})


//=================================
//              USERS
//=================================

app.get('/api/users/auth',auth,(req,res)=>{
        res.status(200).json({
            isAdmin: req.user.role === 0 ? false : true,
            isUser: req.user.role === 1 ? false : true,
            isReset: req.user.resetp === 0 ? false : true,
            isSupervisor: req.user.title === 2 ? true : false,
            isQa: req.user.title === 3 ? true : false,
            isAccount: req.user.title === 4 ? true : false,
            isSadmin: req.user.title === 5 ? true : false,
            isAuth: true,
            email: req.user.email,
            _id: req.user._id,
            name: req.user.name,
            lastname: req.user.lastname,
            photo: req.user.photo,
            role: req.user.role,
            address: req.user.address,
            individual: req.user.individual
        })
})

app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body);


    user.save((err,doc1)=>{
        if(err) return res.json({success:false,err});
        const timesheet = new Timesheet(
            {
                name: doc1._id,
                address:"5ee9550dd7188f64c8aca093",
                sun1d:"",
                sun1di:"",
                sun1do:"",
                sun1dt:null,
                mon1d:"",
                mon1di:"",
                mon1do:"",
                mon1dt:null,
                tue1d:"",
                tue1di:"",
                tue1do:"",
                tue1dt:null,
                wed1d:"",
                wed1di:"",
                wed1do:"",
                wed1dt:null,
                thu1d:"",
                thu1di:"",
                thu1do:"",
                thu1dt:null,
                fri1d:"",
                fri1di:"",
                fri1do:"",
                fri1dt:null,
                sat1d:"",
                sat1di:"",
                sat1do:"",
                sat1dt:null,
                sun2d:"",
                sun2di:"",
                sun2do:"",
                sun2dt:null,
                mon2d:"",
                mon2di:"",
                mon2do:"",
                mon2dt:null,
                tue2d:"",
                tue2di:"",
                tue2do:"",
                tue2dt:null,
                wed2d:"",
                wed2di:"",
                wed2do:"",
                wed2dt:null,
                thu2d:"",
                thu2di:"",
                thu2do:"",
                thu2dt:null,
                fri2d:"",
                fri2di:"",
                fri2do:"",
                fri2dt:null,
                sat2d:"",
                sat2di:"",
                sat2do:"",
                sat2dt:null,
                totalhrs:0,
                staffsignimg:"data:image/png;base64,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",
                supervisor:"Test"
            });
        timesheet.save((err,doc)=>{
            if(err) return res.json({success:false,err});
        })
        res.status(200).json({
            success: true
        })
    })
});

app.post('/api/users/login',(req,res)=>{

    // let areas = [
    //     {
    //         lat: 39.361970, // test
    //         lng: -76.609486,
    //     },
    //     {
    //         lat: 39.360260, // 8505 Glen Michael
    //         lng: -76.780540,
    //     }
    // ]

    // var centerPoint = { lat: 39.3607065, lng: -76.6104103 };
    // checks if two coordinates are within range of each other in kilometers
    // function arePointsNear(checkPoint, centerPoint, km) {
    //     var ky = 40000 / 360;
    //     var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
    //     var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    //     var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
    //     return Math.sqrt(dx * dx + dy * dy) <= km;
    // }
    // console.log(req.body)

    User.findOne({'email':req.body.email},(err,user)=>{
        // areas.some(row => {
        //     var n = true;
        //     var rst = arePointsNear(row, req.body.pos, 0.5)
        //     if (rst === n) return true
        //     if(!rst) return res.json({loginSuccess:false,message:'Access Denied!'});
        // })
        if(!user) return res.json({loginSuccess:false,message:'Wrong password!'});
        if(user.deleted === '1' || user.deleted === '2') return res.json({loginSuccess:false,message:'User Deactivated'});
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false,message:'Wrong password!'});

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('w_auth',user.token).status(200).json({
                    loginSuccess: true,
                    id: user._id
                })
            })
        })
    })
})


app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate(
        { _id:req.user._id },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true,
                id: req.user._id
            })
        }
    )
})

app.get('/api/users/remove',auth,(req,res)=>{
    User.findOneAndUpdate(
        { _id:req.query.formId },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true
            })
        }
    )
})

app.post('/api/users/reset_password',(req,res)=>{

    User.findOne({
        _id: req.body._id
    },(err,user)=>{
        if(!user) return res.json({success:false,message:'Something is wrong'})
        user.comparePassword(req.body.oldpass,(err,isMatch)=>{
            if(!isMatch) return res.json({loginSuccess:false,message:'Wrong password!'});    
                user.password = req.body.password;
                // user.resetp = req.body.resetp
                user.save((err,doc)=>{
                    if(err) return res.json({success:false,err});
                    return res.status(200).json({
                        success: true
                    })
                })
        })
    })
})

app.get('/api/users/users',auth,admin,(req,res)=>{
    
    let order = "asc";
    let sortBy = "lastname";
    let findArgs = {};
    findArgs['deleted'] = ["0","1"]
    // let items = ["1"]
    User.
    find(findArgs).    
    sort([[sortBy,order]]).
    exec((err,users)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    })
})

app.post('/api/users/users_to_form',auth,(req,res)=>{
    let order = req.body.order ? req.body.order : "asc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "lastname";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log(findArgs)

    findArgs['deleted'] = ["0","1"]

    User.
    find(findArgs).
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  


app.get('/api/users/user_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    User.
    find({'_id':{$in:items}}).
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

app.post('/api/users/user_update',auth,(req,res)=>{
    User.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

// Association Logic

app.get('/api/users/addToAddr', auth,(req,res)=>{
    User.findOne({_id: req.query.UsrsId},(err,doc)=>{
        let duplicate = false;
        // console.log(req.query.UsrsId)
        // doc.address.forEach((item)=>{
        //     if (item.id == req.query.AddrId) {
        //         duplicate = true;
        //     }
        // })
        if (duplicate) {
            console.log("Duplicate!")
        }else{
            User.findOneAndUpdate(
                {_id: req.query.UsrsId},
                { $push: { address: {
                    _id: mongoose.Types.ObjectId(req.query.AddrId),
                    name: req.query.name
                }}},
                {new: true},
                (err,doc)=>{
                    if(err) return res.json({success: false,err});
                    res.status(200).json({success: true,doc})
                }
            )
        }
    })
})


app.get('/api/users/addToIndiv', auth,(req,res)=>{
    User.findOne({_id: req.query.UsrsId},(err,doc)=>{
        let duplicate = false;

        // doc.individual.forEach((item)=>{
        //     if (item.id == req.query.IndivId) {
        //         duplicate = true;
        //     }
        // })

        if (duplicate) {
            console.log("Duplicate!")
        }else{
            User.findOneAndUpdate(
                {_id: req.query.UsrsId},
                { $push: { individual: {
                    _id: mongoose.Types.ObjectId(req.query.IndivId),
                    name: req.query.name,
                    lastname: req.query.lastname
                }}},
                {new: true},
                (err,doc)=>{
                    if(err) return res.json({success: false,err});
                    res.status(200).json({success: true,doc})
                }
            )
        }
    })
})

app.get('/api/users/removeAddr',auth,(req,res)=>{

    User.findOneAndUpdate(
        {_id: req.query.UsrsId},
        { "$pull":
            {"address": {"_id": mongoose.Types.ObjectId(req.query.AddrId)}}
        },
        {new: true},
        (err,doc) => {
            err ? console.log('error') : null;
            let address = doc.address;
            return res.status(200).json({
                address
            })

        }
    );
})

app.get('/api/users/removeIndiv',auth,(req,res)=>{

    User.findOneAndUpdate(
        {_id: req.query.UsrsId},
        { "$pull":
            {"individual": {"_id": mongoose.Types.ObjectId(req.query.IndivId)}}
        },
        {new: true},
        (err,doc) => {
            err ? console.log('error') : null;
            let individual = doc.individual;
            return res.status(200).json({
                individual
            })

        }
    );
})

//=================================
//              Individual
//=================================

app.post('/api/users/individual',auth,admin,(req,res)=>{
    const individual = new Individual(req.body);

    individual.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            individual: doc
        })
    })
})

app.get('/api/users/individuals',(req,res)=>{
    let order = "asc";
    let sortBy = "lastname";
    let findArgs = {};
    findArgs['deleted'] = "0";
    Individual.
    find(findArgs).    
    sort([[sortBy,order]]).
    exec((err,individuals)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(individuals)
    })
})

app.post('/api/users/individuals_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "asc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "lastname";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log(findArgs)

    findArgs['deleted'] = '0'

    Individual.
    find(findArgs).
    populate('address').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  


app.get('/api/users/individual_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Individual.
    find({'_id':{$in:items}}).
    populate('address').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

app.post('/api/users/individual_update',auth,(req,res)=>{
    Individual.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,individual)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

app.post('/api/users/individual_update_enc',auth,(req,res)=>{
    // console.log(req.body)
 Individual.findOne(
        {_id: req.body._id},
        (err,individual)=>{
            if(err) return res.json({success: false,err});
            individual.ssn = req.body.ssn
            individual.medicare = req.body.medicare
            individual.medicaid = req.body.medicaid
            individual.save((err,doc)=>{
                    if(err) return res.json({success:false,err});
                    return res.status(200).json({
                        success: true
                    })
                })
        }
    )
})

//=================================
//              Addresses
//=================================

app.post('/api/users/address',auth,admin,(req,res)=>{
    const address = new Address(req.body);

    address.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            address: doc
        })
    })
})

app.get('/api/users/addresses',(req,res)=>{

    let order = "asc";
    let sortBy = "name";
    let findArgs = {};
    findArgs['deleted'] = "0";
    Address.
    find(findArgs).    
    sort([[sortBy,order]]).
    exec((err,addresses)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(addresses)
    })

})

app.post('/api/users/address_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(findArgs)

    findArgs['deleted'] = false

    Address.
    find(findArgs).
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
}) 

app.get('/api/users/address_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Address.
    find({'_id':{$in:items}}).
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

app.post('/api/users/address_update',auth,(req,res)=>{
    Address.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})



//=================================
//        Time Sheet
//=================================

app.post('/api/forms/time_sheet',auth,admin,(req,res)=>{
    const timesheet = new Timesheet(req.body);

    timesheet.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            timesheet: doc
        })
    })
})

app.post('/api/forms/time_sheet_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "createdAt";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log(findArgs)

    findArgs['deleted'] = false

    Timesheet.
    find(findArgs).
    populate('name address').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

app.post('/api/forms/time_sheet_to_form_id',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "createdAt";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(findArgs)
    
    findArgs['name'] = req.body.id;
    findArgs['deleted'] = false

    Timesheet.
    find(findArgs).
    populate('name address').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})

/// Get single or more by ID

app.get('/api/forms/time_sheet_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Timesheet.
    find({'_id':{$in:items}}).
    populate('name address').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})


app.post('/api/forms/time_sheet_update',auth,(req,res)=>{
    Timesheet.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

app.get('/api/forms/time_sheet_read', auth,(req,res) => {
    Timesheet.findOneAndUpdate(
        {_id: req.query.formId},
        {read: true},
        (err,doc)=>{
            if (err) return res.json({success:false,err});
            return res.status(200). send({
                success:true
            })
        }
    )
})

app.post('/api/forms/time_sheet_download',auth,(req,res) => {
    const date = new Date(req.body.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    pdf.create(pdfTemplate_TimeSheet(req.body), options).toFile('./documents/time_sheet_files/'+ full+ req.body.name.name+req.body.name.lastname+'_'+'time_sheet.pdf', (err) => {
      if(err) {
          return console.log('error');
      }
  res.send(Promise.resolve())
    });
  })

app.get('/api/forms/time_sheet_fetch', (req, res) => {
    const date = new Date(req.query.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    res.sendFile(path.resolve(`__dirname}/../documents/time_sheet_files/${full}${req.query.name}_time_sheet.pdf`));
  });


//=================================
//              Forms
//=================================

//=================================
//        Daily Progress Note
//=================================

app.post('/api/forms/daily_progress_note',auth,admin,(req,res)=>{
    const dailyprognote = new Dailyprognote(req.body);

    dailyprognote.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            Dailyprognote: doc
        })
        
    })
})

app.get('/api/forms/daily_progress_note_read', auth,(req,res) => {
    Dailyprognote.findOneAndUpdate(
        {_id: req.query.formId},
        {read: true},
        (err,doc)=>{
            if (err) return res.json({success:false,err});
            return res.status(200). send({
                success:true
            })
        }
    )
})

app.post('/api/forms/daily_prog_notes_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log(findArgs)

    findArgs['deleted'] = false

    Dailyprognote.
    find(findArgs).
    populate('name').
    populate('individual').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

// BY DATE
// /articles?sortBy=createdAt&order=desc&limit=4

// BY VALUE
// /articles?sortBy=value&order=desc&limit=100&skip=5

app.get('/api/forms/daily_progress_notes',(req,res)=>{    
    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let findArgs = {};

    findArgs['deleted'] = false

    Dailyprognote.
    find(findArgs).
    populate('name individual').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,daily_progress_notes)=>{
        if(err) return res.status(400).send(err);
        res.send(daily_progress_notes)
    })
})

/// Get single or more by ID

app.get('/api/forms/daily_progress_notes_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Dailyprognote.
    find({'_id':{$in:items}}).
    populate('name individual').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

app.post('/api/forms/daily_progress_notes_update',auth,(req,res)=>{
    Dailyprognote.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

app.post('/api/forms/daily_progress_note_download',auth,(req,res) => {
    const date = new Date(req.body.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    pdf.create(pdfTemplate_DailyProgNote(req.body), { format: 'Letter' }).toFile('./documents/daily_progress_note_files/'+ full+ req.body.individual.name+req.body.individual.lastname+'_'+'Daily_Progress_Note.pdf', (err) => {
      if(err) {
          return console.log('error');
      }
  res.send(Promise.resolve())
    });
  })

app.get('/api/forms/daily_progress_note_fetch', (req, res) => {
    const date = new Date(req.query.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    res.sendFile(path.resolve(`__dirname}/../documents/daily_progress_note_files/${full}${req.query.name}_Daily_Progress_Note.pdf`));
  });

//=================================
//        Safety Inspection Checklist
//=================================

app.post('/api/forms/safety_inspection',auth,admin,(req,res)=>{
    const safetyinspec = new Safetyinspec(req.body);

    safetyinspec.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            safetyinspec: doc
        })
    })
})

app.post('/api/forms/safety_inspection_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log(findArgs)

    findArgs['deleted'] = false

    Safetyinspec.
    find(findArgs).
    populate('name').
    populate('address').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

// BY DATE
// /articles?sortBy=createdAt&order=desc&limit=4

// BY VALUE
// /articles?sortBy=value&order=desc&limit=100&skip=5

app.get('/api/forms/safety_inspections',(req,res)=>{    
    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let findArgs = {};

    findArgs['deleted'] = false

    Safetyinspec.
    find(findArgs).
    populate('name address').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,safetyinspecs)=>{
        if(err) return res.status(400).send(err);
        res.send(safetyinspecs)
    })
})

/// Get single or more by ID

app.get('/api/forms/safety_inspection_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Safetyinspec.
    find({'_id':{$in:items}}).
    populate('name address').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

app.get('/api/forms/safety_inspection_read', auth,(req,res) => {
    Safetyinspec.findOneAndUpdate(
        {_id: req.query.formId},
        {read: true},
        (err,doc)=>{
            if (err) return res.json({success:false,err});
            return res.status(200). send({
                success:true
            })
        }
    )
})

app.post('/api/forms/safety_inspection_update',auth,(req,res)=>{
    Safetyinspec.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

app.post('/api/forms/safety_inspection_download',auth,(req,res) => {
    const date = new Date(req.body.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    pdf.create(pdfTemplate_SafetyInspec(req.body), { format: 'Letter' }).toFile('./documents/safety_inspection_checklist_files/'+ full+ req.body.address.name+'_'+'safety_inspection_checklist.pdf', (err) => {
      if(err) {
          return console.log('error');
      }
  res.send(Promise.resolve())
    });
  })

app.get('/api/forms/safety_inspection_fetch', (req, res) => {
    const date = new Date(req.query.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    res.sendFile(path.resolve(`__dirname}/../documents/safety_inspection_checklist_files/${full}${req.query.name}_safety_inspection_checklist.pdf`));
  });

//=================================
//        House Meeting
//=================================

app.post('/api/forms/house_meeting',auth,admin,(req,res)=>{
    const safetyinspec = new Housemeeting(req.body);

    safetyinspec.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            safetyinspec: doc
        })
    })
})

app.post('/api/forms/house_meeting_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log(findArgs)

    findArgs['deleted'] = false

    Housemeeting.
    find(findArgs).
    populate('address').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

// BY DATE
// /articles?sortBy=createdAt&order=desc&limit=4

// BY VALUE
// /articles?sortBy=value&order=desc&limit=100&skip=5

app.get('/api/forms/house_meetings',(req,res)=>{    
    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let findArgs = {};

    findArgs['deleted'] = false

    Housemeeting.
    find(findArgs).
    populate('name address').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,housemetings)=>{
        if(err) return res.status(400).send(err);
        res.send(housemetings)
    })
})

/// Get single or more by ID

app.get('/api/forms/house_meeting_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Housemeeting.
    find({'_id':{$in:items}}).
    populate('address').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

app.get('/api/forms/house_meeting_read', auth,(req,res) => {
    Housemeeting.findOneAndUpdate(
        {_id: req.query.formId},
        {read: true},
        (err,doc)=>{
            if (err) return res.json({success:false,err});
            return res.status(200). send({
                success:true
            })
        }
    )
})

app.post('/api/forms/house_meeting_update',auth,(req,res)=>{
    Housemeeting.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

app.post('/api/forms/house_meeting_download',auth,(req,res) => {
    const date = new Date(req.body.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    pdf.create(pdfTemplate_HouseMeeting(req.body), { format: 'Letter' }).toFile('./documents/house_meeting_files/'+ full+ req.body.address.name+'_'+'house_meeting.pdf', (err) => {
      if(err) {
          return console.log('error');
      }
  res.send(Promise.resolve())
    });
  })

app.get('/api/forms/house_meeting_fetch', (req, res) => {
    const date = new Date(req.query.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    res.sendFile(path.resolve(`__dirname}/../documents/house_meeting_files/${full}${req.query.name}_house_meeting.pdf`));
  });


//=================================
//        Statment
//=================================

app.post('/api/forms/statement',auth,admin,(req,res)=>{
    const statement = new Statement(req.body);

    statement.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            statement: doc
        })
    })
})

app.post('/api/forms/statement_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log(findArgs)

    findArgs['deleted'] = false

    Statement.
    find(findArgs).
    populate('name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  


/// Get single or more by ID

app.get('/api/forms/statement_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Statement.
    find({'_id':{$in:items}}).
    populate('name').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

app.get('/api/forms/statement_read', auth,(req,res) => {
    Statement.findOneAndUpdate(
        {_id: req.query.formId},
        {read: true},
        (err,doc)=>{
            if (err) return res.json({success:false,err});
            return res.status(200). send({
                success:true
            })
        }
    )
})

app.post('/api/forms/statement_update',auth,(req,res)=>{
    Statement.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

// app.post('/api/forms/statement_download',auth,(req,res) => {
//     const date = new Date(req.body.createdAt);
//     const year = date.getFullYear();
//     const month = date.getMonth()+1
//     const day = date.getDate()
//     const hour = date.getHours()
//     const minutes = date.getMinutes()
//     const seconds=date.getSeconds()
//     const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
//     pdf.create(pdfTemplate_HouseMeeting(req.body), {}).toFile('./documents/house_meeting_files/'+ full+ req.body.address.name+'_'+'house_meeting.pdf', (err) => {
//       if(err) {
//           return console.log('error');
//       }
//   res.send(Promise.resolve())
//     });
//   })

// app.get('/api/forms/house_meeting_fetch', (req, res) => {
//     const date = new Date(req.query.createdAt);
//     const year = date.getFullYear();
//     const month = date.getMonth()+1
//     const day = date.getDate()
//     const hour = date.getHours()
//     const minutes = date.getMinutes()
//     const seconds=date.getSeconds()
//     const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
//     res.sendFile(path.resolve(`__dirname}/../documents/house_meeting_files/${full}${req.query.name}_house_meeting.pdf`));
//   });

//=================================
//        Incident
//=================================

app.post('/api/forms/incident',auth,admin,(req,res)=>{
    const incident = new Incident(req.body);
-
    incident.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            incident: doc
        })
    })
})

app.post('/api/forms/incident_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log(findArgs)

    findArgs['deleted'] = false

    Incident.
    find(findArgs).
    populate('address name individual').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

/// Get single or more by ID

app.get('/api/forms/incident_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Incident.
    find({'_id':{$in:items}}).
    populate('address name individual').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

app.get('/api/forms/incident_read', auth,(req,res) => {
    Incident.findOneAndUpdate(
        {_id: req.query.formId},
        {read: true},
        (err,doc)=>{
            if (err) return res.json({success:false,err});
            return res.status(200). send({
                success:true
            })
        }
    )
})

app.post('/api/forms/incident_update',auth,(req,res)=>{
    Incident.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

// app.post('/api/forms/house_meeting_download',auth,(req,res) => {
//     const date = new Date(req.body.createdAt);
//     const year = date.getFullYear();
//     const month = date.getMonth()+1
//     const day = date.getDate()
//     const hour = date.getHours()
//     const minutes = date.getMinutes()
//     const seconds=date.getSeconds()
//     const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
//     pdf.create(pdfTemplate_HouseMeeting(req.body), {}).toFile('./documents/house_meeting_files/'+ full+ req.body.address.name+'_'+'house_meeting.pdf', (err) => {
//       if(err) {
//           return console.log('error');
//       }
//   res.send(Promise.resolve())
//     });
//   })

// app.get('/api/forms/house_meeting_fetch', (req, res) => {
//     const date = new Date(req.query.createdAt);
//     const year = date.getFullYear();
//     const month = date.getMonth()+1
//     const day = date.getDate()
//     const hour = date.getHours()
//     const minutes = date.getMinutes()
//     const seconds=date.getSeconds()
//     const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
//     res.sendFile(path.resolve(`__dirname}/../documents/house_meeting_files/${full}${req.query.name}_house_meeting.pdf`));
//   });



//=================================
//       Fire Safety
//=================================

app.post('/api/forms/fire_safety',auth,admin,(req,res)=>{
    const firesafety = new Firesafety(req.body);

    firesafety.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            firesafety: doc
        })
    })
})

app.post('/api/forms/fire_safety_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log(findArgs)

    findArgs['deleted'] = false

    Firesafety.
    find(findArgs).
    populate('address staffreport').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

// BY DATE
// /articles?sortBy=createdAt&order=desc&limit=4

// BY VALUE
// /articles?sortBy=value&order=desc&limit=100&skip=5

app.get('/api/forms/fire_safetys',(req,res)=>{    
    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let findArgs = {};

    findArgs['deleted'] = false

    Firesafety.
    find(findArgs).
    populate('address staffreport').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,firesafetys)=>{
        if(err) return res.status(400).send(err);
        res.send(firesafetys)
    })
})

/// Get single or more by ID

app.get('/api/forms/fire_safety_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Firesafety.
    find({'_id':{$in:items}}).
    populate('address staffreport').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

app.get('/api/forms/fire_safety_read', auth,(req,res) => {
    Firesafety.findOneAndUpdate(
        {_id: req.query.formId},
        {read: true},
        (err,doc)=>{
            if (err) return res.json({success:false,err});
            return res.status(200). send({
                success:true
            })
        }
    )
})

app.post('/api/forms/fire_safety_update',auth,(req,res)=>{
    Firesafety.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

app.post('/api/forms/fire_safety_download',auth,(req,res) => {
    const date = new Date(req.body.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    pdf.create(pdfTemplate_FireSafety(req.body), { format: 'Letter' }).toFile('./documents/fire_safety_files/'+ full+ req.body.address.name+'_'+'fire_safety.pdf', (err) => {
      if(err) {
          return console.log('error');
      }
  res.send(Promise.resolve())
    });
  })

app.get('/api/forms/fire_safety_fetch', (req, res) => {
    const date = new Date(req.query.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    res.sendFile(path.resolve(`__dirname}/../documents/fire_safety_files/${full}${req.query.name}_fire_safety.pdf`));
  });



//=================================
//       30 days progress note
//=================================

app.post('/api/forms/days_prog',auth,admin,(req,res)=>{
    const daysprog = new Daysprog(req.body);

    daysprog.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            daysprog: doc
        })
    })
})

app.post('/api/forms/days_prog_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log(findArgs)

    findArgs['deleted'] = false

    Daysprog.
    find(findArgs).
    populate('individual name address').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

// BY DATE
// /articles?sortBy=createdAt&order=desc&limit=4

// BY VALUE
// /articles?sortBy=value&order=desc&limit=100&skip=5

app.get('/api/forms/days_progs',(req,res)=>{    
    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let findArgs = {};

    findArgs['deleted'] = false

    Daysprog.
    find(findArgs).
    populate('address individual name').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,daysprogs)=>{
        if(err) return res.status(400).send(err);
        res.send(daysprogs)
    })
})

/// Get single or more by ID

app.get('/api/forms/days_prog_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Daysprog.
    find({'_id':{$in:items}}).
    populate('address individual name').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

app.get('/api/forms/days_prog_read', auth,(req,res) => {
    Daysprog.findOneAndUpdate(
        {_id: req.query.formId},
        {read: true},
        (err,doc)=>{
            if (err) return res.json({success:false,err});
            return res.status(200). send({
                success:true
            })
        }
    )
})

app.post('/api/forms/days_prog_update',auth,(req,res)=>{
    Daysprog.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

app.post('/api/forms/days_prog_download',auth,(req,res) => {
    const date = new Date(req.body.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    pdf.create(pdfTemplate_DaysProg(req.body), { format: 'Letter' }).toFile('./documents/days_prog_files/'+ full+ req.body.individual.name+req.body.individual.lastname+'_'+'days_prog.pdf', (err) => {
      if(err) {
          return console.log('error');
      }
  res.send(Promise.resolve())
    });
  })

app.get('/api/forms/days_prog_fetch', (req, res) => {
    const date = new Date(req.query.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    res.sendFile(path.resolve(`__dirname}/../documents/days_prog_files/${full}${req.query.name}_days_prog.pdf`));
  });


//=================================
//       Activity Log
//=================================

app.post('/api/forms/activity_log',auth,admin,(req,res)=>{
    const activitylog = new Activitylog(req.body);

    activitylog.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            activitylog: doc
        })
    })
})

app.post('/api/forms/activity_log_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log (findArgs)

    findArgs['deleted'] = false

    Activitylog.
    find(findArgs).
    populate('address individual name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

app.post('/api/forms/activity_log_to_view',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
                findArgs[key] = req.body.filters[key]
        }
    }
    
    findArgs['deleted'] = false
    // console.log(findArgs)

    Activitylog.
    find(findArgs).
    populate('address individual name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            name: articles[0].individual.name +' '+articles[0].individual.lastname,
            address: articles[0].address.address,
            size: articles.length,
            articles
        })
    })
})

// BY DATE
// /articles?sortBy=createdAt&order=desc&limit=4

// BY VALUE
// /articles?sortBy=value&order=desc&limit=100&skip=5

app.get('/api/forms/activity_logs',(req,res)=>{    
    let order = req.query.order ? req.query.order : 'desc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;
    let findArgs = {};

    findArgs['deleted'] = false

    Activitylog.
    find(findArgs).
    populate('address individual user').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,daysprogs)=>{
        if(err) return res.status(400).send(err);
        res.send(daysprogs)
    })
})

/// Get single or more by ID

app.get('/api/forms/activity_log_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Activitylog.
    find({'_id':{$in:items}}).
    populate('address individual name').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

app.get('/api/forms/activity_log_read', auth,(req,res) => {
    Activitylog.findOneAndUpdate(
        {_id: req.query.formId},
        {read: true},
        (err,doc)=>{
            if (err) return res.json({success:false,err});
            return res.status(200). send({
                success:true
            })
        }
    )
})

app.post('/api/forms/activity_log_update',auth,(req,res)=>{
    Activitylog.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

app.post('/api/forms/activity_log_download',auth,(req,res) => {
    const date = new Date(req.body[0].createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"

    const data = Object.entries(req.body)
    // console.log(typeof data)
    // console.log(data)
    // console.log(data[0][1].deleted);
    const all = {...data[5][1], ...data[6][1]}
    console.log(all)
//     pdf.create(pdfTemplate_ActivityLog(), {}).toFile('./documents/activity_log_files/'+ full+data[0][1].address.name+'_'+'activity_log.pdf', (err) => {
//       if(err) {
//           return console.log('error');
//       }
//   res.send(Promise.resolve())
//     });
// console.log(typeof req.body)
  })


app.get('/api/forms/activity_log_fetch', (req, res) => {
    const date = new Date(req.query.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    res.sendFile(path.resolve(`__dirname}/../documents/activity_log_files/${full}${req.query.name}_activity_log.pdf`));
  });


//=================================
//       Staff Job Description 11am
//=================================

app.post('/api/forms/staff_desc_11',auth,admin,(req,res)=>{
    const staffjoba = new Staffjoba(req.body);

    staffjoba.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            staffjoba: doc
        })
    })
})

app.post('/api/forms/staff_desc_11_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log (findArgs)

    findArgs['deleted'] = false

    Staffjoba.
    find(findArgs).
    populate('address name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

app.post('/api/forms/staff_desc_11_to_view',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
                findArgs[key] = req.body.filters[key]
        }
    }
    
    findArgs['deleted'] = false
    // console.log(findArgs)

    Staffjoba.
    find(findArgs).
    populate('address name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            ratio: articles[0].staffratio,
            address: articles[0].address.address,
            date: articles[0].createdAt,
            size: articles.length,
            articles
        })
    })
})

app.post('/api/forms/staff_desc_11_update',auth,(req,res)=>{
    Staffjoba.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

/// Get single or more by ID

app.get('/api/forms/staff_desc_11_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Staffjoba.
    find({'_id':{$in:items}}).
    populate('address name').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

//=================================
//       Staff Job Description 3pm
//=================================

app.post('/api/forms/staff_desc_3',auth,admin,(req,res)=>{
    const staffjobb = new Staffjobb(req.body);

    staffjobb.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            staffjobb: doc
        })
    })
})

app.post('/api/forms/staff_desc_3_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log (findArgs)

    findArgs['deleted'] = false

    Staffjobb.
    find(findArgs).
    populate('address name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

app.post('/api/forms/staff_desc_3_to_view',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
                findArgs[key] = req.body.filters[key]
        }
    }
    
    findArgs['deleted'] = false
    // console.log(findArgs)

    Staffjobb.
    find(findArgs).
    populate('address name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            ratio: articles[0].staffratio,
            address: articles[0].address.address,
            date: articles[0].createdAt,
            size: articles.length,
            articles
        })
    })
})

app.post('/api/forms/staff_desc_3_update',auth,(req,res)=>{
    Staffjobb.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

/// Get single or more by ID

app.get('/api/forms/staff_desc_3_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Staffjobb.
    find({'_id':{$in:items}}).
    populate('address name').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})


//=================================
//       Change of shift
//=================================

app.post('/api/forms/change_shift',auth,admin,(req,res)=>{
    const changeshift = new Changeshift(req.body);

    changeshift.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            changeshift: doc
        })
    })
})

app.post('/api/forms/change_shift_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log (findArgs)

    findArgs['deleted'] = false

    Changeshift.
    find(findArgs).
    populate('address name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

app.post('/api/forms/change_shift_to_view',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
                findArgs[key] = req.body.filters[key]
        }
    }
    
    findArgs['deleted'] = false
    // console.log(findArgs)

    Changeshift.
    find(findArgs).
    populate('address name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            address: articles[0].address.address,
            date: articles[0].createdAt,
            size: articles.length,
            articles
        })
    })
})

app.post('/api/forms/change_shift_update',auth,(req,res)=>{
    Changeshift.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

/// Get single or more by ID

app.get('/api/forms/change_shift_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Changeshift.
    find({'_id':{$in:items}}).
    populate('address name').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

//=================================
//       Weekly activity funds 
//=================================

app.post('/api/forms/funds_sheet',auth,admin,(req,res)=>{
    const fundssheet = new Fundssheet(req.body);

    fundssheet.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            fundssheet: doc
        })
    })
})

app.get('/api/forms/fund',auth,(req,res)=>{
    Fundssheet.find({},(err,users)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    })
})

app.post('/api/forms/funds_sheet_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log (findArgs)

    findArgs['deleted'] = false

    Fundssheet.
    find(findArgs).
    populate('address individual name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

app.post('/api/forms/funds_sheet_to_view',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
                findArgs[key] = req.body.filters[key]
        }
    }
    
    findArgs['deleted'] = false
    // console.log(findArgs)

    Fundssheet.
    find(findArgs).
    populate('address individual name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        // console.log(articles[0].individual.name +' '+articles[0].individual.lastname)
        res.status(200).json({
            indiv: articles[0].individual.name +' '+articles[0].individual.lastname,
            staff: articles[0].name.name +' '+articles[0].name.lastname,
            address: articles[0].address.address,
            date: articles[0].createdAt,
            size: articles.length,
            articles
        })
    })
})

app.post('/api/forms/funds_sheet_update',auth,(req,res)=>{
    Fundssheet.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

/// Get single or more by ID

app.get('/api/forms/funds_sheet_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Fundssheet.
    find({'_id':{$in:items}}).
    populate('address Individual name').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

//=========================================
//       Attecedent by Behaviour Data Sheet
//==========================================

app.post('/api/forms/behave_sheet',auth,admin,(req,res)=>{
    const behavesheet = new Behavesheet(req.body);

    behavesheet.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            behavesheet: doc
        })
    })
})

app.post('/api/forms/behave_sheet_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log (findArgs)

    findArgs['deleted'] = false

    Behavesheet.
    find(findArgs).
    populate('individual name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

app.post('/api/forms/behave_sheet_to_view',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
                findArgs[key] = req.body.filters[key]
        }
    }
    
    findArgs['deleted'] = false
    // console.log(findArgs)

    Behavesheet.
    find(findArgs).
    populate('individual name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            name: articles[0].individual.name +' '+articles[0].individual.lastname,
            setting: articles[0].setting,
            date: articles[0].createdAt,
            size: articles.length,
            articles
        })
    })
})

app.post('/api/forms/behave_sheet_update',auth,(req,res)=>{
    Behavesheet.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

/// Get single or more by ID

app.get('/api/forms/behave_sheet_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Behavesheet.
    find({'_id':{$in:items}}).
    populate('individual name').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})
//=========================================
//       Training Form
//==========================================

app.post('/api/forms/training',auth,admin,(req,res)=>{
    const training = new Training(req.body);

    training.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            training: doc
        })
        
    })
})


app.post('/api/forms/training_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log(findArgs)

    findArgs['deleted'] = false

    Training.
    find(findArgs).
    populate('name').
    populate('individual name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  
/// Get single or more by ID

app.get('/api/forms/training_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Training.
    find({'_id':{$in:items}}).
    populate('name individual').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

app.post('/api/forms/training_update',auth,(req,res)=>{
    Training.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

app.get('/api/forms/training_read', auth,(req,res) => {
    Training.findOneAndUpdate(
        {_id: req.query.formId},
        {read: true},
        (err,doc)=>{
            if (err) return res.json({success:false,err});
            return res.status(200). send({
                success:true
            })
        }
    )
})

app.post('/api/forms/training_download',auth,(req,res) => {
    const date = new Date(req.body.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    pdf.create(pdfTemplate_Training(req.body), {}).toFile('./documents/training_files/'+ full+ req.body.name.name+req.body.name.lastname+req.body.training+'_'+'Training.pdf', (err) => {
      if(err) {
          return console.log('error');
      }
  res.send(Promise.resolve())
    });
  })

app.get('/api/forms/training_fetch', (req, res) => {
    const date = new Date(req.query.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds=date.getSeconds()
    const full = month+"-"+day+"-"+year+"T"+hour+"."+minutes+"."+seconds+"_"
    res.sendFile(path.resolve(`__dirname}/../documents/training_files/${full}${req.query.name}_Training.pdf`));
  });

  //=====================================
//       Individual Attendence Residental
//=======================================

app.post('/api/forms/attendance',auth,admin,(req,res)=>{
    const attendance = new Attendance(req.body);

    attendance.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            attendance: doc
        })
    })
})

app.post('/api/forms/attendance_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log (findArgs)

    findArgs['deleted'] = false

    Attendance.
    find(findArgs).
    populate('address individual name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

app.post('/api/forms/attendance_to_view',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
                findArgs[key] = req.body.filters[key]
        }
    }
    
    findArgs['deleted'] = false
    // console.log(findArgs)

    Attendance.
    find(findArgs).
    populate('address individual name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        // console.log(articles[0].individual.name +' '+articles[0].individual.lastname)
        if(err) return res.status(400).send(err);
        res.status(200).json({
            indiv: articles[0].individual.name +' '+articles[0].individual.lastname,
            address: articles[0].address.address,
            date: articles[0].createdAt,
            size: articles.length,
            articles
        })
    })
})

app.post('/api/forms/attendance_update',auth,(req,res)=>{
    Attendance.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

/// Get single or more by ID

app.get('/api/forms/attendance_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Attendance.
    find({'_id':{$in:items}}).
    populate('address individual name').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

//=================================
//       Overnight Log   
//=================================

app.post('/api/forms/overnight_sheet',auth,admin,(req,res)=>{
    const overnight = new Overnight(req.body);

    overnight.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            overnight: doc
        })
    })
})

app.post('/api/forms/overnight_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log (findArgs)

    findArgs['deleted'] = false

    Overnight.
    find(findArgs).
    populate('individual name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

app.post('/api/forms/overnight_to_view',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
                findArgs[key] = req.body.filters[key]
        }
    }
    
    findArgs['deleted'] = false
    // console.log(findArgs)

    Overnight.
    find(findArgs).
    populate('individual name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            indiv: articles[0].individual.name +' '+articles[0].individual.lastname,
            date: articles[0].createdAt,
            size: articles.length,
            articles
        })
    })
})

app.post('/api/forms/overnight_update',auth,(req,res)=>{
    Overnight.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

/// Get single or more by ID

app.get('/api/forms/overnight_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Overnight.
    find({'_id':{$in:items}}).
    populate('individual name').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

//=================================
//      Bowel Movement Chart
//=================================

app.post('/api/forms/bowel',auth,admin,(req,res)=>{
    const bowel = new Bowel(req.body);

    bowel.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            bowel: doc
        })
    })
})

app.post('/api/forms/bowel_to_form',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
            if(key === 'price'){
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            }else{
                findArgs[key] = req.body.filters[key]
            }
        }
    }
    // console.log (findArgs)

    findArgs['deleted'] = false

    Bowel.
    find(findArgs).
    populate('individual name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            size: articles.length,
            articles
        })
    })
})  

app.post('/api/forms/bowel_to_view',(req,res)=>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100; 
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length >0 ){
                findArgs[key] = req.body.filters[key]
        }
    }
    
    findArgs['deleted'] = false
    // console.log(findArgs)

    Bowel.
    find(findArgs).
    populate('individual name').
    sort([[sortBy,order]]).
    limit(limit).
    skip(skip).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            indiv: articles[0].individual.name +' '+articles[0].individual.lastname,
            date: articles[0].createdAt,
            size: articles.length,
            articles
        })
    })
})

app.post('/api/forms/bowel_update',auth,(req,res)=>{
    Bowel.findOneAndUpdate(
        {_id: req.body._id},
        {
            "$set": req.body
        },
        {new:true},
        (err,doc)=>{
            if(err) return res.json({success: false,err});
            return res.status(200).send({
                success:true
            })
        }
    )
})

/// Get single or more by ID

app.get('/api/forms/bowel_by_id', (req,res) =>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Bowel.
    find({'_id':{$in:items}}).
    populate('individual name').
    exec((err,docs)=>{
         return res.status(200).send(docs)
    })
})

//=================================
//              Type
//=================================

app.post('/api/product/type',auth,admin,(req,res)=>{
    const type = new Type(req.body);

    type.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success:true,
            type: doc
        })
    })
})

app.get('/api/product/types',(req,res)=>{
    Type.find({},(err,types)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(types)
    })
})

//=================================
//             Example
//=================================

// BY DATE
// /articles?sortBy=createdAt&order=desc&limit=4

// BY VALUE
// /articles?sortBy=value&order=desc&limit=100&skip=5
app.get('/api/example/articles',(req,res)=>{

    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    Example.
    find().
    populate('type').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,articles)=>{
        if(err) return res.status(400).send(err);
        res.send(articles)
    })
})


/// /api/example/example?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single
app.get('/api/example/articles_by_id',(req,res)=>{
    let type = req.query.type;
    let items = req.query.id;

    if(type === "array"){
        let ids = req.query.id.split(',');
        items = [];
        items = ids.map(item=>{
            return mongoose.Types.ObjectId(item)
        })
    }

    Example.
    find({ '_id':{$in:items}}).
    populate('type').
    exec((err,docs)=>{
        return res.status(200).send(docs)
    })
});


app.post('/api/example/article',auth,admin,(req,res)=>{
    const example = new Example(req.body);

    example.save((err,doc)=>{
        if(err) return res.json({success:false,err});
        res.status(200).json({
            success: true,
            article: doc
        })
    })
})

if(process.env.NODE_ENV === 'production'){
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 3002;
server.listen(port,()=>{
    console.log(`Server Running at ${port}`)
})