
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

var messages = [{  
  id: 1,
  text: "Hola soy un mensaje",
  author: "Carlos Azaustre"
}];

exports = module.exports = function(io){
	io.on('connection', function(socket) {  
		  console.log('Alguien se ha conectado con Sockets');
		  //socket.emit('messages', messages);
		  //socket.emit('messagesLatido', messagesLatido);
		  //socket.emit('messagesRespiracion', messagesRespiracion);
		  //socket.emit('messagesLocalizacion', messagesLocalizacion);

		  socket.on('new-message', function(data) {
		    messages.push(data);

			//io.sockets.emit('messages', messages);
		    //io.sockets.emit('messages', messages);
		  });
		  
		  socket.on('new-messageLatido', function(data) {
			  console.log('entro a latido');
			  //messagesLatido.push(data);
		    
		    ctrEvents.latidoEventCreate(data);
		    ctrEvents.latidoEventValidate(data);
		    
			//io.sockets.emit('messagesLatido', messagesLatido);
		    //socket.emit('messagesLatido', messagesLatido);
		    socket.emit('messagesLatidoRespuesta', {respuesta:'OKLATIDO'});
		  });

		  socket.on('new-messageRespiracion', function(data) {
		    //messagesRespiracion.push(data);
			
		    ctrEvents.respiracionEventCreate(data);
		    ctrEvents.respiracionEventValidate(data);
		    
			//io.sockets.emit('messagesRespiracion', messagesRespiracion);
		    //socket.emit('messagesRespiracion', messagesRespiracion);
		    socket.emit('messagesRespiracionRespuesta', {respuesta:'OKRESPIRACION'});
		  });  

		  socket.on('new-messageLocalizacion', function(data) {
		    //messagesLocalizacion.push(data);
			
		    ctrEvents.localizacionEventCreate(data);
		    ctrEvents.localizacionEventValidate(data);
		    
			//io.sockets.emit('messagesLocalizacion', messagesLocalizacion);
		    //socket.emit('messagesLocalizacion', messagesLocalizacion);
		    socket.emit('messagesLocalizacionRespuesta', {respuesta:'OKLOCALIZACION'});
		  });  
		});  
};
