const express = require('express');

const apiRoutes = express.Router();
const kanbanController = require('../controllers/kanbanController');
const schema = require('../schema/kanban');

const passport = require('passport');

/**
 * Get all the Board.
 */

apiRoutes.get('/', passport.authenticate('jwt', { session: false }), kanbanController.getAllBoards);
/**
 * Get a single board by it's ID.
 */
apiRoutes.get('/:id', passport.authenticate('jwt', { session: false }), kanbanController.getOneBoard);
/**
 * Add New Board
 */
apiRoutes.post('/', passport.authenticate('jwt', { session: false }), schema.validateboardschema, kanbanController.addBoard);
/**
 * Update Board
 */
apiRoutes.put('/:id', passport.authenticate('jwt', { session: false }), schema.validateboardschema, kanbanController.updateBoard);
/**
 * Delete  Board
 * also  it will delete all List assocaited with Index
 * also  it will delete all Task assocaited with list under board
 *
 */
apiRoutes.delete('/:id', passport.authenticate('jwt', { session: false }), kanbanController.deleteBoard);
/**
 * Get List of Board.
 */
apiRoutes.get('/:boardid/lists', passport.authenticate('jwt', { session: false }), kanbanController.getBoardSubList);
/**
 * Create A list under specific Board.
 */
apiRoutes.post('/:boardid/list', passport.authenticate('jwt', { session: false }), schema.validatelistschema, kanbanController.createBoardSubList);
/**
 * create task under list
 */
apiRoutes.post('/:boardid/:listid', passport.authenticate('jwt', { session: false }), schema.validatecardschema, kanbanController.createTaskOfList);

module.exports = apiRoutes;
