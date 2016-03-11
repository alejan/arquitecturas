
var mongoose = require('mongoose');

var usuarioSchema = new mongoose.Schema({
	idUsuario: {type: String, required: true},
	phone: {type: String, required: true}
});

mongoose.model('usuario', usuarioSchema);
