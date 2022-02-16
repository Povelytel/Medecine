const express = require('express'),
  router = express.Router(),
  main = require('../controllers/mainController.js');

router.get('/test', main.someToLog, main.test);
router.get('/getDocument', main.someToLog, main.getDocument);
router.post('/getUser', main.someToLog, main.getUser);
router.post('/getUsers', main.someToLog, main.getUsers);

module.exports = router;
