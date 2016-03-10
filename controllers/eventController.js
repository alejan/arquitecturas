var mongoose = require('mongoose');
var positionEvent = mongoose.model('PositionEvent');
var latidoEvent = mongoose.model('latidoEvent');
var localizacionEvent = mongoose.model('localizacionEvent');
var respiracionEvent = mongoose.model('respiracionEvent');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

module.exports.positionEventCreate = function(req, res){
	  positionEvent.create({
	        petName: "temp",
	        coords: [parseFloat(10), parseFloat(20)],
	    }, function(err, location){
	        if(err){
	            sendJsonResponse(res, 400, err);
	        } else {
	            console.log("saved data");
	            sendJsonResponse(res, 201, location);
	        }
	    });

	};

module.exports.latidoEventCreate = function(data){
	latidoEvent.create({
	  idMascota: data.idMascota,
	  idCollar: data.idCollar,
	  idUsuario: data.idUsuario,
	  latido: data.latido,
	  fecha: data.fecha
    }, function(err, location){
        if(err){
            console.log("saved data latido ERR");
        } else {
            console.log("saved data latido OK");
        }
    });
};

module.exports.localizacionEventCreate = function(data){
	localizacionEvent.create({
	  idMascota: data.idMascota,
	  idCollar: data.idCollar,
	  idUsuario: data.idUsuario,
	  latitud: data.latitud,
	  longitud: data.longitud,
	  fecha: data.fecha
	}, function(err, location){
        if(err){
            console.log("saved data localizacion ERR");
        } else {
            console.log("saved data localizacion OK");
        }
	});
};

module.exports.respiracionEventCreate = function(data){
	respiracionEvent.create({
	  idMascota: data.idMascota,
	  idCollar: data.idCollar,
	  idUsuario: data.idUsuario,
	  respiracion: data.respiracion,
	  fecha: data.fecha
    }, function(err, location){
        if(err){
            console.log("saved data respiracion ERR");
        } else {
            console.log("saved data respiracion OK");
        }
    });
};
