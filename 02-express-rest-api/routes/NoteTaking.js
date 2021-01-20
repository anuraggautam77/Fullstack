const express = require('express');

const apiRoutes = express.Router();
const Joi = require('joi');
const noteController = require('../controllers/noteController');

const noteschema = Joi.object().keys({
  Title: Joi.string().min(2).max(50),
  Description: Joi.string().min(2).max(100),
  BgColor: Joi.string(),
  BgImage: Joi.string(),
  RemindMeAt: Joi.string(),
  DateOfCreation: Joi.date(),
});


function validateschema(req, res, done) {
  const result = noteschema.validate(req.body);

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

apiRoutes.get('/', noteController.getAllNotes);

/**
 * Get a single note by it's ID.
 */

apiRoutes.get('/:id', noteController.getOneNote);


/**
 * Add New note
 */


apiRoutes.post('/', validateschema, noteController.addOneNote);


/**
 * Update Notes
 */

apiRoutes.put('/:id', validateschema, noteController.updateNote);

/**
 * Delete  note
 */


apiRoutes.delete('/:id', noteController.deleteNote);


module.exports = apiRoutes;
