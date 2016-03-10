var express = require('express');
var router = express.Router();

//var ctrEvents = require('../controllers/eventController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//router.get('/event', ctrEvents.positionEventCreate);

module.exports = router;
