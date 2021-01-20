/* eslint-disable no-console */
const express = require('express');

const apiRoutes = express.Router();

const boardController = require('../controllers/boardController');
const joiValidate = require('../schema/kanban');
// eslint-disable-next-line func-names
module.exports = function (io) {
  apiRoutes.use((req, res, next) => {
    console.log('inside board router !!!');
    console.log(io.webusers);
    next();
  });

  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      req.body.userid = req.user._id;
      req.body.username = req.user.username;
      return next();
    }
    res.sendStatus(401);
  }
  /**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} done
 */
  function validateboardschema(req, res, done) {
    const result = joiValidate.boardschema.validate(req.body);
    if (result.error) {
      res.status(500).send({
        messgae: result.error,
      });
    }
    done();
  }

  function emitMessageToclient(messageTo, channel, data) {
    io.webusers.forEach((element) => {
      if (messageTo.indexOf(element.loggeduser) !== -1) {
        io.to(element.socketid).emit(channel, data);
      }
    });
  }

  /**
   *Get all the notes.
   */

  apiRoutes.get('/', isAuthenticated, boardController.getAllBoards);

  /**
   * Get a single note by it's ID.
   */

  apiRoutes.get('/:id', isAuthenticated, boardController.getOneBoard);

  /**
   * Add New note
   */

  apiRoutes.post('/', validateboardschema, isAuthenticated, boardController.addOneBoard, (req, res) => {
    emitMessageToclient(req.messageTo, 'BROADCAST_BOARD_LIST', req.listdata);
    res.status(201).send({ success: true, message: 'Successfully Add Board' });
  });

  /**
   * Update Board
   */

  apiRoutes.put('/:id', validateboardschema, isAuthenticated, boardController.updateBoard, (req, res) => {
    emitMessageToclient(req.messageTo, 'BROADCAST_UPDATED_BOARD_DETAIL', req.board);
    res.status(200).send({ success: true, message: 'Board Update Successfully!! ' });
  });

  /**
   * Delete  note
   */

  apiRoutes.delete('/:id', isAuthenticated, boardController.deleteBoard, (req, res) => {
    console.log(req.messageTo);
    emitMessageToclient(req.messageTo, 'BROADCAST_BOARD_LIST', req.listdata);
    res.status(200).send({ success: true, message: 'Deleted Successfully' });
  });

  return apiRoutes;
};
