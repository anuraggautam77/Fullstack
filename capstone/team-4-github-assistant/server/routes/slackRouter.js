const express = require('express');

const router = express.Router();

const slackController = require('../controllers/slackController');

router.route('/channel/:channelId/user').post(slackController.postUserToChannel).get(slackController.getUsersFromChannel);
router.route('/channel/:channelId/messages').get(slackController.getMessagesBy);
router.route('/messages/:from/:to').get(slackController.getMessagesBy);
router.route('/channel').post(slackController.createChannel).get(slackController.getChannels);
router.route('/channel/:channelId').get(slackController.getChannelById)
  .put(slackController.updateChannelById)
  .delete(slackController.deleteChannelById);
router.route('/message').post(slackController.createMessage);

module.exports = () => router;
