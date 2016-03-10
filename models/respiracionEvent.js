var mongoose = require('mongoose');

var respiracionEventSchema = new mongoose.Schema({
	idMascota: {type: String, required: true},
	idCollar: {type: String, required: true},
	idUsuario: {type: String, required: true},
    respiracion: {type: Number, required: true},
    fecha: {type: Date, required:true}
});

mongoose.model('respiracionEvent', respiracionEventSchema);