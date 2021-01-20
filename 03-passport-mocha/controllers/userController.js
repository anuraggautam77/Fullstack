const User = require('../models/user');
const { generateJwtToken, jwtOptions } = require('../auth/jwtvalidate');


const userController = {
  registerUser(req, res) {
    const newUser = new User();
    newUser.password = req.body.password;
    newUser.username = req.body.username;

    if (req.body.phone !== null && req.body.phone !== '') {
      newUser.phone = req.body.phone;
    }
    newUser.save((error) => {
      if (error) {
        res.status(404).send({ success: false, message: error });
      } else {
        res.status(200).send({ success: true, message: 'Successfully registered' });
      }
    });
  },


  loginUser(req, res) {
    const { username, password } = req.body;
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

      if (user.password !== password) {
          return done(null, false, {
              message: 'Incorrect Password!!',
          });
      }

      res.json({ success: true,  message: 'Authentication successfull', token: generateJwtToken(jwtOptions, username) });

      
  });
  }


};

module.exports = userController;
