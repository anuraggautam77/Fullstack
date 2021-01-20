/* eslint-disable comma-dangle */
const express = require('express');
const axios = require('axios');
const User = require('../models/user');

const router = express.Router();
const { generateJwtToken, jwtOptions } = require('../auth/jwtvalidate');

const config = require('../config/config');

router.get('/github', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.github_auth.CLIENT_ID}`);
});

router.get('/facebook', (req, res) => {
  res.redirect(
    `https://www.facebook.com/v3.2/dialog/oauth?client_id=${config.facebook_auth
      .APP_ID}&redirect_uri=http://localhost:3200/api/auth/login/facebook/complete`
  );
});

router.get('/facebook/complete', (req, res) => {
  const { code } = req.query;

  axios
    .get(
      `https://graph.facebook.com/v3.2/oauth/access_token?client_id=${config.facebook_auth
        .APP_ID}&client_secret=${config.facebook_auth
        .APP_SECRET}&code=${code}&redirect_uri=http://localhost:3200/api/auth/login/facebook/complete`
    )
    .then((response) => {
      axios.get(`https://graph.facebook.com/me?&access_token=${response.data.access_token}`).then((responseData) => {
        const username = responseData.data.id;
        const { name } = responseData.data;

        User.findOne({ username }, (err, user) => {
          if (!user || user === null) {
            const newUser = new User();
            newUser.username = username;
            newUser.password = '@@@@@@@';
            newUser.name = name;
            newUser.logintype = 'FACEBOOK';

            newUser.save((error) => {
              if (error) {
                res.status(404).send({ success: false, message: error });
              } else {
                getUserDetail(res, name, username);
              }
            });
          } else {
            // eslint-disable-next-line no-use-before-define
            getUserDetail(res, name, username);
          }
        });
      });
    });
});

router.get('/github/complete', (req, res) => {
  const { code } = req.query;
  axios
    .post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: config.github_auth.CLIENT_ID,
        client_secret: config.github_auth.CLIENT_SECRET,
        code
      },
      {
        headers: {
          Accept: 'application/json'
        }
      }
    )
    .then((response) => {
      axios
        .get('https://api.github.com/user', {
          headers: {
            Authorization: `token ${response.data.access_token}`
          }
        })
        .then((response) => {
          const username = response.data.login;
          const { name } = response.data;

          User.findOne({ username }, (err, user) => {
            if (!user || user === null) {
              const newUser = new User();
              newUser.username = username;
              newUser.password = '@@@@@@@@@';
              newUser.name = name;
              newUser.logintype = 'GITHUB';

              newUser.save((error) => {
                if (error) {
                  res.status(404).send({ success: false, message: error });
                } else {
                  getUserDetail(res, name, username);
                }
              });
            } else {
              // eslint-disable-next-line no-use-before-define
              getUserDetail(res, name, username);
            }
          });
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

const getUserDetail = (res, name, username) => {
  const token = generateJwtToken(jwtOptions, username);
  res.cookie('jwt-token', token);
  res.cookie('name', name);
  res.cookie('username', username);
  res.redirect('/trello');
};

module.exports = router;
