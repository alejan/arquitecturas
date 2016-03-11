
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
            petName: "pet",
            geoPoly: {
              "type": "MultiPolygon",
              "coordinates":[
                //aproximadamente las cuatro esquinas del ML
                //latitude, longitude (orden de google maps)
                //4.602301, -74.064673
                //4.602833, -74.064426
                //4.602832, -74.064416
                //4.603182, -74.064966

                //orden mongo (longitud, latitud)
                [
                  //AU
                  [ [-74.066180, 4.602432],
                    [-74.066019, 4.602814],
                    [-74.066529, 4.602843],
                    [-74.066864, 4.602736],
                    [-74.066805, 4.602610],
                    [-74.066180, 4.602432]
                  ],
                  //ML
                  [ [-74.064673, 4.602301],
                    [-74.064426, 4.602833],
                    [-74.064965, 4.603183],
                    [-74.065287, 4.602720],
                    [-74.064673, 4.602301]
                  ],


                ]
              ]
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

        var petName = req.body.petName;
        var longitude = parseFloat(req.body.longitude);
        var latitude = parseFloat(req.body.latitude);

        positionEvent.create({
            petName: petName,
            coords: [longitude, latitude],
        }, function(err, location){
            if(err){
                console.log(err);
            } else {
                console.log("saved data");
            }
        });


        safezone.findOne({petName: petName}, function(err, data){
          if(err){
            sendJsonResponse(res, 400, err);
          }
          else{
            var pt1 = {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                //corrdenada dentro del ML: [-74.064862, 4.602737]
                "coordinates": [longitude, latitude]
              }
            };
            var poly = {
              "type": "Feature",
              "geometry": data.geoPoly
            };

            var isInside = turf.inside(pt1, poly);
            console.log('Is inside ok 1:' + isInside);

            sendJsonResponse(res, 200, {alarma: !isInside});
          }
        });


    }



};
