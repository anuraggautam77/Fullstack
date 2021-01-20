const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const { validateJwt } = require('./auth/jwtvalidate');
var compression = require('compression');

const app = express();

const port = process.env.PORT || 3200;

app.io = require('socket.io')();
app.io.webusers = [];
app.io.on('connection', (socket) => {
	app.io.webusers.push({
		loggeduser: socket.handshake.query.loggeduser,
		socketid: socket.id
	});
});

const userRouter = require('./routes/userRouter');
const slackRouter = require('./routes/slackRouter')(app.io);
const gitbotRouter = require('./routes/gitbotRouter')(app.io);

app.use(compression());
app.use(cors());
app.use(cookieParser());
passport.use(validateJwt);
app.use(logger('dev'));




app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

 
app.use('/api/auth', userRouter);
app.use('/api/slack', passport.authenticate('jwt', { session: false }), slackRouter);
app.use('/api/ga', passport.authenticate('jwt', { session: false }), gitbotRouter);

// catch 404 and forward to error handler
/**
 * DB connect
 */
const db = require('./config/db');
db();


/*
app.use((req, res, next) => {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
 
app.use((err, req, res) => {
	res.status(500).send({ status: 500, message: 'Something Goes wrong please try again!' });
});*/

app.use(function(req, res, next) {
	next();
});

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, '../dist/index.html'), function(err) {
		if (err) {
			res.status(500).send(err);
		}
	});
});

const server = app.listen(port, function() {
	console.log('Express server listening on port ' + port);
});

module.exports = app;
