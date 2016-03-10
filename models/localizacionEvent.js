var mongoose = require('mongoose');

var localizacionEventSchema = new mongoose.Schema({
	idMascota: {type: String, required: true},
	idCollar: {type: String, required: true},
	idUsuario: {type: String, required: true},
    latitud: {type: Number, required: true},
	longitud: {type: Number, required: true},
    fecha: {type: Date, required:true}
});

mongoose.model('localizacionEvent', localizacionEventSchema);