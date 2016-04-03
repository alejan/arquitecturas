<<<<<<< HEAD
$(document).ready(function() {

  $('myform').submit(function(){
    addVerLocalizacion();
  });
  var publicip = 'ws://localhost:3000';
  //var socket = io.connect(publicip, { 'forceNew': true });
  var socket = io('ws://localhost:3000');


  socket.on('messagesVerLocalizacion', function(data) {
    console.log(data);
    render(data);
  });

  socket.on('messagesVerLocalizacionRespuesta', function(data) {
    console.log(data);
    //renderRespuesta(data);
    //render(data);

  });

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
  			  <em>${elem.fecha}</em>
              </div>`);
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
  }


  function addVerLocalizacion(e) {
  	a = new Date();

      var message = {
      idMascota: document.getElementById('IdMascota').value,
      idCollar: document.getElementById('IdCollar').value,
  	idUsuario: document.getElementById('IdUsuario').value,
  	fecha: a.format ("%Y-%m-%d %H:%M:%S", false)
    };

    socket.emit('new-messageVerLocalizacion', message);
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


  $(window).on('beforeunload', function(){
      socket.close();
  });
});
=======
var publicip = 'http://localhost:3000';
var socket = io.connect(publicip, { 'forceNew': true });

socket.on('messagesVerLocalizacion', function(data) {  
  console.log(data);
  render(data);
})

socket.on('messagesVerLocalizacionRespuesta', function(data) {  
  console.log(data);
  renderRespuesta(data);
  //render(data);
  
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


function addVerLocalizacion(e) {
	a = new Date();
	
    var message = {
    idMascota: document.getElementById('IdMascota').value,
    idCollar: document.getElementById('IdCollar').value,
	idUsuario: document.getElementById('IdUsuario').value,
	latitud: 0,
	longitud: 0,
	fecha: a.format ("%Y-%m-%d %H:%M:%S", false)
  };

  socket.emit('new-messageVerLocalizacion', message);
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
>>>>>>> ea4fc077ac918febf19a20a6feb467c34a267a43
