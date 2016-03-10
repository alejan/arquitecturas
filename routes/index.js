var express = require('express');
var router = express.Router();

//var ctrEvents = require('../controllers/eventController');

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
//router.get('/event', ctrEvents.positionEventCreate);

module.exports = router;
