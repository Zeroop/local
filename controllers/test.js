var model = require('../models/dbPostgreSQL');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const fs = require('fs')


var db = new model()

function test(req,res){
       
        
        db.test();
}

module.exports = test;