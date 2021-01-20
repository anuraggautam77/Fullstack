const mongoose = require('mongoose');
const board = require('../models/board');
const list = require('../models/list');

const boardController = {
  getAllBoards(req, res) {
    board.find({}, (error, allNotes) => {
      if (error) {
        res.status(404).send({ success: false, message: error });
      } else {
        res.status(200).send({ list: allNotes, success: true, message: 'Successfully Add Board' });
      }
    });
  },

  getOneBoard(req, res) {
    const body = [...req];
    const id = mongoose.Types.ObjectId(body.noteid);
    board.findOne({ _id: id }, (error, note) => {

      if (error) {
        res.status(404).send({ success: false, message: error });
      } else {
        console.log(note);
      }
    });
  },


  addOneBoard(req, res) {
    const model = new board();
    model.Title = req.body.Title;
    model.Description = req.body.Description;
    model.save((error) => {
      if (error) {
        res.status(404).send({ success: false, message: error });
      } else {
        res.status(200).send({ success: true, message: 'Successfully Add Board' });
      }
    });
  },


  updateBoard(req, res) {
    const body = req.body;
    const id = mongoose.Types.ObjectId(req.params.id);
    const param = { Title: body.Title, Description: body.Description };
    board.findOneAndUpdate({ _id: id }, param, (err) => {
      if (err) {
        res.status(404).json({ success: false, message: err });
      } else {
        res.status(200).json({ success: true, message: 'Board Update Successfully!! ' });
      }
    });
  },

  deleteBoard(req, res) {
    if (req.params.id) {
      const id = mongoose.Types.ObjectId(req.params.id);
      board.findOneAndRemove({ _id: id }, (err) => {
        if (err) {
          res.status(404).json({ success: false, message: err });
        } else {
          list.deleteMany({ Boardid: req.params.id }, (err) => {
            if (err) {
              res.status(404).json({ success: false, message: err });
            } else {
              res.status(200).json({ success: true, message: 'Board Card  Successfully!! ' });
            }
          });

        }
      });
    }
  },

};
module.exports = boardController;
