
var mongoose = require('mongoose');

var positionEventSchema = new mongoose.Schema({
    petName: {type: String, required: true},
    coords: {type: [Number], index: '2dsphere'},
});

mongoose.model('PositionEvent', positionEventSchema);
