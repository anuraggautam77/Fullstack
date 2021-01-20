const jwt = require('jsonwebtoken');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

const opts = {
  audience: 'kanbanapi.herokuapp.com',
  issuer: 'kanbanapi.herokuapp.com',
  secretOrKey: 'secret',
  jwtFromRequest:  ExtractJwt.fromExtractors(
	  [ExtractJwt.fromAuthHeaderAsBearerToken(), req => req.cookies.authToken],
	)
};

module.exports = {
  generateJwtToken: ({ audience, issuer, secretOrKey }, subject) => jwt.sign({}, secretOrKey, {
    audience,
    issuer,
    // expiresIn: '10d',
    subject,
  }),
  jwtOptions: opts,
  validateJwt: new Strategy(opts, (payload, done) => {
    const username = payload.sub;
    User.findOne({
      username,
    }, (err, user) => {
      if (err) {
        done(err);
      }
      if (!user) {
        done(new Error('User not found'), null);
      }
      done(null, user);
    });
  }),
};
