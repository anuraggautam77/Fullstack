const express = require('express');

const apiRoutes = express.Router();
const listController = require('../controllers/listController');

/**
 * Get a single note by it's ID.
 */

apiRoutes.get('/:id', listController.getBoardDetails);


/**
 * Add New note
 */


apiRoutes.post('/', listController.addOneList);


/**
 * Update Notes
 */

apiRoutes.put('/:id', listController.updateList);

apiRoutes.put('/changestatus/:id', listController.cardStatus);




/**
 * Delete  note
 */


apiRoutes.delete('/:id/:boardid', listController.deleteList);


module.exports = apiRoutes;
