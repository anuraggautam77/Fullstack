const jwt = require('jsonwebtoken');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');


const opts = {
  audience: 'kanbanapi.herokuapp.com',
  issuer: 'kanbanapi.herokuapp.com',
  secretOrKey: 'secret',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    console.log(payload)


    const username = payload.sub;
    User.findOne({
      username
  }, (err, user) => {
      if (err) {
          return done(err);
      }

      if (!user) {
          return done(null, false, {
              message: 'No user found ofr this username!!',
          });
      }
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>!!!!!!!!!!");
        console.log(user);
      
      return done(null, user);
  });
  }),
};
