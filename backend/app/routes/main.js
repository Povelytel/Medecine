const express = require('express'),
  router = express.Router(),
  main = require('../controllers/mainController.js');

router.get('/test', main.someToLog, main.test);

module.exports = router;
