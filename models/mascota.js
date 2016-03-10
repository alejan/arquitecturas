
var mongoose = require('mongoose');

var mascotaSchema = new mongoose.Schema({
	idMascota: {type: String, required: true},
	idCollar: {type: String, required: true},
	idUsuario: {type: String, required: true},
    maxLatido: {type: Number, required: true},
    maxRespiracion: {type: Number, required: true}
});

mongoose.model('mascota', mascotaSchema);
