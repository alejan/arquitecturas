
var express = require('express');
var router = express.Router();

var restEvtCtrl = require('../controllers/restEventController');
//var ctrEvents = require('../controllers/eventController');

router.get('/event', restEvtCtrl.positionEventCreate);
router.get('/init', restEvtCtrl.safeZoneCreate);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/latidos', function(req, res, next) {
  res.render('latidos');
});
router.get('/', function(req, res, next) {
  res.render('localizacion');
});
router.get('/', function(req, res, next) {
  res.render('respiracion');
});



module.exports = router;
