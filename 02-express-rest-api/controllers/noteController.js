const notesData = require('../data/notes');


const noteController = {

  getAllNotes(req, res) {
    if (notesData.notes.length > 0) {
      res.status(200).send({
        notes: arrSortbykey(notesData.notes, 'DateOfCreation', req.query),
        messgae: 'ok',
      });
    } else {
      res.status(404).send({
        messgae: 'No record Found!',
      });
    }
  },

  getOneNote(req, res) {
    if (req.params.id) {
      if (notesData.notes.length > 0) {
        const note = notesData.notes.find((obj) => {
          if (obj.id === parseInt(req.params.id, 10)) {
            return obj;
          }
        });
        if (note) {
          res.status(200).send({
            note,
            messgae: 'ok',
          });
        }
        res.status(404).send({
          messgae: 'Invalid Node Id!',
        });
      } else {
        res.status(404).send({
          messgae: 'No record Found!',
        });
      }
    }
  },


  addOneNote(req, res) {
    notesData.notes.push(req.body);
    res.status(201).send({
      note: req.body,
      messgae: 'Note added Scucessfully  !!!',
    });
  },


  updateNote(req, res) {
    const notedata = req.body;
    if (req.params.id) {
      if (notesData.notes.length > 0) {
        const index = notesData.notes.findIndex(obj => (obj.id === parseInt(req.params.id)));

        if (index !== -1) {
          notesData.notes[index] = notedata;
          res.status(202).send({
            notes: arrSortbykey(notesData.notes, 'DateOfCreation', req.query),
            messgae: 'ok',
          });
        } else {
          res.status(404).send({
            messgae: 'invalid Id',
          });
        }
      }
    }
    res.status(404).send({
      messgae: 'No record Found!',
    });
  },


  deleteNote(req, res) {
    if (req.params.id) {
      if (notesData.notes.length > 0) {
        const index = notesData.notes.findIndex(obj => (obj.id === parseInt(req.params.id)));

        if (index !== -1) {
          notesData.notes.splice(index, 1);
          res.status(200).send({
            notes: arrSortbykey(notesData.notes, 'DateOfCreation', req.query),
            messgae: 'ok',
          });
        } else {
          res.status(404).send({
            messgae: 'invalid Id',
          });
        }
      }
    }
    res.status(204).send({
      messgae: 'No record Found!',
    });
  },


};


function arrSortbykey(arr, key, order) {
  let sortby = 'DESC';
  if (order.hasOwnProperty('sort_by')) {
    sortby = order.sort_by;
  }
  arr.sort((a, b) => {
    const dateA = new Date(a[key]);
    const dateB = new Date(b[key]);

    if (sortby === 'DESC') {
      return dateA - dateB;
    }
    return dateB - dateA;
  });
  return arr;
}


module.exports = noteController;
