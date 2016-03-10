
var mongoose = require('mongoose');

var safeZoneSchema = new mongoose.Schema({
    petName: {type: String, required: true, index: true},
    boundary: {type: []},
});

mongoose.model('SafeZone', safeZoneSchema);
