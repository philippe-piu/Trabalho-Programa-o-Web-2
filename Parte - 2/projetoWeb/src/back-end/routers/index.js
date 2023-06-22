const express = require('express');
const router = express.Router();
const path = require('path');

//Rota Principal
router.get('/', (req, res) => {
  
  res.render(path.join(__dirname, '../../front-end/views/dynamic/login'));
});

module.exports = router;

