var model = require('../models/dbPostgreSQL');
const jwt = require('jsonwebtoken');
const fs = require('fs')
var privateKey = 'alo'
var db = new model()

function login(req,res){
	const entity = {
		username: req.body.username,
		fullname: req.body.fullname,
		email: req.body.email,
		phonenumbers: req.body.phonenumbers,
		password: req.body.password
	}
	db.checkLogin(entity, function (user_id,role) {
		if(user_id){
			var token = jwt.sign({user_id: user_id },privateKey,{algorithm:'RS256'})
			res.setHeader('Content-Type', 'text/html');
			res.setHeader('Token', `${token}`);
			res.setHeader('Role',`${role}`); 
			res.writeHead(200,{'Content-Type': 'text/plain' })
		}else{
			res.send('Message: Not exist user')
		} 
	})
}

module.exports = login;