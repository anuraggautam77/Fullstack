const mongoose = require('mongoose');
const board = require('../models/board');
const list = require('../models/list');

const boardController = {

  emitMessageToclient(boardid, username, cb) {
    const messageTo = [];
    board.find({
      _id: mongoose.Types.ObjectId(boardid),
    })
      .populate('createdby', '_id username')
      .populate('userBelongs', '_id username')
      .exec((error, lists) => {
        if (error != null) {
          cb([username]);
        }

        if (lists !== null && lists.length > 0) {
          if (lists[0].userBelongs.length > 0) {
            lists[0].userBelongs.forEach((element) => {
              messageTo.push(element.username);
            });
          }
          if (lists[0].createdby) {
            messageTo.push(lists[0].createdby.username);
          }
        } else {
          messageTo.push(username);
        }
        cb(messageTo);
      });
  },


  getAllBoards(req, res, next) {
    try {
      board.find({
        $or: [
          { userBelongs: mongoose.Types.ObjectId(req.body.userid) },
          { createdby: mongoose.Types.ObjectId(req.body.userid) },
        ],
      },
      (error, allNotes) => {
        if (error) {
          res.status(404).send({ success: false, message: error });
        } else {
          res.status(200).send({ list: allNotes, success: true });
        }
      });
    } catch (error) {
      next(error);
    }
  },

  getOneBoard(req, res, next) {
    try {
      const body = [...req];
      const id = mongoose.Types.ObjectId(body.noteid);
      board.findOne({ _id: id }, (error) => {
        if (error) {
          res.status(404).send({ success: false, message: error });
        }
      });
    } catch (error) {
      next(error);
    }
  },


  addOneBoard(req, res, next) {
    const model = new board();
    model.Title = req.body.Title;
    model.Description = req.body.Description;
    model.createdby = mongoose.Types.ObjectId(req.body.userid);
    model.save((error) => {
      if (error) {
        res.status(404).send({ success: false, message: error });
      } else {
        board.find({}, (err, allNotes) => {
          if (err) {
            res.status(404).send({ success: false, message: error });
          } else {
            // eslint-disable-next-line no-underscore-dangle
            boardController.emitMessageToclient(allNotes._id, req.body.username, (messageToList) => {
              req.listdata = allNotes;
              req.messageTo = messageToList;
              next();
            });
          }
        });
      }
    });
  },


  updateBoard(req, res, next) {
    const body = req.body;
    const id = mongoose.Types.ObjectId(req.params.id);
    const param = { Title: body.Title, Description: body.Description };
    board.findOneAndUpdate({ _id: id }, param, (err) => {
      if (err) {
        res.status(404).json({ success: false, message: err });
      } else {
        boardController.emitMessageToclient(req.params.id, req.body.username, (messageToList) => {
          req.board = param;
          req.board.id = id;
          req.messageTo = messageToList;
          next();
        });
      }
    });
  },

  deleteBoard(req, res, next) {
    if (req.params.id) {
      const id = mongoose.Types.ObjectId(req.params.id);

      boardController.emitMessageToclient(req.params.id, req.body.username, (messageToList) => {
        board.findOneAndRemove({ _id: id }, (err) => {
          if (err) {
            res.status(404).json({ success: false, message: err });
          } else {
            list.deleteMany({ Boardid: req.params.id }, (error) => {
              if (error) {
                res.status(404).json({ success: false, message: err });
              } else {
                board.find({}, (error1, allNotes) => {
                  if (error1) {
                    res.status(404).send({ success: false, message: error1 });
                  } else {
                    req.listdata = allNotes;
                    req.messageTo = messageToList;
                    next();
                  }
                });
              }
            });
          }
        });
      });
    }
  },

};
module.exports = boardController;
