const express = require('express');
const router = express.Router();


const userController = require('../controllers/userController');

// register user
router.post('/register', userController.registerUser);
// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/login',  userController.loginUser);

module.exports = router;
