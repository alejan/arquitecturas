var mongoose = require('mongoose');

var latidoEventSchema = new mongoose.Schema({
	idMascota: {type: String, required: true},
	idCollar: {type: String, required: true},
	idUsuario: {type: String, required: true},
    latido: {type: Number, required: true},
    fecha: {type: Date, required:true}
});

mongoose.model('latidoEvent', latidoEventSchema);