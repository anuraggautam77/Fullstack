const express = require('express');

const router = express.Router();

const gitbotController = require('../controllers/gitbotController');

// register user
router.route('/repo').post(gitbotController.createRepo).get(gitbotController.listRepo);
// Authenticate the user and get a JSON Web Token to include in the header of future requests.
router.post('/repo/:repoId/collaborator', gitbotController.addCollaborator);

router.route('/repo/issue').get(gitbotController.getListOfIssues).post(gitbotController.createNewIssue);

module.exports = () => router;
