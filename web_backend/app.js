var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var redis = require('redis');
var jwt = require('jwt-simple');
var db;

//create sql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'swc'
});

//use model for user info
var User = require('./models/userModel');
var port = 3000;

//set token secret
app.set('jwtSecret', '324b23hjr4h23jjr4hr42');

//using body parser for parsing json code
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes for handling requests
var userRouter = require('./routes/userRoutes')(app, User, connection, jwt);
var cacheRouter = require('./routes/cacheRoutes')();

//registering routes
app.use('/api/user', userRouter);
app.use('/api/cache', cacheRouter);

app.get('/', function (req, res) {
    res.send("Test URL");
});

app.listen(port, function () {
    console.log('Running on PORT' + port);
});

module.exports = app;

