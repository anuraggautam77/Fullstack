const User = require('../models/user');
const config = require('../config/config.js'); 
const axios = require('axios');
const { generateJwtToken, jwtOptions } = require('../auth/jwtvalidate');
const bcrypt = require('bcrypt');
const userController = {
  gitLogin : (req, res) => {

    let url = `https://github.com/login/oauth/authorize?client_id=${config.gitApp.clientId}&scope=public_repo`;
    res.redirect(url);
  },
  gitLoginSuccess: (req, res) => {
    const {code}  = req.query;
    let url = `https://github.com/login/oauth/access_token`;
    let requestData = {
      client_id: config.gitApp.clientId,
      client_secret: config.gitApp.clientSecret,
      code
    };
    axios.post(url,requestData).then(async (response) => {
      let token = response.data.split('&')[0] && (response.data.split('&')[0]).split('=')[1];
      await User.updateOne({username:req.cookies.username},{$set:{gittoken:token}}).then((data)=>{
        return data;
      },(error)=>{
        console.log(error);
        return error;
      });
      return Promise.resolve({git_token:token});
    }).then((body)=>{
      res.redirect('/');
    })
    .catch(function (error) {
      res.status(200).send(error);
    });
  },
  registerUser: (req, res) => {
    const newUser = new User();
    bcrypt.hash(req.body.password, config.auth.saltRounds, function(err, hash) {
      // Store hash in your password DB.
      newUser.password = hash;
      newUser.username = req.body.username;
      newUser.lastname = req.body.lastname;
      newUser.email = req.body.email;
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
    });
  },
  
  loginUser: (req, res, done) => {
    
    const { username, password } = req.body;
    User.findOne({
      username,
    }, (err, user) => {

      console.log(user)

      if (err) {
        return done(err);
      }
      let isAuth;
      if (!user || user === null) {
        res.status(404).send({ success: false, message: 'No user found' });
      } else if(user){
        bcrypt.compare(password, user.password , function(err, auth) {
          if(err){
            res.status(400).send({ success: false, message: 'Some Error happened' });
          }
          if (!auth) {
            res.status(400).send({ success: false, message: 'Incorrect Password' });
          } else {
            const token = generateJwtToken(jwtOptions, username);
            res.cookie('authToken', token);
            res.cookie('name', user.username);
            res.cookie('username', user.username);
            res.status(200).send({
              success: true, token, username: user.username, message: 'Login Ok',
            });
          }
        });
      }
    });
  }

};

module.exports = userController;
