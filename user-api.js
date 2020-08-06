const exp=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const testRouter=exp.Router();
const nodemailer=require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
ObjectId = require('mongodb').ObjectID;

//sending mail
var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
        }
        else {
            callback(null, html);
        }
    });
};
smtpTransport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: '',
        pass: ''
    },
    tls: {
        rejectUnauthorized: false
    }
}));

//to store image in cloudinary
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");
//credentials
cloudinary.config({
  cloud_name: "dzb4lmyme",
  api_key: "511935753193731",
  api_secret: "7A9DTSkYf6oJZua-GGILeRsV_dg",
});
//set storage
var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "user-profiles",
  allowedFormats: ["jpg", "png"],
  filename: function (req, file, cb) {
    cb(undefined, file.fieldname + "-" + Date.now());
  }
});

//Configure multer middleware
var upload = multer({ storage: storage });

//to subscribe the user
testRouter.use(exp.json());
testRouter.post('/subscribe',(req,res,next)=>{
    let dbo=req.app.locals.dbObject.db('fitness');
    dbo.collection('subscribers').find({}).toArray((err,obj)=>{
        if(err){
            console.log(err);
            next(err);
        }
        else{
            var mail=[];
            mail=obj[0].email;
            console.log('out null',mail,obj);
            if(mail.indexOf(req.body.email)!==-1)
                res.send({message: 'already subscribed'});
            else{
                if(mail[0]=='')
                    mail[0]=req.body.email;
                else
                    mail.push(req.body.email);
                console.log(mail);
                dbo.collection('subscribers').updateOne({_id: ObjectId(obj[0]._id)},{$set: {email:mail}},(err,success)=>{
                    if(err){
                        console.log('error at user-api:',err);
                        next(err);
                    }
                    else{
                        readHTMLFile(__dirname + '/views/subscribe.html', function(err, html) {
                            var template = handlebars.compile(html);
                            var replacements = {
                                name: 'baka'
                        };
                        var htmlToSend = template(replacements);
                            var mailOptions = {
                                from: '"fitness club" <abbhinav.nomulla656@gmail.com',
                                to: req.body.email,
                                cc: 'monadarling858@gmail.com',
                                bcc:'gowthamsps98@gmail.com',
                                subject: 'Successfully Subscribed!!',
                                html : htmlToSend
                            };
                            smtpTransport.sendMail(mailOptions, function (error, response) {
                                if (error) {
                                    console.log(error);
                                    callback(error);
                                }
                                res.send({message:'success'});
                                console.log('subscription mail sent');
                            });
                        });
                    }   
                });
            }
        }
    });
});

//to register the user
testRouter.use(exp.json());
testRouter.post('/join',(req,res,next)=>{
    let dbo=req.app.locals.dbObject.db('fitness');
    console.log(req.body);
    console.log(JSON.stringify(req.body.email),typeof(JSON.stringify(req.body.email)));

    dbo.collection('users').findOne({username:req.body.username},(err,obj)=>{
        if(err){
            console.log('error at user-api:',err);
            next(err);
        }
        if(obj!=null){
            res.send({message:'user exists'});
        }
        else{
            bcrypt.hash(req.body.password,7,(err,hashedPass)=>{
                if(err){
                    next(err);
                }
                req.body.password=hashedPass;
                dbo.collection('users').insertOne(req.body,(err,sucess)=>{
                    if(err){
                        next(err);
                    }
                    res.send({message:'user created'});
                });
            });
            readHTMLFile(__dirname + '/views/join.html', function(err, html) {
                var template = handlebars.compile(html);
                var replacements = {
                     name: req.body.username
                };
                var htmlToSend = template(replacements);
                var mailOptions = {
                    from: '"fitness club" <abbhinav.nomulla656@gmail.com',
                    to: req.body.email,
                    cc: 'monadarling858@gmail.com',
                    bcc:'gowthamsps98@gmail.com',
                    subject: 'Sucessfully Joined Fitness Club!!',
                    html : htmlToSend
                 };
                smtpTransport.sendMail(mailOptions, function (error, response) {
                    if (error) {
                        console.log(error);
                        callback(error);
                    }
                    console.log('registration mail sent');
                });
            });
        }
    });
});

//to return courses of a particular user
testRouter.use(exp.json());
testRouter.post('/mycourses',(req,res,next)=>{
    let dbo=req.app.locals.dbObject.db('fitness');
    dbo.collection('users').findOne({username: req.body.username},(err,obj)=>{
        if(err){
            console.log(err);
            next(err);
        }
        else{
            dbo.collection('classes').find({}).toArray((err,objj)=>{
                if(err){
                    console.log(err);
                    next(err);
                }
                else{
                    var result=[];
                    var x=[];
                    x.push(objj);
                    var y=[];
                    y.push(obj.courses);
                    console.log('courses',obj.courses);
                    for(i of objj){
                        console.log(i._id);
                        for(j of obj.courses)
                            if(i._id==j)
                                result.push(i);
                    }
                    console.log('result');
                    for(i of result)
                        console.log(i._id);
                    res.send({message: 'success',data:result});
                }
            });
        }
    });
});

//to return details of a user
testRouter.use(exp.json());
testRouter.post('/profileRead',(req,res,next)=>{
    let dbo=req.app.locals.dbObject.db('fitness');
    
    dbo.collection('users').findOne({username:req.body.username},(err,obj)=>{
        if(err){
            console.log('error at user-api:',err);
            next(err);
        }
        else{
            res.send({message:'success',data: obj});
        }
    });
});


//to validate user during login
testRouter.use(exp.json());
testRouter.post('/login',(req,res,next)=>{
    let dbo=req.app.locals.dbObject.db('fitness');
    dbo.collection('users').findOne({username:req.body.username},(err,obj)=>{
        if(err){
            console.log('error at user-api:',err);
            next(err);
        }
        if(obj==null){
            res.send({message:'invalid username'});
        }
        else{
            bcrypt.compare(req.body.password,obj.password,(err,isMatched)=>{
                if(err){
                    next(err);
                }
                if(isMatched==false){
                    res.send({message:'invalid password'});
                }
                else{
                    jwt.sign({username:obj.username},"abcdef",{expiresIn: 604800},(err,signedToken)=>{
                        if(err){
                            next(err);
                        }
                        res.send({message:'success',token:signedToken,username:obj.username});
                    });
                }
            });
        }
    });
});


//to update about of user profile
testRouter.use(exp.json());
testRouter.post('/updateAbout', (req,res,next)=>{
    let dbo=req.app.locals.dbObject.db('fitness');

    dbo.collection('users').findOne({username: req.body.user},(err,objf)=>{
        if(err){
            console.log('error at user-api:',err);
            next(err);
        }
        if(objf==null){
            res.send({message:'invalid username'});
        }
        else{
            dbo.collection('users').updateOne({username: req.body.user},{$set: {about: req.body.about}},(err,sucess)=>{
                if(err){
                    next(err);
                }
                console.log('updated about');
                res.send({ message: 'success' });
            });
        }
    });
});

//to update the dp of user
testRouter.use(exp.json());
testRouter.post('/dpUpdate',upload.single('photo'),(req,res,next)=>{
    console.log("req body is ",req.body)
    console.log("url is ", req.file.secure_url);
    var user=req.body.user;  
    var img = req.file.secure_url;
    delete req.body.photo;
    let dbo=req.app.locals.dbObject.db('fitness');
    dbo.collection('users').updateOne({username: user},{ $set: { img: img } },(err,sucess)=>{
        if(err){
            console.log('update err',err);
            next(err);
        }
            console.log('updated dp');
            res.send({message: 'success'});
    });
});
