/**
 * Created by jasmo2 on 2/24/16.
 *  github_user jasmo2
 */

// =================================================================
// Pacakges needed ========================================
// =================================================================
var express = require('express');
var console = require('better-console');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var favicon = require('serve-favicon');
var morgan = require('morgan');
//var fs = require('fs');


var mongoPass = process.env.ABCPPETS_PASS;
var mongoHost = "localhost";
var mongoUser = process.env.ABCPPETS_USER;
var mongoPort = '27017';
var mongoDB = 'abc_pets_'+process.env.NODE_ENV;

mongoose.connect('mongodb://'+mongoUser+':'+mongoPass+'@'+mongoHost+':'+mongoPort+'/'+mongoDB);



// =================================================================
// body-parser ===========================================
// =================================================================
var app = express();

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

// =================================================================
// Routes =============================================
// =================================================================

var router = express.Router();

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
// router.use(middlewares.authenticate);
// ---------------------------------------------------------
// routes with authentication needed
// ---------------------------------------------------------







// =================================================================
// Enviroment =============================================
// =================================================================
var port = process.env.PORT || 8000;


// Register all our routes with /api
app.use('/api', router);


// Start the server
app.listen(port);
console.info('App runing in por: ' + port);

// =================================================================
// Sockets =============================================
// =================================================================
var io = require('socket.io')(app);	//Binds socket to http server
var socket1 = require("./sockets/socket1")(io);
