
var socket = io.connect('http://localhost:3000', { 'forceNew': true });

socket.on('messagesLatido', function(data) {  
  console.log(data);
  render(data);
})

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


    var message = {
    idMascota: document.getElementById('IdMascota').value,
    idCollar: document.getElementById('IdCollar').value,
	idUsuario: document.getElementById('IdUsuario').value,
	latido: document.getElementById('Latido').value,
	fecha: document.getElementById('Fecha').value
  };

  socket.emit('new-messageLatido', message);
  return false;
}