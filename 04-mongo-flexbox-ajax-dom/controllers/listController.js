const mongoose = require('mongoose');
const list = require('../models/list');
const board = require('../models/board');

const listController = {
  getBoardDetails(req, res) {

    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const id = mongoose.Types.ObjectId(req.params.id);
      const BoardDetails = new Promise(((resolve, reject) => {
        board.findOne({ _id: id }, (error, note) => {
          if (error) {
            res.status(404).send({ success: false, message: error });
          } else {
            resolve(note);
          }
        });
      }));
      const Lists = new Promise(((resolve, reject) => {
        list.find({ Boardid: req.params.id }, (error, lists) => {
          if (error) {
            res.status(404).send({ success: false, message: error });
          } else {
            resolve(lists);
          }
        });
      }));
      Promise.all([BoardDetails, Lists]).then((values) => {
        res.status(200).json({ status: 'success', boardDetails: values[0], listsDetails: values[1] });
      });
    } else {
      res.status(400).json({ status: 'fail' });
    }
  },
  addOneList(req, res) {
    const model = new list();
    model.Title = req.body.Title;
    model.Description = req.body.Description;
    model.Boardid = req.body.bid;
    model.save((error) => {
      if (error) {
        res.status(404).send({ success: false, message: error });
      } else {
        list.find({ Boardid: req.body.bid }, (error, lists) => {
          if (error) {
            res.status(404).send({ success: false, message: error });
          } else {
            res.status(200).send({ success: true, list: lists, message: 'List Successfully Added ' });
          }
        });
      }
    });
  },
  updateList(req, res) {
    const body = req.body;
    const id = mongoose.Types.ObjectId(req.params.id);
    const param = { Title: body.Title, Description: body.Description };
    list.findOneAndUpdate({ _id: id }, param, (err) => {
      if (err) {
        res.status(404).json({ success: false, message: err });
      } else {
        res.status(200).json({ success: true, message: 'Card Update Successfully!! ' });
      }
    });
  },
  deleteList(req, res) {
    if (req.params.id) {
      const id = mongoose.Types.ObjectId(req.params.id);
      list.findOneAndRemove({ _id: id }, (err) => {
        if (err) {
          res.status(404).json({ success: false, message: err });
        } else {

          list.find({ Boardid: req.params.boardid }, (error, lists) => {
            if (error) {
              res.status(404).send({ success: false, message: error });
            } else {
              res.status(200).send({ success: true, list: lists, message: 'Card Successfully Deleted ' });
            }
          });
        }
      });
    }
  },

  cardStatus(req, res) {
    const body = req.body;
    const id = mongoose.Types.ObjectId(req.params.id);
    const param = { carrdtype: body.status };
    list.findOneAndUpdate({ _id: id }, param, (err) => {
      if (err) {
        res.status(404).json({ success: false, message: err });
      } else {
        list.find({ Boardid: body.boardid }, (error, lists) => {
          if (error) {
            res.status(404).send({ success: false, message: error });
          } else {
            res.status(200).send({ success: true, list: lists, message: 'Status Successfully Changed' });
          }
        });

      }
    });
  },

};
module.exports = listController;
