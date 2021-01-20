const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const { validateJwt } = require('./auth/jwtvalidate');


const app = express();
app.io = require('socket.io')();

app.io.webusers = [];

app.io.on('connection', (socket) => {
  app.io.webusers.push({
    loggeduser: socket.handshake.query.loggeduser,
    socketid: socket.id,
  });
});

const userRouter = require('./routes/userRouter');
const boardRouter = require('./routes/boardRouter')(app.io);
const listRouter = require('./routes/listRouter')(app.io);


/**
 * DB connect
 */
const db = require('./db');

db();

passport.use(validateJwt);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', userRouter);
app.use('/api/board', boardRouter);
app.use('/api/boardlist', listRouter);
app.use('/api/user', listRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  next(err);
});

// error handler
app.use((err, req, res) => {
  res.status(500).send({ status: 500, message: 'Something Goes wrong please try again!' });
});

module.exports = app;
