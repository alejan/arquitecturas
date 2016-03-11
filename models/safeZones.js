
var mongoose = require('mongoose');

var geoPolygonSchema = new mongoose.Schema({
    type: {type: String, default: "MultiPolygon"},
    coordinates: {type: []},
});

var safeZoneSchema = new mongoose.Schema({
    petName: {type: String, required: true, index: true},
    geoPoly: {type: geoPolygonSchema},
});

mongoose.model('SafeZone', safeZoneSchema);
