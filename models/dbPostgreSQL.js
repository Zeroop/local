
const e = require('express');
const { result } = require('lodash');
const { resumeDrain, user, password } = require('../config/postgreSQL');
const passport = require('passport')
const con = require('../config/postgreSQL');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const fs = require('fs');
var privateKey = 'alo'
function model() { };
model.prototype = {
	/* load : function(sql){
	   
		 return new Promise(function(resolve,reject){
			 pool.query(sql,function (err,result,fields){ 
				 if(err){
					 return reject(err);
				 }
				 resolve(result);
		 });
		  })
	 },
	 /* load : function(sql,fun_done,fun_fail){
		 pool.query(sql,function (err,result,fields){ 
			 if(err){
				 return fun_fail(err);
			 }
		   fun_done(result);
		  })
	 } */

	/*create: function(table,entity){
		return new Promise(function(resolve,reject){
			const sql =`insert into ${table} set?`
			pool.query(sql,entity,function (err,result){ 
				if(err){
					return reject(err);
				}
				resolve(result);
		});
		 })
	},*/
	/* test: async function (entity,callback) {
			let queryText = ` select role_id from role`;
			let result = await con.query(queryText);
			console.log(result.rows);
	  },*/
	checkLogin: async function (entity, callback) {
		
		let queryGetUserName= `select user_name from user_account where user_name= $1`
		let checkExistUN = await con.query(queryGetUserName,[entity.username]);
		if(checkExistUN.rowCount == 0){
			callback(null)
		}else{

			let queryGetPassWordHash= `select user_password from user_account where user_name= $1`
			let passwordHash = await (await con.query(queryGetPassWordHash,[entity.username])).rows[0].user_password;
			let checkPassWord = bcrypt.compareSync(entity.password, passwordHash);
			//return true or false
			if(checkPassWord){
				let queryGetUserID = `select user_id from user_account where user_name = $1`;
				let user_id = await (await con.query(queryGetUserID,[entity.username])).rows[0].user_id;
				let queryGetRole = `select role_id from user_role where user_id = $1`
				let role = await (await con.query(queryGetRole,[user_id])).rows[0].role_id
				callback(user_id,role)
			}
		}}, 


	/*  let rerult = bcrypt.compareSync("19121998", '$2a$08$vK3/Brq30u/jzDVaF0V8ROqiruk/YZIMvH3XcvNl4nYjRxJPVCizu');
	 console.log(rerult) */
	/* var hash = bcrypt.hashSync(req.body.password, 8)
	console.log(pwhash) */
	/* let queryCheckLG = "select user_id from user_account where user_name = $1 and user_password=$2"
	let result =  await con.query(queryCheckLG,[entity.username,'$2a$10$FsxLLafyPi4sL6bclVTtyOkqcey.Hyst7jlBXA0ViZ2lp/V.YHPsS']) 
	console.log(result) */
	/*  const sql = `select user_id from user_account where user_name= '${entity.username}' and user_password= '${entity.password}'`;
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		//check exist data
		if (result.length > 0) {
			console.log(result[0]); = RowDataPacket { user_id: 1 }
			callback(result[0].user_id);
		} else {
			callback(null);
		}
	}) 
},*/
	register: async function (entity, callback) {
		let now = new Date()
		let queryTextUC = `insert into user_account(user_name,user_password,phone_numbers,email,create_at) values($1,$2,$3,$4,$5) RETURNING user_id `
		let result = await con.query(queryTextUC, [entity.username, entity.password, entity.phonenumbers, entity.email, now])
		let user_id = result.rows[0].user_id
		switch (entity.role) {
			case 'user': let queryInsertRoleUser = ` insert into user_role(role_id,user_id,create_at) values($1,$2,$3)`
				await con.query(queryInsertRoleUser, [1, user_id, now])
				break;
			case 'admin': let queryInsertRoleAdmin = ` insert into user_role(role_id,user_id,create_at) values($1,$2,$3)`
				await con.query(queryInsertRoleAdmin, [1, user_id, now])
				break;
			case 'company': let queryInsertRoleCompany = `insert into user_role(role_id,user_id,create_at) values($1,$2,$3)`
				await con.query(queryInsertRoleCompany, [3, user_id, now])
				break;
		}

		callback(user_id)



	},
	resetPassword: async function (entity, callback) {

	},
	checkExistByUserName: async function (entity, callback) {
	   
		 const queryText = `select user_id from user_account where user_name= '${entity.username}' `;

		let result =await con.query(queryText)
		if(result.rowCount==1){
			callback(null)
		}else(callback(true)); 
		
	},
	checkExistByEmail: async function (entity, callback) {
	   
		 const queryText = `select user_id from user_account where user_name= '${entity.email}' `;

		let result =await con.query(queryText)
		if(result.rowCount==1){
			callback(null)
		}else(callback(true)); 
		
	}

	/* 
	checkRole: function (user_id, callback) {
		const sql = `select role_id from user_role where user_id`;
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			callback(result);
		})
	},

	showListAccount: function (callback) {
		const sql = 'select * from user_account';
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			callback(result)
		})
	},
	deleteUserAccount: function (user_id, callback) {
		const sql = `delete from user_account where user_id=${user_id}`;
		con.query(sql, function (err, result, fields) {
			if (err) throw err;
			callback(result);
		})
	} *//* ,
	 addNewCvRTemplate: function (entity,callback) {
		 const sql=`insert into user_account(user_name,user_password,phone_numbers,email,permission,fullname_user) values('${entity.username}','${entity.password}','${entity.phonenumbers}','${entity.email}','0','${entity.fullname}')`
		 
		 const sql=`insert into cv_template(location,user_password,phone_numbers,email,permission,fullname_user) values('${entity.username}','${entity.password}','${entity.phonenumbers}','${entity.email}','0','${entity.fullname}')`
 
	   }  */

};
module.exports = model;