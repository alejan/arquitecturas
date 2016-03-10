var socket = io.connect('http://localhost:3000', { 'forceNew': true });

socket.on('messagesLocalizacion', function(data) {  
  console.log(data);
  render(data);
})

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
    e.preventDefault();

    var message = {
    idMascota: document.getElementById('IdMascota').value,
    idCollar: document.getElementById('IdCollar').value,
	idUsuario: document.getElementById('IdUsuario').value,
	latitud: document.getElementById('Latitud').value,
	longitud: document.getElementById('Longitud').value,
	fecha: document.getElementById('Fecha').value
  };

  socket.emit('new-messageLocalizacion', message);
  return false;
}