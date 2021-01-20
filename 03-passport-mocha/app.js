const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');


const passport = require('passport');
const { validateJwt } = require('./auth/jwtvalidate');

const userRouter = require('./routes/users');
const kanbanRouter = require('./routes/Kanban');

const app = express();
const db = require('./db');
db();

passport.use(validateJwt);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', userRouter);
app.use('/api/kanban', kanbanRouter);


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/index.html'));
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
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