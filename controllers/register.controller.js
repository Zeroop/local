var model = require('../models/dbPostgreSQL');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const fs = require('fs');
const { user } = require('../config/postgreSQL');
var privateKey = 'alo'

var db = new model()

function register(req,res){
	  
		var hash = bcrypt.hashSync(req.body.password, 8);
		const entity = {...req.body}
		entity.password = hash;
		console.log(entity)
		db.checkExistByUserName(entity, (result) => {
		   if (result) {
				  db.register(entity, (user_id) => {
					var token = jwt.sign({user_id: user_id },'trungnguyen',{algorithm:'RS256'})
					res.setHeader('Content-Type', 'text/html');
					res.setHeader('Token', `${token}`);
					res.setHeader('Role',`${entity.role}`); 
					res.writeHead(200,{'Content-Type': 'text/plain' })
				});  
			} else {
				res.status(400).json('Invalid username/password supplied');
			}  
		});   
}

module.exports = register;
