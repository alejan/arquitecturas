
var mongoose = require('mongoose');

var geometrySchema = new mongoose.Schema({
    type: {type: String, default: "Polygon"},
    coordinates: {type: []},
});

var geoPolygonSchema = new mongoose.Schema({
    type: {type: String, default: "Feature"},
    geometry: geometrySchema
});

var safeZoneSchema = new mongoose.Schema({
    petName: {type: String, required: true, index: true},
    geoPoly: {type: geoPolygonSchema},
});

mongoose.model('SafeZone', safeZoneSchema);
