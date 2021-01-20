const User = require('../models/user');
const { generateJwtToken, jwtOptions } = require('../auth/jwtvalidate');

const userController = {
  registerUser(req, res) {
    const newUser = new User();
    newUser.password = req.body.password;
    newUser.username = req.body.username;
    newUser.name = req.body.name;

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


  loginUser(req, res, done) {
    const { username, password } = req.body;
    User.findOne({
      username,
    }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user || user === null) {
        res.status(404).send({ success: false, message: 'No user found' });
      } else if (user.password !== password) {
        res.status(404).send({ success: false, message: 'Incorrect Password' });
      } else {
        const token = generateJwtToken(jwtOptions, username);
        res.cookie('jwt-token', token);
        res.cookie('name', user.name);
        res.cookie('username', user.username);
        res.status(200).send({
          success: true, token, username: user.name, message: 'Login Ok',
        });
      }
    });
  },


};

module.exports = userController;
