// const notesData = require('../data/notes');
const mongoose = require('mongoose');
const notes = require('../models/notes');

const noteController = {
  getAllNotes(req, res) {
    notes.find({}, (error, allNotes) => {
      if (error) {
        res.status(404).send({ success: false, message: error });
      } else {
        res.status(200).send({ list: allNotes, success: true, message: 'Successfully Add Note' });
      }
    });
  },

  getOneNote(req, res) {
    const body = [...req];
    const id = mongoose.Types.ObjectId(body.noteid);
    notes.findOne({ _id: id }, (error, note) => {

      if (error) {
        res.status(404).send({ success: false, message: error });
      } else {
        res.status(200).send({ success: true, notes: note });
      }
    });
  },


  addOneNote(req, res) {
    const model = new notes();
    model.Title = req.body.Title;
    model.Description = req.body.Description;
    model.save((error) => {
      if (error) {
        res.status(404).send({ success: false, message: error });
      } else {
        res.status(200).send({ success: true, message: 'Successfully Add Note' });
      }
    });
  },


  updateNote(req, res) {
    const body = req.body;
    const id = mongoose.Types.ObjectId(req.params.id);
    const param = { Title: body.Title, Description: body.Description };
    notes.findOneAndUpdate({ _id: id }, param, (err) => {
      if (err) {
        res.status(404).json({ success: false, message: err });
      } else {
        res.status(200).json({ success: true, message: 'Note Update Successfully!! ' });
      }
    });
  },

  completeNote(req, res) {
    const id = mongoose.Types.ObjectId(req.params.id);
    notes.findOneAndUpdate({ _id: id }, { completestatus: true }, (err) => {
      if (err) {
        res.status(404).json({ success: false, message: err });
      } else {
        res.status(200).json({ success: true, message: 'Note Completed Successfully!! ' });
      }
    });
  },


  deleteNote(req, res) {
    if (req.params.id) {
      const id = mongoose.Types.ObjectId(req.params.id);
      notes.findOneAndRemove({ _id: id }, (err) => {
        if (err) {
          res.status(404).json({ success: false, message: err });
        } else {
          res.status(200).json({ success: true, message: 'Note Deleted Successfully!! ' });
        }
      });
    }
  },

};
module.exports = noteController;
