var express = require('express');
var router = express.Router();

/* login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'ILOVE' });
});
router.get('/join', function(req, res, next) {
  res.render('register', { title: 'ILOVE' });
});

module.exports = router;

