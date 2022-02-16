'use strict';

const createHmac = require('crypto').createHmac,
  fs = require('fs'),
  path = require('path'),
  PDFDocument = require('pdfkit'),
  logsDir = 'logs',
  sep = '__________________________________________________________',
  sep2 = '----------------------------------------------------------';

const { getDate, getFullName } = require('../libs/main');
const { getDocumentTypeOne } = require('../libs/document');

const models = require('../models');
const User = models.user;
const Appointment = models.appointment;
const Global = require(path.join(__dirname, '..', 'config', 'config.json'))['Global'];

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
  } catch (e) {
    log_error('Error in test. Reson: ', req, res, e.message);
  }
};

exports.getDocument = async function (req, res) {
  try {
    let dateStart = new Date();
    log('\x1b[32m%s\x1b[0m', 'getDocument');
    log('Ip: ' + getIp(req));
    log('TimeStart: ' + dateStart);

    if (isUnSets(req.query.id_user, req.query.id_appointment)) {
      throw new Error('{id_user, id_appointment} not in the request');
    }

    let id_user = Number(req.query.id_user);
    let id_appointment = Number(req.query.id_appointment);

    if (Number.isNaN(id_user) && Number.isNaN(id_appointment)) {
      throw new Error('{id_user, id_appointment} must be a number');
    }

    const user = await getUser(id_user),
      appointment = await getAppointment(id_appointment);

    res.contentType('application/pdf');
    let myDoc = new PDFDocument();
    myDoc.pipe(res);

    const fontSrc = path.join(__dirname, '.', 'Times New Roman', 'times new roman.ttf');
    const fontSrcBo = path.join(__dirname, '.', 'Times New Roman', 'times new roman bold.ttf');
    myDoc.registerFont('Ti-Ro', fontSrc);
    myDoc.registerFont('Ti-Bo', fontSrcBo);
    getDocumentTypeOne(myDoc, user, appointment, Global);
  } catch (e) {
    log_error('Can`t get document. Reson: ', req, res, e.message);
  }
};

exports.getUsers = async function (req, res) {
  try {
    let dateStart = new Date();
    log('\x1b[32m%s\x1b[0m', 'getUsers');
    log('Ip: ' + getIp(req));
    log('TimeStart: ' + dateStart);
    const users = await getUsersInfo();
    res.json({
      result: { users },
    });
  } catch (e) {
    log_error('Can`t get users. Reson: ', req, res, e.message);
  }
};

exports.getUser = async function (req, res) {
  try {
    let dateStart = new Date();
    log('\x1b[32m%s\x1b[0m', 'getUser');
    log('Ip: ' + getIp(req));
    log('TimeStart: ' + dateStart);

    if (isUnSet(req.body.id)) {
      throw new Error('Id user not in the request');
    }
    const id = Number(req.body.id);
    if (Number.isNaN(id)) {
      throw new Error('Id user must be a number');
    }

    const user = await getUser(Number(req.body.id));
    res.json({
      result: { user },
    });
  } catch (e) {
    log_error('Can`t get user. Reson: ', req, res, e.message);
  }
};

exports.getAddress = async function (req, res) {
  try {
    let dateStart = new Date();
    log('\x1b[32m%s\x1b[0m', 'getAddress');
    log('Ip: ' + getIp(req));
    log('TimeStart: ' + dateStart);
    if (isUnSet(req.body.passwd)) {
      throw new Error('Password not in the request');
    }
  } catch (e) {
    log_error('Can`t get new address. Reson: ', req, res, e.message);
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
        if (user) {
          res(user);
        } else {
          rej(new Error("User doesn't found"));
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
}

async function getAppointment(id) {
  return new Promise((res, rej) => {
    Appointment.findOne({
      where: {
        id,
      },
    })
      .then((appointment) => {
        if (appointment) {
          res(appointment);
        } else {
          rej(new Error("Appointment doesn't found"));
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
}

async function getUsersInfo() {
  return new Promise((res, rej) => {
    User.findAll({})
      .then((users) => {
        if (users && users.length > 0) {
          const usersInfo = [];
          users.forEach((user) => {
            usersInfo.push({
              id: user.id,
              full_name: getFullName(user.last_name, user.first_name, user.patronymic),
              date: getDate(new Date(user.birthday), true),
            });
          });
          res(usersInfo);
        } else {
          rej(new Error("Users doesn't found"));
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
}

function getIp(req) {
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
    saveViewLog('Ip: ' + getIp(req), fname, color);
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
    if (typeof arg === 'undefined' || arg === '' || arg === null) {
      return true;
    }
  }
  return false;
}
