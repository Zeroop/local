const register = require('../controllers/register.controller')
const login = require('../controllers/login.controller') 
const test = require('../controllers/test')
function route(app){
	app.post('/register',register);
	app.post('/login',login); 
	app.post('/test',test)
}

module.exports = route;
