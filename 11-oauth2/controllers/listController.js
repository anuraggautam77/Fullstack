const mongoose = require('mongoose');
const list = require('../models/list');
const card = require('../models/card');
const board = require('../models/board');
const user = require('../models/user');


const listController = {

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


  getBoardDetails(req, res) {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const id = mongoose.Types.ObjectId(req.params.id);
      const crrntuser = mongoose.Types.ObjectId(req.body.userid);
      const BoardDetails = new Promise(((resolve) => {
        board.findOne({
          _id: { $in: id },
          $or: [
            { userBelongs: mongoose.Types.ObjectId(crrntuser) },
            { createdby: crrntuser },
          ],
        })
          .populate('userBelongs', '_id name')
          .exec((error, lists) => {
            if (error) {
              res.status(404).send({ success: false, message: error });
            }
            resolve(lists);
          });
      }));

      const Lists = new Promise(((resolve) => {
        list.find({ Boardid: req.params.id }, (error, lists) => {
          if (error) {
            res.status(404).send({ success: false, message: error });
          } else {
            resolve(lists);
          }
        });
      }));

      const Cards = new Promise(((resolve) => {
        card.find({ Boardid: req.params.id }, (error, lists) => {
          if (error) {
            res.status(404).send({ success: false, message: error });
          } else {
            resolve(lists);
          }
        });
      }));
      Promise.all([BoardDetails, Cards, Lists]).then((values) => {
        if (values[0] !== null) {
          res.status(200).json({
            status: 'success', boardDetails: values[0], cards: values[1], lists: values[2],
          });
        } else {
          res.status(200).json({
            message: "You don't have access to this Board ", boardDetails: values[0], cards: [], lists: [],
          });
        }
      });
    } else {
      res.status(400).json({ message: 'Some thing goes wrong  Please use valid Board ID !!!', status: 'fail' });
    }
  },

  addOneList(req, res, next) {
    const model = new list();
    model.Title = req.body.Title;
    model.Boardid = req.body.bid;
    // eslint-disable-next-line no-shadow
    model.save((error, listdata) => {
      if (error) {
        res.status(404).send({ success: false, message: error });
      } else {
        listController.emitMessageToclient(req.body.bid, req.body.username, (messageToList) => {
          req.list = [listdata];
          req.messageTo = messageToList;
          next();
        });
      }
    });
  },

  addOneCard(req, res, next) {
    const model = new card();
    model.Title = req.body.Title;
    model.Description = req.body.Description;
    model.Boardid = req.body.Boardid;
    model.Listid = req.body.Listid;
    model.save((error, cardData) => {
      try {
        if (error) {
          res.status(404).send({ success: false, message: error });
        } else {
          listController.emitMessageToclient(req.body.Boardid, req.body.username, (messageToList) => {
            req.card = [cardData];
            req.messageTo = messageToList;
            next();
          });
        }
        // eslint-disable-next-line no-empty
      } catch (error) {
        next(error);
      }
    });
  },


  updateCard(req, res, next) {
    const body = req.body;
    const id = mongoose.Types.ObjectId(req.params.id);
    const param = { Title: body.Title, Description: body.Description };
    card.findOneAndUpdate({ _id: id }, param, (err, cardDetail) => {
      try {
        if (err) {
          res.status(404).json({ success: false, message: err });
        } else {
          const userName = req.body.username;
          listController.emitMessageToclient(cardDetail.Boardid, userName, (messageToList) => {
            param.id = id;
            req.card = param;
            req.messageTo = messageToList;
            next();
          });
        }
      } catch (error) {
        next(error);
      }
    });
  },
  deleteCard(req, res, next) {
    try {
      if (req.params.id) {
        const id = mongoose.Types.ObjectId(req.params.id);
        card.findOne({ _id: id }, (err, carddetail) => {
          const userName = req.body.username;
          listController.emitMessageToclient(carddetail.Boardid, userName, (messageToList) => {
            card.findOneAndRemove({ _id: id }, (error) => {
              if (error) {
                res.status(404).json({ success: false, message: error });
              } else {
                req.cardid = req.params.id;
                req.messageTo = messageToList;
                next();
              }
            });
          });
        });
      }
    } catch (error) {
      next(error);
    }
  },

  cardStatus(req, res, next) {
    try {
      const id = mongoose.Types.ObjectId(req.params.cardid);
      card.findOneAndUpdate({ _id: id }, { Listid: req.body.listid }, (err, list) => {
        if (err) {
          res.status(404).json({ success: false, message: err });
        } else {
          req.list = list;
          next();
        }
      });
    } catch (error) {
      next(error);
    }
  },

  userlist(req, res, next) {
    try {
      user.find({}, (err, users) => {
        const userArray = [];
        users.forEach((userData) => {
          // eslint-disable-next-line no-underscore-dangle
          const id = userData._id;
          if (req.body.userid.toString() !== id.toString()) {
            userArray.push({ id, name: userData.name });
          }
        });
        res.status(200).json({ success: false, userlist: userArray });
      });
    } catch (error) {
      next(error);
    }
  },

  addUserInBoard(req, res, next) {
    try {
      const id = mongoose.Types.ObjectId(req.body.boardid);
      board.findOneAndUpdate(
        { _id: id },
        { $addToSet: { userBelongs: mongoose.Types.ObjectId(req.body.newuserid) } },
        { safe: true, upsert: true },

        (err) => {
          if (err) {
            res.status(302).send({ success: false, message: err });
          } else {
            res.status(201).send({ success: true, message: 'add user in board' });
          }
        },
      );
    } catch (error) {
      next(error);
    }
  },


};
module.exports = listController;
