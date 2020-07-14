var express = require('express');
var router = express.Router();

/* dashboard page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'ILOVE' });
});
/* board 폴더 */
router.get('/inquire', function(req, res, next) {
    res.render('./board/inquire', { title: 'ILOVE' });
  });

  router.get('/notice', function(req, res, next) {
    res.render('./board/notice', { title: 'ILOVE' });
  });

  router.get('/report', function(req, res, next) {
    res.render('./board/report', { title: 'ILOVE' });
  });

   router.get('/inquire', function(req, res, next) {
    res.render('./board/inquire', { title: 'ILOVE' });
  });

  /* etc 폴더 */

     router.get('/cash_request', function(req, res, next) {
    res.render('./etc/cash_request', { title: 'ILOVE' });
  });
  router.get('/payment', function(req, res, next) {
    res.render('./etc/payment', { title: 'ILOVE' });
  });
  router.get('/push', function(req, res, next) {
    res.render('./etc/push', { title: 'ILOVE' });
  });
  
  /*member폴더*/
  router.get('/chat_staff', function(req, res, next) {
    res.render('./member/chat_staff', { title: 'ILOVE' });
  });
  router.get('/profile_confirm', function(req, res, next) {
    res.render('./member/profile_confirm', { title: 'ILOVE' });
  });
  router.get('/reg_member', function(req, res, next) {
    res.render('./member/reg_member.ejs', { title: 'ILOVE' });
  });
module.exports = router;
