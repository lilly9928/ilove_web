var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'ILOVE' });
});
router.get('/main', function(req, res, next) {
  res.render('index', { title: 'ILOVE' });
});

module.exports = router;
