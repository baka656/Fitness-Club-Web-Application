const exp=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const testRouter=exp.Router();

var fs = require('fs');
ObjectId = require('mongodb').ObjectID;

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


module.exports=testRouter;
