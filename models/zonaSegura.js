var mongoose = require('mongoose');

var zonaSeguraSchema = new mongoose.Schema({
	idMascota: {type: String, required: true},
	idCollar: {type: String, required: true},
	idUsuario: {type: String, required: true},
	p1X: {type: Number, required: true},
	p1Y: {type: Number, required: true},
	p2X: {type: Number, required: true},
	p2Y: {type: Number, required: true},
	p3X: {type: Number, required: true},
	p3Y: {type: Number, required: true},
	p4X: {type: Number, required: true},
	p4Y: {type: Number, required: true}
});

mongoose.model('zonaSegura', zonaSeguraSchema);
