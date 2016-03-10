var mongoose = require('mongoose');
var positionEvent = mongoose.model('PositionEvent');
var safezone = mongoose.model('SafeZone');


var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

module.exports = {
    safeZoneCreate:  function(req, res){
        safezone.create({
            petName: "temp",
            //aproximadamente las cuatro esquinas del ML
            //4.602732, -74.065319
            //4.602316, -74.064677
            //4.602832, -74.064416
            //4.603182, -74.064966
            boundary: [
                [4.602732, -74.065319],
                [4.602316, -74.064677],
                [4.602832, -74.064416],
                [4.603182, -74.064966]
            ]
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
        // console.log('hello');
    }
}