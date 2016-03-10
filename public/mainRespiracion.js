var socket = io.connect('http://localhost:3000', { 'forceNew': true });

socket.on('messagesRespiracion', function(data) {  
  console.log(data);
  render(data);
})

function render (data) {  
  var html = data.map(function(elem, index) {
    return(`<div>
              <strong>${elem.idMascota}</strong>:
              <em>${elem.idCollar}</em>
			  <em>${elem.idUsuario}</em>
			  <em>${elem.respiracion}</em>
			  <em>${elem.fecha}</em>
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {  
  var message = {
    idMascota: document.getElementById('IdMascota').value,
    idCollar: document.getElementById('IdCollar').value,
	idUsuario: document.getElementById('IdUsuario').value,
	respiracion: document.getElementById('Respiracion').value,
	fecha: document.getElementById('Fecha').value
  };

  socket.emit('new-messageRespiracion', message);
  return false;
}