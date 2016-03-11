
var mongoose = require('mongoose');
var positionEvent = mongoose.model('PositionEvent');

var safezone = mongoose.model('SafeZone');

var turf = require('turf');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

module.exports = {
    safeZoneCreate:  function(req, res){
        safezone.create({
            petName: "temp",
            geoPoly: {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Polygon",
                "coordinates":[
                //aproximadamente las cuatro esquinas del ML
                //latitude, longitude (orden de google maps)
                //4.602301, -74.064673
                //4.602833, -74.064426
                //4.602832, -74.064416
                //4.603182, -74.064966

                //orden mongo (longitud, latitud)
                [
                    [-74.064673, 4.602301],
                    [-74.064426, 4.602833],
                    [-74.064965, 4.603183],
                    [-74.065287, 4.602720],
                    [-74.064673, 4.602301]

                ]]
              }
            }

        }, function(err, data){
            if(err){
                sendJsonResponse(res, 400, err);
            } else {
                console.log("saved data");
                sendJsonResponse(res, 201, data);
            }
        });

    },

//Servicio REST para pruebas
    positionEventCreate: function(req, res){

        positionEvent.create({
            petName: "temp",
            coords: [parseFloat(10), parseFloat(20)],
        }, function(err, location){
            if(err){
                sendJsonResponse(res, 400, err);
            } else {
                console.log("saved data");
                sendJsonResponse(res, 201, location);
            }
        });


        safezone.findOne({petName: "temp"}, function(err, data){
          if(!err){
            var pt1 = {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-74.064834, 4.602736]
              }
            };
            var pt2 = {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-74.065539, 4.602977]
              }
            };
            var poly = data.geoPoly;
            
            var features = {
              "type": "FeatureCollection",
              "features": [pt1, pt2, poly]
            };

            var isInside1 = turf.inside(pt1, poly);
            var isInside2 = turf.inside(pt2, poly);
            console.log('Is inside ok 1:' + isInside1 + ", is inside 2: " +isInside2);
          }
        });




    }



};
