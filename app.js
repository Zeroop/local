const express = require('express');

const app = require('express')();

const path = require('path');

const route = require('./routes/index');

const jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');
const fs = require('fs')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var session = require('express-session');

const redis = require('redis');

const redisClient = redis.createClient(6379);
var redisStore= require('connect-redis')(session)

redisClient.on('error',(error)=>{
  console.log('Redis Error',error)
})
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false,maxAge: 115000 },
  store: new redisStore({host:'localhost',port:'6379',client:redisClient,ttl:86400})
}))

const { Client } = require('pg');
const { result } = require('lodash');
/* var con = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'bbcv',
  password: '19121998',
  port: 5432,
})
con.connect();
con.query("INSERT INTO user_account(user_name, email) values('Ted',12)")
 */
//route init
route(app);
var oj1 ={ a: '32',b:'as',c:'asd'}
var oj2 = {...oj1};


console.log(oj2);
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'testbbcvreal@gmail.com',
    pass: 'calmdown'
  }
});
app.post('/sendemail',function (req,res) {
  let random =Math.floor(Math.random() * 100000) + 1;
  
  let test = req.get('')
  var mailOptions = {
    from: 'testbbcvreal@gmail.com',
    to: req.body.email,
    subject: 'Sending Email using Node.js',
    text: `${random}`
  };

  })
app.get('/send',function(req,res){
        rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link="http://"+req.get('host')+"/verify?id="+rand;
    mailOptions={
        to : req.query.to,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
});
app.get('/verify',function(req,res){
  console.log(req.protocol+":/"+req.get('host'));
  if((req.protocol+"://"+req.get('host'))==("http://"+host))
  {
      console.log("Domain is matched. Information is from Authentic email");
      if(req.query.id==rand)
      {
          console.log("email is verified");
          res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
      }
      else
      {
          console.log("email is not verified");
          res.end("<h1>Bad Request</h1>");
      }
  }
  else
  {
      res.end("<h1>Request is from unknown source");
  }
  });
/* var wkhtmltopdf = require('wkhtmltopdf');
app.post('/pdf',function(req,res){
  wkhtmltopdf.command = "C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe"
  wkhtmltopdf('https://www.facebook.com/wtrudg/', { output: 'tn.pdf' });
})
app.get('/download',function(req,res){
  res.sendFile(__dirname+"/test.html")
})
app.post('/download',function(req,res){
  console.log(req.body.email)
}) */
app.listen('3000',()=>{
  console.log('3000')
})
















// tạo private key và public key để xác thực token
/* var privateKey = fs.readFileSync('./key/private.pem')
var publicKey = fs.readFileSync('./key/publickey.crt')
var token = jwt.sign({Name: 'Trung Nguyen'},privateKey,{algorithm:'RS256'})

let reuslt = jwt.verify(token,publicKey,{algorithms:['RS256']},function(err,data){
  console.log(err);
  console.log(data);
})
 */
/* app.get('/demo',(req,res)=>{
    if (req.session.views) {
        req.session.views++
        res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
      } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
      }
    
}) */