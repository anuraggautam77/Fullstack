const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const config = require('./config/config.js');
const userRouter = require('./routes/users');
const kanbanRouter = require('./routes/Kanban');
const User = require('./models/user');
const db = require('./db');

const app = express();
db();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: config.auth.secret,
    proxy: true,
    resave: true,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({
        username,
    }, (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, {
                message: 'No user found ofr this username!!',
            });
        }

        if (user.password !== password) {
            return done(null, false, {
                message: 'Incorrect Password!!',
            });
        }
        return done(null, user);
    });
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    User.findById({
        _id: id,
    }, (err, user) => {
        if (err) {
            throw new Error(err);
        } else {
            done(null, user);
        }
    });
});

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