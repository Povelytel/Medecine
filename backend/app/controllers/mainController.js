'use strict';

const createHmac = require('crypto').createHmac,
  fs = require('fs'),
  logsDir = 'logs',
  sep = '__________________________________________________________',
  sep2 = '----------------------------------------------------------';

const models = require('../models');
const User = models.user;

exports.someToLog = function (req, res, next) {
  console.log(sep);
  console.log(sep2);
  return next();
};

exports.checkAuth = function (req, res, next) {
  if (isUnSet(req.headers['authorization'])) {
    log_error('Missing password.', req);
    res.sendStatus(403);
  } else {
    const bearerHeader = req.headers['authorization'],
      bearer = bearerHeader.split(' '),
      bearerToken = bearer[1],
      authPass = createHmac('sha256', bearerToken).update('bearerToken').digest('hex');
    console.log(authPass);
    if (authPass === 'auth') {
      console.log(sep);
      console.log(sep2);
      return next();
    } else {
      log_error('Wrong password.', req);
      res.sendStatus(403);
    }
  }
};

exports.test = async function (req, res) {
  try {
    log('test');

    const user = await getUser(100001);

    console.log(user.first_name);

    res.json({
      result: 'test',
    });
  } catch (e) {
    log_error('Error in test. Reson: ', req, res, e.message);
  }
};

exports.getAddress = async function (req, res) {
  try {
    let dateStart = new Date();
    log('\x1b[32m%s\x1b[0m', 'getAddress');
    log('Ip: ' + getip(req));
    log('TimeStart: ' + dateStart);
    if (isUnSet(req.body.passwd)) {
      throw new Error('Password not in the request');
    }
  } catch (e) {
    log_error('Can`t get new address. Reson: ', req, res, e.message);
  }
};

exports.findAddress = async function (req, res) {
  try {
    let dateStart = new Date();
    log('\x1b[32m%s\x1b[0m', 'findAddress');
    log('Ip: ' + getip(req));
    log('TimeStart: ' + dateStart);
    if (isUnSets(req.body.passwd, req.body.address)) {
      throw new Error('Password or address is miss');
    }
  } catch (e) {
    log_error('Can`t find address. Reson: ', req, res, e.message);
  }
};

async function getUser(id) {
  return new Promise((res, rej) => {
    User.findOne({
      where: {
        id,
      },
    })
      .then((user) => {
        res(user);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

function getip(req) {
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (typeof ip !== 'undefined') {
    return ip;
  } else {
    return 'ip does found';
  }
}

function log(...args) {
  let count = 0,
    color = '',
    fname = logsDir + '/log.log';
  if (!fs.existsSync(fname)) {
    fs.writeFileSync(fname, 'Start log', 'utf8');
    fs.appendFileSync(fname, '\n', 'utf8');
  }
  for (let arg of args) {
    count++;
    if (typeof arg !== 'undefined') {
      if (arg === '\x1b[32m%s\x1b[0m') {
        color = arg;
      } else {
        saveViewLog(arg, fname, color);
      }
    } else {
      console.log('\x1b[31m%s\x1b[0m', 'Element ' + count + ' undefined');
    }
  }
}

function log_error(err_mes, req = false, res = false, log = false) {
  let date = new Date(),
    color = '\x1b[31m%s\x1b[0m',
    fname = logsDir + '/errorLogs.log',
    error = [];
  if (!fs.existsSync(fname)) {
    fs.writeFileSync(fname, 'Start log', 'utf8');
    fs.appendFileSync(fname, '\n', 'utf8');
  }
  if (req) {
    saveViewLog('Ip: ' + getip(req), fname, color);
  }
  saveViewLog('Time: ' + date, fname, color);
  saveViewLog('Error: ', fname, color);
  saveViewLog(err_mes, fname, color);
  error.push(err_mes);
  if (log) {
    saveViewLog('Error_log_param: ', fname, color);
    saveViewLog(log, fname, color);
    error.push(log);
  }
  saveViewLog(sep, fname);
  saveViewLog(sep2, fname);
  if (res) {
    res.json({
      error: error,
    });
  }
}

function saveViewLog(text, fname, color = '', cod = 'utf8') {
  console.log(color, text);
  fs.appendFileSync(fname, text, cod);
  fs.appendFileSync(fname, '\n', cod);
}

function isUnSet(some) {
  if (typeof some === 'undefined') {
    return true;
  } else {
    return false;
  }
}

function isUnSets(...args) {
  // args — имя массива
  for (let arg of args) {
    if (typeof arg === 'undefined') {
      return true;
    }
  }
  return false;
}
