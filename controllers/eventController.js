var mongoose = require('mongoose');
var positionEvent = mongoose.model('PositionEvent');
var latidoEvent = mongoose.model('latidoEvent');
var localizacionEvent = mongoose.model('localizacionEvent');
var respiracionEvent = mongoose.model('respiracionEvent');
var mascotas = mongoose.model('mascota');
var zonasSegura = mongoose.model('zonaSegura');
var usuarios = mongoose.model('usuario');
var client = require('twilio')('AC5f5105e0dc8e3aeecab0d1f2d9f0fabediego','dfi4e6g2oc595a19f1061cca71631ab6ed954');

var sendJsonResponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

var self = module.exports = {
	positionEventCreate: function(req, res){
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

	},
	latidoEventCreate: function(data){
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
		usuarios.create({
			idUsuario: '4',
			phone: '+573186803203',
		}, function(err, location){
			if(err){
				console.log("saved data latido ERR");
			} else {
				console.log("saved data latido OK");
			}
		});
	},
	latidoEventValidate: function(data, callback){
        mascotas.findOne({idMascota: data.idMascota, idCollar: data.idCollar, idUsuario: data.idUsuario}).stream()
            .on('data', function(mascota){
                //handle mascota
                if (data.latido >= mascota.maxLatido){
                    console.log('se debe enviar notificacion latido');
                    //self.sendMessageTwilio(data,'Su mascota ha muerto de un paro cardiaco');
                }
                else {
                    console.log('no se debe enviar notificacion latido');
                }
            })
            .on('error', function(err){
                // handle error
            	console.log('error latido validate');
            })
            .on('end', function(){
                // final callback
            	console.log('terminar latido validate');
				callback();
            });
    },
	localizacionEventCreate: function(data){
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
	},

	respiracionEventCreate: function(data){
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
	},
	localizacionEventValidate: function(data, callback){
        zonasSegura.findOne({idMascota: data.idMascota, idCollar: data.idCollar, idUsuario: data.idUsuario}).stream()
            .on('data', function(zonaSegura){
                //handle mascota
                if (zonaSegura.p1X <= data.latitud && zonaSegura.p2X >= data.latitud && zonaSegura.p1Y <= data.longitud && zonaSegura.p3Y >= data.longitud){
                    console.log('no se debe enviar notificacion localizacion');
                }
                else {
					console.log('se debe enviar notificacion localizacion');
                    //self.sendMessageTwilio(data,'Su mascota ha sido secuestrada');
                }
            })
            .on('error', function(err){
                // handle error
            })
            .on('end', function(){
                // final callback
				console.log('terminar respiracion validate');
				callback();
            });
    },
	localizacionEventVer: function(data, callback){
		var localizacionRetorno;
        localizacionEvent.find({idMascota: data.idMascota, idCollar: data.idCollar, idUsuario: data.idUsuario}).sort({fecha:-1}).limit(1).stream()
            .on('data', function(localizacionVer){
				localizacionRetorno = localizacionVer;
				//console.log('evento de localizacionver hecho ' + localizacionVer.idMascota);
            })
            .on('error', function(err){
                // handle error
            })
            .on('end', function(){
                // final callback
				callback(localizacionRetorno);
            });
    },
    respiracionEventValidate: function(data, callback){
        mascotas.findOne({idMascota: data.idMascota, idCollar: data.idCollar, idUsuario: data.idUsuario}).stream()
           .on('data', function(mascota){
                //handle mascota
               if (data.respiracion >= mascota.maxRespiracion){
                   console.log('se debe enviar notificacion respiracion');
                   //self.sendMessageTwilio(data,'Su mascota ha muerto por asfixia');
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
				console.log('terminar respiracion validate');
				callback();
              });
    },

    sendMessageTwilio: function(data, message){
        usuarios.findOne({idUsuario: data.idUsuario}).stream()
        .on('data', function(usuario){
	  	  	  client.sendMessage({
				  to: usuario.phone,
				  from: '+19892444381',
				  body: message
			  }, function(err, data){
				  if (err){
					  console.log(err);
				  }
			  });
           })
           .on('error', function(err){
             // handle error
           })
           .on('end', function(){
             // final callback
           });
    }
};
