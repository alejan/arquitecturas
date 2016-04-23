var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();


//var ctrEvents = require('../controllers/eventController');

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
//router.get('/event', ctrEvents.positionEventCreate);


var restEvtCtrl = require('../controllers/restEventController');
var ctrEvents = require('../controllers/eventController');

router.post('/event', restEvtCtrl.positionEventCreate);
router.get('/init', restEvtCtrl.safeZoneCreate);

router.post('/get/token', function (req, res) {
  var user = {
    username: req.body.username
  };

  var token = jwt.sign(user, 'CLAVEPRUEBA', {expiresIn: 30*60});

  res.json({token: token});
});

/* GET home page. */
router.get('/testtwilio', function(req, res, next) {

});
router.get('/index', function(req, res, next) {
	  res.render('index');
});
router.get('/latidos', function(req, res, next) {
  res.render('latidos');
});
router.get('/localizacion', function(req, res, next) {
  res.render('localizacion');
});
router.get('/', function(req, res, next) {
	  res.render('verLocalizacion');
});
router.get('/respiracion', function(req, res, next) {
  res.render('respiracion');
});

module.exports = router;
