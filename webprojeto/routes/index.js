var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});


router.get('/sobre', (req, res) => {
  res.render('sobre');
});

router.get('/home', (req, res) => {
  res.render('home');
});

module.exports = router;
