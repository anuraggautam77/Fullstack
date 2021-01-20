const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const noteRouter = require('./routes/NoteTaking');
const boardRouter = require('./routes/Board');
const listRouter = require('./routes/List');

const app = express();

/**
 * DB connect
 */
const db = require('./db');

db();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/notes', noteRouter);
app.use('/api/board', boardRouter);

app.use('/api/boardlist', listRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // set locals, only providing error in development
  res.sendFile(path.resolve(__dirname, 'public/error.html'));
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler

app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
