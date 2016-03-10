var mongoose = require('mongoose');
var positionEvent = mongoose.model('PositionEvent');
var latidoEvent = mongoose.model('latidoEvent');
var localizacionEvent = mongoose.model('localizacionEvent');
var respiracionEvent = mongoose.model('respiracionEvent');
var mascotas = mongoose.model('mascota');
var zonasSegura = mongoose.model('zonaSegura');

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

//Eventos sobre latidos
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

module.exports.latidoEventValidate = function(data){
	mascotas.findOne({idMascota: data.idMascota, idCollar: data.idCollar, idUsuario: data.idUsuario}).stream()
	   .on('data', function(mascota){
		    //handle mascota
		   if (data.latido >= mascota.maxLatido){
			   console.log('se debe enviar notificacion latido');
		   }
		   else {
			   console.log('no se debe enviar notificacion latido');
		   }
		  })
		  .on('error', function(err){
		    // handle error
		  })
		  .on('end', function(){
		    // final callback
		  });
};

//Eventos sobre localizacion
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

module.exports.localizacionEventValidate = function(data){
	zonasSegura.findOne({idMascota: data.idMascota, idCollar: data.idCollar, idUsuario: data.idUsuario}).stream()
	   .on('data', function(zonaSegura){
		    //handle mascota
		   console.log(zonaSegura.p1X);
		   console.log(zonaSegura.p2X);
		   console.log(zonaSegura.p3Y);
		   console.log(zonaSegura.p1X <= data.latitud);
		   console.log(zonaSegura.p2X >= data.latitud);
		   console.log(zonaSegura.p1X <= data.latitud);
		   if (zonaSegura.p1X <= data.latitud && zonaSegura.p2X >= data.latitud && zonaSegura.p1Y <= data.longitud && zonaSegura.p3Y >= data.longitud){
			   console.log('no se debe enviar notificacion localizacion');
		   }
		   else {
			   console.log('se debe enviar notificacion localizacion');
		   }
		  })
		  .on('error', function(err){
		    // handle error
		  })
		  .on('end', function(){
		    // final callback
		  });
};

//Eventos sobre respiracion
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

module.exports.respiracionEventValidate = function(data){
	mascotas.findOne({idMascota: data.idMascota, idCollar: data.idCollar, idUsuario: data.idUsuario}).stream()
	   .on('data', function(mascota){
		    //handle mascota
		   if (data.respiracion >= mascota.maxRespiracion){
			   console.log('se debe enviar notificacion respiracion');
		   }
		   else {
			   console.log('no se debe enviar notificacion respiracion');
		   }
		  })
		  .on('error', function(err){
		    // handle error
		  })
		  .on('end', function(){
		    // final callback
		  });
};
