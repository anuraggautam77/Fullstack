const express = require('express');

const apiRoutes = express.Router();

const Joi = require('joi');
const collaborationController = require('../controllers/CollaborationController');

const workspaceSchema = Joi.object().keys({
  name: Joi.string().min(2).max(50),
});

const userSchema = Joi.object().keys({
  name: Joi.string().min(2).max(50),
  lastname: Joi.string().min(2).max(100),
});

const channelSchema = Joi.object().keys({
  name: Joi.string().min(2).max(50),
});


function validateWorkspaceSchema(req, res, done) {
  const result = workspaceSchema.validate(req.body);
  if (result.error) {
    res.status(500).send({
      messgae: result.error,
    });
  }
  done();
}


function validateUserSchema(req, res, done) {
  const result = userSchema.validate(req.body);
  if (result.error) {
    res.status(500).send({
      messgae: result.error,
    });
  }
  done();
}


function validateChannelSchema(req, res, done) {
  const result = channelSchema.validate(req.body);
  if (result.error) {
    res.status(500).send({
      messgae: result.error,
    });
  }
  done();
}


/**
 * Get all the Workspace.
 */

apiRoutes.get('/', collaborationController.getAllWorkspaces);


/**
 * Get a single board by it's ID.
 */
apiRoutes.get('/:id', collaborationController.getSingleWorkspace);

/**
 * Add New Board
 */

apiRoutes.post('/', validateWorkspaceSchema, collaborationController.addWorkspace);

/**
 * Update Board
 */

apiRoutes.put('/:id', validateWorkspaceSchema, collaborationController.updateWorkspace);

/**
 * Delete  Board
 * also  it will delete all List assocaited with Index
 * also  it will delete all Task assocaited with list under board
 *
 */

apiRoutes.delete('/:id', collaborationController.deleteWorkspace);

/**
 * Add channel to workspace
 */

apiRoutes.post('/:workspaceid/channel', validateChannelSchema, collaborationController.addChannelInWorkspace);

/**
 * Add user to Workspace
 */
apiRoutes.post('/:workspaceid/user', validateUserSchema, collaborationController.addUserInWorkspace);

/**
 * Add user to one of the channel in Workspace
 */

apiRoutes.post('/:workspaceid/:channelid/user', validateUserSchema, collaborationController.addUserChannelWorkspace);

/**
 * Add user list of channel
 */


apiRoutes.get('/:workspaceid/:channelid/users', collaborationController.getChannelUsers);


module.exports = apiRoutes;
