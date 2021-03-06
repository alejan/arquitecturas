var publicip = 'https://localhost:3000';
//var socket = io.connect(publicip, { 'forceNew': true });
var socket //= io;


function renderRespuesta (data) {  
    var html = `<div>
              <strong>${data.respuesta}</strong>
            </div>`;

  document.getElementById('messagesrespuesta').innerHTML = html;
}

function render (data) {  
	  var html = data.map(function(elem, index) {
	    return(`<div>
	              <strong>${elem.idMascota}</strong>:
	              <em>${elem.idCollar}</em>
				  <em>${elem.idUsuario}</em>
				  <em>${elem.latido}</em>
				  <em>${elem.fecha}</em>
	            </div>`);
	  }).join(" ");

	  document.getElementById('messages').innerHTML = html;
}

function addLatidos(e) {
	a = new Date();
    var message = {
    idMascota: document.getElementById('IdMascota').value,
    idCollar: document.getElementById('IdCollar').value,
	idUsuario: document.getElementById('IdUsuario').value,
	latido: document.getElementById('Latido').value,
	fecha: a.format ("%Y-%m-%d %H:%M:%S", false)
  };
  socket.emit('new-messageLatido', message);
  //alert('MnesajeENviado');
  return false;
}

function flujoCompleto(e) {
	a = new Date();
    var message = {
    idMascota: document.getElementById('IdMascota').value,
    idCollar: document.getElementById('IdCollar').value,
	idUsuario: document.getElementById('IdUsuario').value,
	latido: document.getElementById('Latido').value,
	fecha: a.format ("%Y-%m-%d %H:%M:%S", false)
  };
  socket.emit('new-messageLatido', message);
  return false;
}

function desconectar(e) {
	//socket.disconnect();
	//socket.manager.onClientDisconnect(socket.id);
	socket.io.close();
	alert('usuarioDescionectado');
	return false;
}

function conectar(e) {
	var validToken = '';
	var invalidToken = 'invalidToken';
	var user = {
	  username: 'DIEGOHOYOS'
	};

	$.ajax({
	  type: 'POST',
	  url: 'https://localhost:3000/get/token',
	  data: user
	}).done(function (data) {
		validToken = data.token;		 
		socket = io.connect(publicip, {	'query': 'token=' + validToken, 'forceNew': false });
		//socket = io.connect(publicip, {	'forceNew': false });
	});

	return false;
}

Date.prototype.format = function(fstr, utc) {
	  var that = this;
	  utc = utc ? 'getUTC' : 'get';
	  return fstr.replace (/%[YmdHMS]/g, function (m) {
	    switch (m) {
	    case '%Y': return that[utc + 'FullYear'] ();
	    case '%m': m = 1 + that[utc + 'Month'] (); break;
	    case '%d': m = that[utc + 'Date'] (); break;
	    case '%H': m = that[utc + 'Hours'] (); break;
	    case '%M': m = that[utc + 'Minutes'] (); break;
	    case '%S': m = that[utc + 'Seconds'] (); break;
	    default: return m.slice (1);
	    }    
	    return ('0' + m).slice (-2);
	  });
}