/* eslint-disable no-console */
const express = require('express');

const apiRoutes = express.Router();
const passport = require('passport');
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
  function authToken(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err == null && !user) {
        
        res.status(500).send({
          status:500,
          messgae: 'Not Authorized',
        });
        
      } else {
        req.body.userid = user._id;
        req.body.username = user.username;
        next();
      }
    })(req, res, next);
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

  apiRoutes.get('/', authToken, boardController.getAllBoards);

  /**
   * Get a single note by it's ID.
   */

  apiRoutes.get('/:id', authToken, boardController.getOneBoard);


  /**
   * Add New note
   */


  apiRoutes.post('/', validateboardschema, authToken, boardController.addOneBoard, (req, res) => {
    // console.log(req.listdata);
    // console.log(req.messageTo);
    emitMessageToclient(req.messageTo, 'BROADCAST_BOARD_LIST', req.listdata);
    // io.emit('BROADCAST_BOARD_LIST', req.listdata);
    res.status(201).send({ success: true, message: 'Successfully Add Board' });
  });


  /**
   * Update Board
   */

  apiRoutes.put('/:id', validateboardschema, authToken, boardController.updateBoard, (req, res) => {
    console.log(req.board);
    console.log(req.messageTo);
    emitMessageToclient(req.messageTo, 'BROADCAST_UPDATED_BOARD_DETAIL', req.board);
    res.status(200).send({ success: true, message: 'Board Update Successfully!! ' });
  });

  /**
   * Delete  note
   */


  apiRoutes.delete('/:id', authToken, boardController.deleteBoard, (req, res) => {
    console.log(req.messageTo);
    emitMessageToclient(req.messageTo, 'BROADCAST_BOARD_LIST', req.listdata);
    res.status(200).send({ success: true, message: 'Deleted Successfully' });
  });


  return apiRoutes;
};
