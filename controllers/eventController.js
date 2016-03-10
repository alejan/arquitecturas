var mongoose = require('mongoose');
var positionEvent = mongoose.model('PositionEvent');

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

module.exports.positionEventCreate = function(req, res){
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

};
