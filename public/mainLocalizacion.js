
var socket = io.connect('http://localhost:3000', { 'forceNew': true });

socket.on('messagesLocalizacion', function(data) {  
  console.log(data);
  render(data);
})

socket.on('messagesLocalizacionRespuesta', function(data) {  
  console.log(data);
  renderRespuesta(data);
})

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
			  <em>${elem.latitud}</em>
			  <em>${elem.longitud}</em>
			  <em>${elem.fecha}</em>
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}


function addLocalizacion(e) {
	a = new Date();
	
    var message = {
    idMascota: document.getElementById('IdMascota').value,
    idCollar: document.getElementById('IdCollar').value,
	idUsuario: document.getElementById('IdUsuario').value,
	latitud: document.getElementById('Latitud').value,
	longitud: document.getElementById('Longitud').value,
	fecha: a.format ("%Y-%m-%d %H:%M:%S", false)
  };

  socket.emit('new-messageLocalizacion', message);
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