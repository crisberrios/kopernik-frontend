var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/ping', function(req, res, next) {
   res.send(JSON.stringify({pong: 'pong'}));
});
router.post('/data', function(req, res, next) {
    res.json(req.body);
});

module.exports = router;
