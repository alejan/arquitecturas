
var mongoose = require('mongoose');

var dbUri = 'mongodb://localhost/abcpets';
if(process.env.NODE_ENV === 'production'){
    dbUri = process.env.MONGOLAB_URI;
}

//connect
mongoose.connect(dbUri);

//mongoose events
mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to: ' + dbUri);
});
mongoose.connection.on('error', function(err){
    console.log('connection error: ' + err);
});
mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});

var gracefullShutdown = function(msg, callback){
  mongoose.connection.close(function(){
      console.log('Mongoose disconnected through ' +  msg);
      callback();
  });
};

//Shutdown events
//Nodemon shutdown
process.once('SIGUSR2', function(){
    gracefullShutdown('nodemon restart', function(){
       process.kill(process.pid, 'SIGUSR2');
    });
});

//App termination
process.once('SIGINT', function(){
    gracefullShutdown('app termination', function(){
        process.exit(0);
    });
});

//Heroku shutdown
process.once('SIGTERM', function(){
    gracefullShutdown('Heroku app hutdown', function(){
        process.exit(0);
    });
});


require('./positionEvent');
require('./latidoEvent');
require('./localizacionEvent');
require('./respiracionEvent');
require('./mascota');
require('./zonaSegura');
require('./safeZones');
require('./usuario');
