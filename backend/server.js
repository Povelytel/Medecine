const express = require('express'),
  bodyParser = require('body-parser'),
  main = require('./app/routes/main'),
  app = express(),
  cors = require('cors');
const models = require('./app/models');

const host = process.env.HOST || '127.0.0.1',
  port = process.env.PORT || '3030';

app.use(cors());

//pars json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use('/api/', main);

//Sync Database
models.sequelize
  .sync()
  .then(function () {
    console.log('Nice! Database looks fine');
  })
  .catch(function (err) {
    console.log(err, 'Something went wrong with the Database Update!');
  });

app.listen(Number(port), host, function () {
  console.log('Server started on host: ' + host + ' port: ' + port);
});
