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

		  socket.on('new-messageLatido', function(data) {
			  console.log('entro a latido');
			  //messagesLatido.push(data);

		    ctrEvents.latidoEventCreate(data);

			//setTimeout(function() {
			//ctrEvents.latidoEventValidate(data,function(){
				//socket.emit('messagesLatidoRespuesta', {respuesta:'OKLATIDO'});
			//})
			//}, 10000);
			ctrEvents.latidoEventValidate(data,function(){
				socket.emit('messagesLatidoRespuesta', {respuesta:'OKLATIDO'});
				 //nr.endTransaction();
			});
			//io.sockets.emit('messagesLatido', messagesLatido);
		    //socket.emit('messagesLatido', messagesLatido);

		  });

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

		  socket.on('new-messageLocalizacion', function(data) {
		    //messagesLocalizacion.push(data);

		    ctrEvents.localizacionEventCreate(data);
		    //ctrEvents.localizacionEventValidate(data);

			//io.sockets.emit('messagesLocalizacion', messagesLocalizacion);
		    //socket.emit('messagesLocalizacion', messagesLocalizacion);
			ctrEvents.respiracionEventValidate(data,function(){
				socket.emit('messagesLocalizacionRespuesta', {respuesta:'OKLOCALIZACION'});
				//nr.endTransaction();
			});
		    //socket.emit('messagesLocalizacionRespuesta', {respuesta:'OKLOCALIZACION'});
		  });

		  socket.on('new-messageVerLocalizacion', function(data) {
			  var i = 0;
			  Repeat( function verLocalizacion() {
			  //messagesVerLocalizacion.push(data);
			  //setInterval(console.log('sdfsdfsdfsd'), 1000);
			  //socket.emit('messagesVerLocalizacionRespuesta', {respuesta:'OKVERLOCALIZACION'+i});
			  //Repeat(function sayHello() {
				//  console.log("enviar"+i);
			 // }).every(500, 'ms').for(2, 'minutes').start.in(5, 'sec');

       var last = ctrEvents.positionEventFindLast();
       //i = i + 1;

			  socket.emit('messagesVerLocalizacionRespuesta', last);

      }).every(10, 'ms').for(10, 'sec').start.in(0, 'm');

		  });

      socket.emit('messagesVerLocalizacionRespuesta', {"hello":"there"});
		});
};
