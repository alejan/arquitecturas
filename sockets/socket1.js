var nr = require('newrelic');
var Repeat = require('repeat');
var ctrEvents = require('../controllers/eventController');

var messagesLatido = [{
  idMascota: "1",
  idCollar: "1",
  idUsuario: "1",
  latido: "15",
  fecha: "2016/01/01 13:01:01"
}];

var messagesRespiracion = [{
  idMascota: "1",
  idCollar: "1",
  idUsuario: "1",
  respiracion: "150",
  fecha: "2016/01/01"
}];

var messagesLocalizacion = [{
  idMascota: "1",
  idCollar: "1",
  idUsuario: "1",
  latitud: "1500",
  longitud: "2500",
  fecha: "2016/01/01 13:09:09"
}];

var messagesVerLocalizacion = [{
	  idMascota: "1",
	  idCollar: "1",
	  idUsuario: "1",
	  latitud: "0",
	  longitud: "0",
	  fecha: "2016/01/01 13:09:09"
	}];

var messages = [{
  id: 1,
  text: "Hola soy un mensaje",
  author: "Carlos Azaustre"
}];

exports.init = function(io){
	io.on('connection', function(socket) {
		  console.log('Alguien se ha conectado con Sockets');

      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
		  //socket.emit('messages', messages);
		  //socket.emit('messagesLatido', messagesLatido);
		  //socket.emit('messagesRespiracion', messagesRespiracion);
		  //socket.emit('messagesLocalizacion', messagesLocalizacion);

		  socket.on('new-message', function(data) {
		    messages.push(data);

			io.sockets.emit('messages', messages);
		    //io.sockets.emit('messages', messages);


		  });
      socket.on('new-messageLatido', nr.createWebTransaction('/ws/new-messageLatido' ,function(data) {
			  console.log('entro a latido');
			  //messagesLatido.push(data);

	    ctrEvents.latidoEventCreate(data);

			ctrEvents.latidoEventValidate(data,function(){
				socket.emit('messagesLatidoRespuesta', {respuesta:'OKLATIDO'});
        nr.endTransaction();
        console.log('terminó new-messageLatido transacción');
			})
			//io.sockets.emit('messagesLatido', messagesLatido);
		    //socket.emit('messagesLatido', messagesLatido);

		  }));

		  socket.on('new-messageRespiracion', function(data) {
		    //messagesRespiracion.push(data);

		    ctrEvents.respiracionEventCreate(data);
			ctrEvents.respiracionEventValidate(data,function(){
				socket.emit('messagesRespiracionRespuesta', {respuesta:'OKRESPIRACION'});
				 //nr.endTransaction();
			});
		    //ctrEvents.respiracionEventValidate(data);
		    //ctrEvents.respiracionEventValidate(data);

			//io.sockets.emit('messagesRespiracion', messagesRespiracion);
		    //socket.emit('messagesRespiracion', messagesRespiracion);
		    socket.emit('messagesRespiracionRespuesta', {respuesta:'OKRESPIRACION'});
		  });

      socket.on('new-messageLocalizacion', nr.createWebTransaction('/ws/new-messageLocalizacion' ,function(data) {

		    ctrEvents.localizacionEventCreate(data);
		    //ctrEvents.localizacionEventValidate(data);


			ctrEvents.respiracionEventValidate(data,function(){
  				socket.emit('messagesLocalizacionRespuesta', {respuesta:'OKLOCALIZACION'});
  				nr.endTransaction();
          console.log('terminó new-messageLocalizacion transacción');
			   });
		    //socket.emit('messagesLocalizacionRespuesta', {respuesta:'OKLOCALIZACION'});
		  }));

      socket.on('new-messageVerLocalizacion', nr.createWebTransaction('/ws/new-messageVerLocalizacion' ,function(data) {

			  var i = 0;
			  Repeat( function verLocalizacion() {

				ctrEvents.localizacionEventVer(data,function(localizacionRetorno){
					// if ( typeof localizacionRetorno !== 'undefined' ){
					// 	console.log('Retorno el valor de ' +  localizacionRetorno.idMascota);
					// 	messagesVerLocalizacion.push(localizacionRetorno);
					// }
					// else {
					// 	console.log('Retorno ningun registro ');
					// 	messagesVerLocalizacion.push(data);
					// }

					socket.emit('messagesVerLocalizacionRespuesta', messagesVerLocalizacion);
					//socket.emit('messagesVerLocalizacionRespuesta', {respuesta:'OKVERLOCALIZACION'});
					i = i + 1;
          nr.endTransaction();
          console.log('terminó new-VerLocalizacion transacción');
				});

			  }).every(200, 'ms').for(300, 'sec').start.in(0, 'm');
		  }));

		});
};
