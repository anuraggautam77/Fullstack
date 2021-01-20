const express = require('express');

const apiRoutes = express.Router();
const Joi = require('joi');
const kanbanController = require('../controllers/kanbanController');

const boardschema = Joi.object().keys({
  name: Joi.string().min(2).max(50),
  description: Joi.string().min(2).max(100),
});

const listschema = Joi.object().keys({
  listlabel: Joi.string().min(2).max(50),
  bgcolor: Joi.string().min(2).max(100),
});

const cardschema = Joi.object().keys({
  title: Joi.string().min(2).max(50),
});


function validateBoardschema(req, res, done) {
  const result = boardschema.validate(req.body);
  if (result.error) {
    res.status(500).send({
      messgae: result.error,
    });
  }
  done();
}


function validateListschema(req, res, done) {
  const result = listschema.validate(req.body);
  if (result.error) {
    res.status(500).send({
      messgae: result.error,
    });
  }
  done();
}


function validateCardschema(req, res, done) {
  const result = cardschema.validate(req.body);
  if (result.error) {
    res.status(500).send({
      messgae: result.error,
    });
  }
  done();
}
/**
 * Get all the Board.
 */

apiRoutes.get('/', kanbanController.getAllBoards);

/**
 * Get a single board by it's ID.
 */

apiRoutes.get('/:id', kanbanController.getOneBoard);

/**
 * Add New Board
 */


apiRoutes.post('/', validateBoardschema, kanbanController.addBoard);
/**
 * Update Board
 */

apiRoutes.put('/:id', validateBoardschema, kanbanController.updateBoard);

/**
 * Delete  Board
 * also  it will delete all List assocaited with Index
 * also  it will delete all Task assocaited with list under board
 *
 */

apiRoutes.delete('/:id', kanbanController.deleteBoard);
/**
 * Get List of Board.
 */

apiRoutes.get('/:boardid/lists', kanbanController.getBoardSubList);
/**
 * Create A list under specific Board.
 */
apiRoutes.post('/:boardid/list', validateListschema, kanbanController.createBoardSubList);
/**
 * create task under list
 */

apiRoutes.post('/:boardid/:listid', validateCardschema, kanbanController.createTaskOfList);

module.exports = apiRoutes;
