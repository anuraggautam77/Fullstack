const express = require('express');

const apiRoutes = express.Router();
const Joi = require('joi');
const boardController = require('../controllers/boardController');

const boardschema = Joi.object().keys({
  Title: Joi.string().min(2).max(50),
  Description: Joi.string().min(2).max(100),
  DateOfCreation: Joi.date()
});


function validateschema(req, res, done) {
  const result = boardschema.validate(req.body);
  if (result.error) {
    res.status(500).send({
      messgae: result.error,
    });
  }
  done();
}


/**
 *Get all the notes.
 */

apiRoutes.get('/', boardController.getAllBoards);

/**
 * Get a single note by it's ID.
 */

apiRoutes.get('/:id', boardController.getOneBoard);


/**
 * Add New note
 */


apiRoutes.post('/', validateschema, boardController.addOneBoard);


/**
 * Update Notes
 */

apiRoutes.put('/:id', validateschema, boardController.updateBoard);

/**
 * Delete  note
 */


apiRoutes.delete('/:id', boardController.deleteBoard);


module.exports = apiRoutes;
